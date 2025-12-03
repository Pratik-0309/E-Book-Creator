import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Book } from "Lucide-react";

import axiosInstance from "../utils/axiosInstance";
import DashboardLayout from "../components/layout/DashboardLayout";
import { API_PATHS } from "../utils/apiPath";
import ViewBook from "../components/view/ViewBook";

function ViewBookSkeleton() {
  return (
    <div className="flex h-[calc(100vh-64px)] bg-white animate-pulse">
      <div className="w-80 border-r border-gray-200 hidden lg:block">
        <div className="p-4 border-b border-gray-200">
          <div className="h-5 bg-slate-200 rounded w-1/2"></div>
        </div>

        <div className="p-4 space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 bg-slate-100 rounded"></div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-16 bg-slate-200 rounded shadow-sm hidden sm:block"></div>
            <div>
              <div className="h-5 bg-slate-200 rounded w-40 mb-1"></div>
              <div className="h-3 bg-slate-200 rounded w-24"></div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
            <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-prose mx-auto">
            <div className="h-8 bg-violet-200 rounded w-3/4 mb-6"></div>

            <div className="space-y-4">
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-11/12"></div>
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-5/6"></div>
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-10/12"></div>
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewBookPage() {
  const [book, setBooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_PATHS.BOOKS.GET_BOOK_BY_ID}/${bookId}`
        );
        setBooks(response.data.book);
      } catch (error) {
        toast.error("Failed to fetch book details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  return (
    <DashboardLayout>
      {isLoading ? (
        <ViewBookSkeleton />
      ) : book ? (
        <ViewBook book={book} />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center  border-dashed border-2 border-slate-300 rounded-lg mt-10 ">
          <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-full bg-slate-100">
            <Book className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            eBook Not Found
          </h3>
          <p className="text-slate-500 mb-6 max-w-md">
            The ebook you are looking for does not exist or has been deleted.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}

export default ViewBookPage;
