import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Sparkles,
  FileDown,
  Save,
  Menu,
  X,
  Edit,
  NotebookText,
  ChevronDown,
  FileText,
} from "Lucide-react";
import { arrayMove } from "@dnd-kit/sortable";

import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";
import Dropdown, { DropdownItem } from "../components/ui/Dropdown";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import SelectField from "../components/ui/SelectField";
import ChapterSidebar from "../components/editor/ChapterSidebar";
import BookDetailsTab from "../components/editor/BookDetailsTab";
import ChapterEditorTab from "../components/editor/ChapterEditorTab";

function EditorPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("editor");
  const fileInputRef = useRef(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  // AI Modal State
  const [isOutlineModalOpen, setIsOutlineModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiStyle, setAiStyle] = useState("Informative");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_PATHS.BOOKS.GET_BOOK_BY_ID}/${bookId}`
        );
        setBook(response.data);
      } catch (error) {
        toast.error("Failed to load book details.");
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId, navigate]);

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleChapterChange = (eOrString) => {
    let name;
    let value;
    if (eOrString && eOrString.target) {
      name = eOrString.target.name;
      value = eOrString.target.value;
    } else {
      name = "content";
      value = eOrString;
    }
    setBook((prevBook) => {
      const chapters = prevBook.book?.chapters || [];
      const updatedChapters = chapters.map((ch, idx) =>
        idx === Number(selectedChapterIndex) ? { ...ch, [name]: value } : ch
      );
      const updatedInnerBook = { ...prevBook.book, chapters: updatedChapters };
      return { ...prevBook, book: updatedInnerBook };
    });
  };

  const handleAddChapter = () => {
    setBook((prevBook) => {
      const chapters = prevBook.book?.chapters || [];
      const newChapter = {
        title: `Chapter ${chapters.length + 1}`,
        content: "",
        description: "",
      };
      const updatedChapters = [...chapters, newChapter];
      setSelectedChapterIndex(updatedChapters.length - 1);
      const updatedInnerBook = { ...prevBook.book, chapters: updatedChapters };
      return { ...prevBook, book: updatedInnerBook };
    });
  };

  const handleDeleteChapter = (index) => {
    setBook((prevBook) => {
      const chapters = prevBook.book?.chapters || [];
      console.log("Chapters before deletion:", chapters);

      if (chapters.length <= 1) {
        toast.error("A Book must have at least one chapter.");
        return prevBook;
      }
      const updatedChapters = chapters.filter((_, i) => i !== index);
      const newIndex = Math.min(index, updatedChapters.length - 1);
      setSelectedChapterIndex(newIndex);
      const updatedInnerBook = { ...prevBook.book, chapters: updatedChapters };
      return { ...prevBook, book: updatedInnerBook };
    });
  };

  const handleReorderChapter = (oldIndex, newIndex) => {
    setBook((prev) => {
      const chapters = prev.book?.chapters || [];
      const updatedChapters = arrayMove(chapters, oldIndex, newIndex);
      const updatedInnerBook = { ...prev.book, chapters: updatedChapters };
      return { ...prev, book: updatedInnerBook };
    });
    setSelectedChapterIndex(newIndex);
  };

  const handleSaveChanges = async (bookToSave = book, showToast = true) => {
    setIsSaving(true);
    try {
      await axiosInstance.put(
        `${API_PATHS.BOOKS.UPDATE_BOOK}/${bookId}`,
        bookToSave
      );
      console.log("Book saved:", bookToSave);
      if (showToast) toast.success("Changes saved successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("coverImage", file);

    setIsUploading(true);
    try {
      const response = await axiosInstance.put(
        `${API_PATHS.BOOKS.UPDATE_COVER}/${bookId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setBook((prev) => ({
        ...prev,
        book: {
          ...prev.book,
          coverImage: response.data.coverImage,
        },
      }));
      toast.success("Cover image uploaded successfully.");
    } catch (error) {
      toast.error("Failed to upload cover image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateChapterContent = async (index) => {
    const chapterData = book?.book?.chapters?.[index];
    if (!chapterData || !chapterData.title?.trim()) {
      toast.error("Chapter title is required for generating content.");
      return;
    }
    setIsGenerating(true);
    try {
      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_CHAPTER_CONTENT,
        {
          chapterTitle: chapterData.title,
          chapterDescription: chapterData.description || "",
          style: aiStyle,
        }
      );
      let finalUpdatedState;
      setBook((prevBookState) => {
        const chapters = prevBookState?.book?.chapters || [];
        const updatedChapters = chapters.map((ch, idx) =>
          idx === index ? { ...ch, content: response.data.content } : ch
        );
        
        const updatedInnerBook = {
          ...prevBookState.book,
          chapters: updatedChapters,
        };
        finalUpdatedState = { ...prevBookState, book: updatedInnerBook };
        console.log(finalUpdatedState);
        return finalUpdatedState;
      });
      setSelectedChapterIndex(index);
      toast.success(`Content for ${chapterData.title} generated successfully.`);
      await handleSaveChanges(finalUpdatedState, false);
    } catch (error) {
      console.error("AI Generation Failed:", error);
      toast.error("Failed to generate chapter content.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportDoc = async () => {
    toast.loading("Generating Document ....");
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPORT.DOCX}/${bookId}/docx`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data.book]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${book.book.title || "untitled"}.docx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.dismiss();
      toast.success("Document Export Started successfully.");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to export document.");
    }
  };

  if (isLoading || !book) {
    return (
      <div className="flex h-screen items-center justify-between">
        <p>Loading Editor ....</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex bg-slate-50 font-sans relative min-h-screen">
        {/* Mobile Sidebar */}
        {isSideBarOpen && (
          <div
            className="fixed inset-0 z-40 flex md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-black/20 bg-opacity-75 "
              aria-hidden="true"
              onClick={() => setIsSideBarOpen(false)}
            >
              {" "}
            </div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 
              focus:ring-inset focus:ring-white"
                  onClick={() => setIsSideBarOpen(false)}
                >
                  <span className="sr-only">Close Sidebar</span>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <ChapterSidebar
                book={book.book}
                selectedChapterIndex={selectedChapterIndex}
                onSelectChapter={(index) => {
                  setSelectedChapterIndex(Number(index));
                  setIsSideBarOpen(false);
                }}
                onAddChapter={handleAddChapter}
                onDeleteChapter={handleDeleteChapter}
                onGeneratingChapterContent={handleGenerateChapterContent}
                isGenerating={isGenerating === index}
                onReorderChapter={handleReorderChapter}
              />
            </div>
            <div className="shrink-0 w-14 " aria-hidden="true"></div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:shrink-0 sticky top-0 h-screen">
          <ChapterSidebar
            book={book}
            selectedChapterIndex={selectedChapterIndex}
            onSelectChapter={(index) => {
              setSelectedChapterIndex(index);
              setIsSideBarOpen(false);
            }}
            onAddChapter={handleAddChapter}
            onDeleteChapter={handleDeleteChapter}
            onGeneratingChapterContent={handleGenerateChapterContent}
            isGenerating={isGenerating}
            onReorderChapter={handleReorderChapter}
          />
        </div>
        <main className="flex flex-1 flex-col h-full p-4 md:p-6 bg-slate-50">
          <header
            className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200
          p-4 flex justify-between items-center mb-6 rounded-xl shadow-sm"
          >
            {" "}
            <div className="flex items-center gap-4">
              {" "}
              <button
                onClick={() => setIsSideBarOpen(true)}
                className="md:hidden p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100" // ADDED PADDING AND HOVER STATE
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:flex space-x-1 bg-slate-100 p-1 rounded-lg">
                {" "}
                <button
                  onClick={() => setActiveTab("editor")}
                  className={`flex flex-1 items-center justify-center py-2 px-4 text-sm font-medium rounded-lg 
                  transition-colors duration-200  ${
                    activeTab === "editor"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editor
                </button>
                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex flex-1 items-center justify-center py-2 px-4 text-sm font-medium rounded-lg 
                  transition-colors duration-200 whitespace-nowrap ${
                    activeTab === "details"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <NotebookText className="w-4 h-4 mr-2" />
                  Book Details
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              {" "}
              <Dropdown
                trigger={
                  <Button variant="secondary" icon={FileDown}>
                    Export
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                }
              >
                <DropdownItem onClick={handleExportDoc}>
                  <FileText className="w-4 h-4 mr-2 text-slate-500" />
                  Export as DOCX
                </DropdownItem>
              </Dropdown>
              <Button
                onClick={() => handleSaveChanges()}
                isLoading={isSaving}
                icon={Save}
              >
                Save Changes
              </Button>
            </div>
          </header>
          <div className="w-full">
            {activeTab === "editor" ? (
              <ChapterEditorTab
                book={book}
                selectedChapterIndex={selectedChapterIndex}
                onChapterChange={handleChapterChange}
                onGeneratingChapterContent={handleGenerateChapterContent}
                isGenerating={isGenerating}
              />
            ) : (
              <BookDetailsTab
                book={book}
                onBookChange={handleBookChange}
                onCoverUpload={handleCoverImageUpload}
                isUploading={isUploading}
                fileInputRef={fileInputRef}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default EditorPage;
