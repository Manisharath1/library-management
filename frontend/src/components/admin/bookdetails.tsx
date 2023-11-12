import { useEffect, useState } from "react";
import {
  deleteBook,
  getAllBooks,
  uploadBookImage,
} from "../services/bookservice";
import DataTable from "@/common/datatable";
import { BiSearch } from "react-icons/bi";
import OverFlowMenuItem from "@/model/OverFlowMenuItem";
import { useToast } from "../ui/use-toast";
import { Link } from "react-router-dom";
import Book from "@/model/Book";
import UploadImage from "@/common/uploadimage";
import StockUpdate from "./stockupdate";

const BookDetails = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBook, setFilteredBook] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [showUploadModal, setUploadModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [showStockModal, setStockModal] = useState(false);

  const overflowMenuItems: OverFlowMenuItem[] = [
    {
      label: "Edit",
      path: "/library/book-details/add/",
    },
    {
      label: "Inactive",
      callBack: inactiveBook,
    },
    {
      label: "Upload image",
      callBack: onSelectUploadImage,
    },
    {
      label: "Update stock",
      callBack: onStockUpdateClick,
    },
  ];

  function inactiveBook(bookId: string) {
    try {
      deleteBook(bookId).then(() => {
        toast({
          title: "Succefully mark as inactive",
        });
        getBooks();
      });
    } catch (err) {
      console.error(err);
    }
  }

  function onSelectUploadImage(bookId: string) {
    setSelectedBookId(bookId);
    setUploadModal(true);
  }

  function uploadImage(bookId: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    try {
      uploadBookImage(bookId, formData).then(() => {
        getBooks();
        toast({ title: "Image added" });
      });
    } catch (err) {
      console.error(err);
    }
  }

  function getBooks() {
    try {
      getAllBooks().then((response) => {
        setBooks(response.data);
        setFilteredBook(response.data);
      });
    } catch (err) {
      console.error(err);
    }
  }

  function onSearch(data: string) {
    setSearch(data);
    if (data.length > 3) {
      const result = books.filter((book) =>
        book.bookName.toLocaleLowerCase().includes(data.toLocaleLowerCase())
      );
      setFilteredBook(result);
    } else {
      setFilteredBook(books);
    }
  }

  function onStockUpdateClick(bookId: string) {
    setSelectedBookId(bookId);
    setStockModal(true);
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <div className="shadow-lg rounded-md p-5 bg-white">
        <h2 className="text-xl text-center font-bold p-2">Book Details</h2>
        <hr />
        <div className="w-full mt-6 flex h-full justify-between items-center">
          <div
            className="flex items-center border border-gray-300 flex-1 px-2"
            style={{ borderBottom: "none" }}
          >
            <BiSearch />
            <input
              type="search"
              placeholder="search here"
              className="outline-none p-2 w-full"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <div>
            <Link
              to="add"
              className="bg-blacktext-white bg-black text-white p-2"
            >
              Add Book
            </Link>
          </div>
        </div>
        <DataTable
          data={filteredBook}
          idName="bookId"
          overflowMenu={overflowMenuItems}
        />
      </div>
      {showUploadModal && (
        <UploadImage
          id={selectedBookId}
          uploadFile={uploadImage}
          setDisplayModal={setUploadModal}
        />
      )}
      {showStockModal && (
        <StockUpdate
          bookId={selectedBookId}
          refreshBooks={getBooks}
          setDisplayStockModal={setStockModal}
        />
      )}
    </>
  );
};

export default BookDetails;
