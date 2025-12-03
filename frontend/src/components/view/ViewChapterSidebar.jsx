import { BookOpen, ChevronLeft } from "Lucide-react";

export default function ViewChapterSidebar({
  book,
  selectedChapterIndex,
  onSelectChapter,
  isOpen,
  onClose,
}) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white border-r border-gray-200
    transform transition-transform duration-300 ease-in-out z-50 lg:static lg:h-auto
    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-4 border-b border-gray-200 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-violet-500" />
              <span className="font-medium text-gray-900">Chapters</span>
            </div>
            <button onClick={onClose} className="lg:hidden">
              <ChevronLeft className="p-1 w-7 h-7 hover:bg-gray-100 rounded-lg transition-colors" />{" "}
            </button>
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] pb-20">
          {book.chapters.map((chapter, index) => (
            <button
              key={index}
              onClick={() => {
                onSelectChapter(index);
                onClose();
              }}
              className={`w-full text-left p-4 transition-colors border-b border-gray-100 hover:bg-gray-50 
                last:border-b-0 ${
                  selectedChapterIndex === index
                    ? "bg-violet-50 border-l-4 border-l-violet-500"
                    : ""
                }`}
            >
              <div
                className={`font-medium text-sm truncate ${
                  selectedChapterIndex === index
                    ? "text-violet-700"
                    : "text-gray-900"
                } `}
              >
                {chapter.title}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Chapter {index + 1}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
