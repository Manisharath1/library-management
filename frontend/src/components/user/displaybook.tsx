import Book from "@/model/Book";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getActiveBooks,
  getBookByCurrentUserBatch,
  getDemandingBooks,
} from "../services/bookservice";
import { useToast } from "../ui/use-toast";
import Books from "./books";

const DisplayBook = () => {
  const { type } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  const handleGetActiveBooksError = useCallback(
    (err) => {
      const response = err.response;
      if (response.status === 401) {
        navigate("/login");
      }

      const res = response.data;

      toast({
        title: res.title,
        description: res.detail,
        variant: "destructive",
      });
    },
    [navigate, toast]
  );

  const getBookList = useCallback(() => {
    if (type === "all") {
      getActiveBooks()
        .then((res) => {
          setBooks(res.data);
          setFilteredBooks(res.data);
        })
        .catch(handleGetActiveBooksError);
    } else if (type === "batch") {
      getBookByCurrentUserBatch()
        .then((res) => {
          setBooks(res.data);
          setFilteredBooks(res.data);
        })
        .catch(handleGetActiveBooksError);
    } else if (type == "demanding") {
      getDemandingBooks()
        .then((res) => {
          setBooks(res.data);
          setFilteredBooks(res.data);
        })
        .catch(handleGetActiveBooksError);
    }
  }, [handleGetActiveBooksError, type]);
  useEffect(() => {
    getBookList();
  }, [getBookList]);

  function onFiltered(value: string) {
    if (value.length > 3) {
      const searchBooks = books.filter(
        (book) =>
          book.author.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
          book.bookName.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      setFilteredBooks(searchBooks);
    } else {
      setFilteredBooks(books);
    }
  }
  return (
    <div>
      <div className="text-right mb-5">
        <input
          type="search"
          placeholder="Search here"
          className="shadow-lg px-3 py-2 w-64 outline-teal-600 rounded-lg"
          onChange={(e) => onFiltered(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-3 ">
        <Books books={filteredBooks} />
      </div>
    </div>
  );
};

export default DisplayBook;
