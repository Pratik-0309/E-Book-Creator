import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    ImageRun,
} from "docx";

import MarkdownIt from "markdown-it";
import Book from "../models/Book.js";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const md = new MarkdownIt();

const decodeEntities = (str = "") => {
    return str
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&nbsp;/g, " ")
        .replace(/&ldquo;/g, "“")
        .replace(/&rdquo;/g, "”")
        .replace(/&lsquo;/g, "‘")
        .replace(/&rsquo;/g, "’");
};


const fetchImageBuffer = async (imageSource) => {
    if (imageSource.startsWith("http://") || imageSource.startsWith("https://")) {
        const response = await fetch(imageSource);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        return Buffer.from(await response.arrayBuffer());
    }

    const relativePath = imageSource.startsWith("/")
        ? imageSource.substring(1)
        : imageSource;

    const localPath = path.join(process.cwd(), relativePath);

    if (fs.existsSync(localPath)) {
        return fs.readFileSync(localPath);
    }

    throw new Error(`Local image not found: ${localPath}`);
};


const parseMarkdownToDocx = (markdownText) => {
    const html = md.render(markdownText);
    const docxElements = [];

    const blockRegex = /<(h[1-6]|p|li)>.*?<\/\1>/gi;
    const parts = html.match(blockRegex) || [];

    parts.forEach((block) => {
        const tag = block.match(/^<(h[1-6]|p|li)>/i)[1];
        const innerHtml = block.replace(/<\/?(h[1-6]|p|li)>/gi, "").trim();

        const cleaned = innerHtml.replace(/<[^>]+>/g, "");
        const finalText = decodeEntities(cleaned);

        let heading = undefined;
        if (tag === "h1") heading = HeadingLevel.HEADING_1;
        if (tag === "h2") heading = HeadingLevel.HEADING_2;
        if (tag === "h3") heading = HeadingLevel.HEADING_3;

        docxElements.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: finalText,
                        bold: heading ? true : false,
                        size: 22,
                    }),
                ],
                heading,
                spacing: heading
                    ? { before: 300, after: 150 }
                    : { after: 200 },
            })
        );
    });

    return docxElements;
};


const exportAsDocument = async (req, res) => {
    let imageBuffer = null;

    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book Not Found" });
        }

        if (book.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Forbidden: You do not own this book",
            });
        }

        const documentSections = [];

       
        if (book.coverImage) {
            try {
                imageBuffer = await fetchImageBuffer(book.coverImage);

                documentSections.push({
                    children: [
                        new Paragraph({ text: "", spacing: { before: 800 } }),
                        new Paragraph({
                            children: [
                                new ImageRun({
                                    data: imageBuffer,
                                    transformation: {
                                        width: 400,
                                        height: 550,
                                    },
                                }),
                            ],
                            alignment: AlignmentType.CENTER,
                            spacing: { after: 400 },
                        }),
                    ],
                });
            } catch {
                documentSections.push({
                    children: [
                        new Paragraph({
                            text: "Cover Image Not Found",
                            alignment: AlignmentType.CENTER,
                        }),
                    ],
                });
            }
        }

        
        documentSections.push({
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: book.title,
                            bold: true,
                            size: 60,
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 2000, after: 400 },
                }),

                ...(book.subtitle
                    ? [
                          new Paragraph({
                              children: [
                                  new TextRun({
                                      text: book.subtitle,
                                      size: 40,
                                  }),
                              ],
                              alignment: AlignmentType.CENTER,
                              spacing: { after: 400 },
                          }),
                      ]
                    : []),

                new Paragraph({
                    children: [
                        new TextRun({
                            text: "by " + req.user.name,
                            italics: true,
                            size: 32,
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                }),
            ],
        });

        for (const chapter of book.chapters) {
            const chapterContent = [];

            chapterContent.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: chapter.title,
                            bold: true,
                            size: 48,
                        }),
                    ],
                    heading: HeadingLevel.HEADING_1,
                    spacing: { before: 500, after: 300 },
                })
            );

            if (chapter.content) {
                const docxContent = parseMarkdownToDocx(chapter.content);
                chapterContent.push(...docxContent);
            } else {
                chapterContent.push(
                    new Paragraph({
                        text: "No content available.",
                        alignment: AlignmentType.CENTER,
                    })
                );
            }

            documentSections.push({ children: chapterContent });
        }

        const doc = new Document({ sections: documentSections });
        const buffer = await Packer.toBuffer(doc);

        const sanitizedTitle = book.title
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .replace(/\s+/g, "_");

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${sanitizedTitle}.docx"`
        );
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );

        return res.send(buffer);
    } catch (error) {
        console.error("DOCX Export Error:", error);
        return res.status(500).json({
            message: "Server error during document export",
            error: error.message,
        });
    }
};

export { exportAsDocument };
