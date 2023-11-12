import Modal from "@/components/ui/modal";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

interface UploadImageProps {
  id: string;
  uploadFile: (id: string, file: File) => void;
  setDisplayModal:  React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadImage: React.FC<UploadImageProps> = ({ id, uploadFile, setDisplayModal }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isHidden, setHidden] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setDisplayModal(!isHidden);
  }, [isHidden, setDisplayModal, setHidden]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedFile) {
      uploadFile(id, selectedFile);
    } else {
      toast({ title: "No file selected" });
    }

    setHidden(true);
  };
  const styleInput =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const styleLabel = "block text-gray-700 text-sm font-bold mb-2";

  return (
    <Modal isHidden={isHidden} setHidden={setHidden} heading="Upload Image">
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          <label className={styleLabel}>Choose image</label>
          <input
            className={styleInput}
            id="file"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <button
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            type="button"
            onClick={() => setHidden(true)}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UploadImage;
