import { useState } from "react";
import { ChevronLeft, Menu } from "Lucide-react";
import ViewChapterSidebar from "./ViewChapterSidebar.jsx";

function ViewBook({ book }) {
  const [SelectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  const SelectedChapter = book?.chapters?.[SelectedChapterIndex];

  const formatContent = (content) => {
    if (!content) return "";

    return content
      .split("\n\n")
      .filter((paragraph) => paragraph.trim())
      .map((paragraph) => {
        paragraph = paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        paragraph = paragraph.replace(/\*(.*?)\*/g, "<em>$1</em>");

        if (paragraph.startsWith("# ")) {
          return `<h2>${paragraph.substring(2).trim()}</h2>`;
        }

        return `<p>${paragraph}</p>`;
      })
      .join("");
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white text-gray-900 ">
      {" "}
      <ViewChapterSidebar
        book={book}
        selectedChapterIndex={SelectedChapterIndex}
        onSelectChapter={setSelectedChapterIndex}
        isOpen={sideBarOpen}
        onClose={() => setSideBarOpen(false)}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSideBarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="font-semibold text-base md:text-lg truncate">
                {book?.title}
              </h1>
              <p className="text-sm text-gray-500"> {book.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="flex items-center gap-2 mr-4">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-sm font-bold"
              >
                A-
              </button>
              <span className="text-sm text-gray-500">{fontSize}px</span>
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-lg font-bold"
              >
                A+
              </button>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div
            className="max-w-prose mx-auto"
            style={{ fontSize: `${fontSize}px` }}
          >
            {SelectedChapterIndex === 0 && book?.coverImage && (
              <div className="flex justify-center mb-10 ">
                <img
                  src={book.coverImage}
                  alt={`${book.title} Cover`}
                  className="w-40 h-64 object-cover rounded-lg shadow-xl hover:shadow-lg transition-shadow"
                />
              </div>
            )}
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-violet-700">
              {SelectedChapter?.title || "Chapter Not Found"}
            </h2>

            {SelectedChapter?.content ? (
              <div
                className="content-body leading-relaxed text-gray-800 space-y-4"
                dangerouslySetInnerHTML={{
                  __html: formatContent(SelectedChapter.content),
                }}
              />
            ) : (
              <p className="text-gray-500 mt-8 italic">
                The content for this chapter is empty.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ViewBook;
