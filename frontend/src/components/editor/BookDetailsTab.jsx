import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { UploadCloud } from "Lucide-react";
import { BASE_URL } from "../../utils/apiPath";

export default function BookDetailsTab({
  book,
  onBookChange,
  fileInputRef,
  isUploading,
  onCoverUpload,
}) {
  const coverImageUrl = book.book.coverImage.startsWith("https")
    ? book.book.coverImage
    : `${BASE_URL}/backend/${book.book.coverImage}`.replace(/\\/g, "/");

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Book Details{" "}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Tiltle"
            name="title"
            value={book.book.title}
            onChange={onBookChange}
          />
          <InputField
            label="Author"
            name="author"
            value={book.user.name}
            onChange={onBookChange}
          />
          <div className="md:cols-span-2">
            <InputField
              label="Subtitle"
              name="subtitle"
              value={book.book.subtitle || ""}
              onChange={onBookChange}
            />
          </div>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mt-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Cover Image
        </h3>

        {/* Image + right side in one row */}
        <div className="flex items-start gap-6">
          <img
            src={coverImageUrl}
            alt="Cover"
            className="w-32 h-48 object-cover rounded-lg bg-slate-100 shadow shrink-0"
          />

          <div className="flex flex-col justify-items-start h-48">
            <p className="text-sm text-slate-700 mb-5">
              Upload a new cover image. Recommended size: 600x800 pixels.
            </p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={onCoverUpload}
              className="hidden"
              accept="image/*"
            />

            <Button
            className="w-40"
              variant="secondary"
              onClick={() => fileInputRef.current.click()}
              isLoading={isUploading}
              icon={UploadCloud}
            >
              Upload Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
