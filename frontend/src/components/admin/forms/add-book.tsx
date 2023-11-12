import { getActiveBatches } from "@/components/services/batchservice";
import {
  addBook,
  getBook,
  upadateBook,
} from "@/components/services/bookservice";
import { useToast } from "@/components/ui/use-toast";
import Batch from "@/model/Batch";
import Book from "@/model/Book";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const headingMessage = bookId ? "Update" : "Add";
  const toastMessage = bookId ? "Book updated" : "Book added";
  const [batchs, setBatchs] = useState<Batch[]>([]);
  const [semester, setSemester] = useState(0);
  useEffect(() => {
    try {
      getActiveBatches().then((response) => {
        setBatchs(response.data);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const [book, setBook] = useState<Book>({
    bookName: "",
    author: "",
    description: "",
    referenceNumber: "",
    shelfNumber: "",
    batchId: "",
    semester: 0,
  });

  useEffect(() => {
    try {
      if (bookId) getBook(bookId).then((response) => setBook(response.data));
    } catch (err) {
      console.error(err);
    }
  }, [bookId]);

  useEffect(() => {
    bookNameRef.current!.value = book.bookName;
    referenceNumberRef.current!.value = book.referenceNumber;
    authorRef.current!.value = book.author;
    shelfNumberRef.current!.value = book.shelfNumber;
    batchNameRef.current!.value = book.batchId;
    semesterRef.current!.value = String(book.semester);
    authorRef.current!.value = book.author;
    descriptionRef.current!.value = book.description;

    if (book.batchId !== "") {
      const batch = batchs.find((batch) => batch.batchId === book.batchId);
      if (batch) {
        setSemester(batch.totalSemester);
      }
    }
  }, [batchs, book.author, book.batchId, book.bookName, book.description, book.referenceNumber, book.semester, book.shelfNumber]);

  const bookNameRef = useRef<HTMLInputElement>(null);
  const referenceNumberRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const shelfNumberRef = useRef<HTMLInputElement>(null);
  const batchNameRef = useRef<HTMLSelectElement>(null);
  const semesterRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const bookName = bookNameRef.current?.value || "";
    const referenceNumber = referenceNumberRef.current?.value || "";
    const author = authorRef.current?.value || "";
    const shelfNumber = shelfNumberRef.current?.value || "";
    const batchName = batchNameRef.current?.value || "";
    const semester = semesterRef.current?.value || "";
    const description = descriptionRef.current?.value || "";

    const book: Book = {
      bookName,
      referenceNumber,
      author,
      description,
      shelfNumber,
      batchId: batchName,
      semester: Number(semester),
    };

    function afterApiCall() {
      toast({
        title: toastMessage,
      });

      navigate("/library/book-details");
    }

    try {
      bookId
        ? upadateBook(book, bookId).then(() => afterApiCall())
        : addBook(book).then(() => afterApiCall());
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something wen wrong!",
        description: `${err}`,
      });
    }
  }

  function onBatchChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value !== "") {
      const batch = batchs.find((batch) => batch.batchId === value);
      if (batch) {
        setSemester(batch.totalSemester);
      }
    }
  }

  const styleInput =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const styleLabel = "block text-gray-700 text-sm font-bold mb-2";
  return (
    <div className="bg-white shadow-lg rounded-md container">
      <h2 className="text-center text-xl font-bold p-3">
        {headingMessage} book
      </h2>
      <hr />
      <div className="py-5">
        <form onSubmit={onSubmit}>
          <div className="mb-5">
            <label className={styleLabel}>Book name</label>
            <input
              className={styleInput}
              id="bookname"
              type="text"
              placeholder="book name"
              ref={bookNameRef}
            />
          </div>
          <div className="mb-5">
            <label className={styleLabel}>Book author</label>
            <input
              className={styleInput}
              id="authorName"
              type="text"
              placeholder="Author name"
              ref={authorRef}
            />
          </div>
          <div className="mb-5">
            <label className={styleLabel}>Reference number</label>
            <input
              className={styleInput}
              id="referenceNumber"
              type="text"
              placeholder="Reference number"
              ref={referenceNumberRef}
            />
          </div>
          <div className="mb-5">
            <label className={styleLabel}>Shelf number</label>
            <input
              className={styleInput}
              id="shelfNumber"
              type="text"
              placeholder="Shelf number"
              ref={shelfNumberRef}
            />
          </div>
          <div className="mb-5">
            <label className={styleLabel}>Select batch</label>
            <select
              name="batchName"
              id="batchName"
              className={styleInput}
              ref={batchNameRef}
              onChange={onBatchChange}
            >
              <option value="">--select--</option>
              {batchs.map((batch) => (
                <option value={batch.batchId}>{batch.batchName}</option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label className={styleLabel}>Select semester</label>
            <select
              name="semester"
              id="batchName"
              className={styleInput}
              ref={semesterRef}
            >
              {semester == 0 ? (
                <option value="0">0</option>
              ) : (
                Array.from({ length: semester }, (_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="mb-5">
            <label className={styleLabel}>Book description</label>
            <textarea
              className={styleInput}
              id="description"
              placeholder="Book description"
              ref={descriptionRef}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/library/book-details"
            >
              back to books!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
