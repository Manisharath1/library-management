import { issueBook } from "@/components/services/bookIssueservice";
import Modal from "@/components/ui/modal";
import { useToast } from "@/components/ui/use-toast";
import BookIssue from "@/model/BookIssue";
import { useState, useRef, useEffect } from "react";

interface BookIssueProps {
  setDisplayIssueModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateBookIssueData: () => void;
}

const BookIssueModal: React.FC<BookIssueProps> = ({
  setDisplayIssueModal,
  updateBookIssueData,
}) => {
  const [isHidden, setHidden] = useState(false);
  const studentRef = useRef<HTMLInputElement>(null);
  const bookRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setDisplayIssueModal(!isHidden);
  }, [isHidden, setDisplayIssueModal, setHidden]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const studentReferenceNumber = studentRef.current?.value || "";
    const bookReferenceNumber = bookRef.current?.value || "";

    const bookIssue: BookIssue = {
      studentReferenceNumber,
      bookReferenceNumber,
    };

    issueBook(bookIssue)
      .then(() => {
        updateBookIssueData();
        setHidden(true);
        toast({ title: "Book issued" });
      })
      .catch((err) => {
        const res = err.response.data;

        toast({
          title: res.title,
          description: res.detail,
          variant: "destructive",
        });
      });
  }

  const styleInput =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const styleLabel = "block text-gray-700 text-sm font-bold mb-2";
  return (
    <Modal isHidden={isHidden} setHidden={setHidden} heading="Issue Book">
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          <label className={styleLabel}>Student reference number</label>
          <input
            className={styleInput}
            id="studentReferenceNumber"
            type="text"
            placeholder="Student reference number"
            ref={studentRef}
          />
        </div>
        <div className="mb-5">
          <label className={styleLabel}>Book refrence number</label>
          <input
            className={styleInput}
            id="BookRefrenceNumber"
            type="text"
            placeholder="Book reference number"
            ref={bookRef}
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

export default BookIssueModal;
