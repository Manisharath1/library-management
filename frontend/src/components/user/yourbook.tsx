import { useState, useEffect } from "react";
import BookIssue from "@/model/BookIssue";
import { allIssuedBookByUser } from "../services/bookIssueservice";
import { BiSearch } from "react-icons/bi";
import DataTable from "@/common/datatable";
const YourBook = () => {
  const overflowMenuItems = [];
  const [bookIssues, setBookIssues] = useState<BookIssue[]>([]);
  const [filteredBookIssue, setFilteredBookIssue] = useState<BookIssue[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getBookIssues();
  }, []);

  function getBookIssues() {
    try {
      allIssuedBookByUser().then((response) => {
        setBookIssues(response.data);
        setFilteredBookIssue(response.data);
      });
    } catch (err) {
      console.error(err);
    }
  }

  function onSearch(data: string) {
    setSearch(data);
    if (data.length > 3) {
      const result = bookIssues.filter(
        (bookIssue) =>
          bookIssue
            .bookName!.toLocaleLowerCase()
            .includes(data.toLocaleLowerCase()) ||
          bookIssue.studentReferenceNumber.includes(data) ||
          bookIssue.bookReferenceNumber
            .toLocaleLowerCase()
            .includes(data.toLocaleLowerCase())
      );
      setFilteredBookIssue(result);
    } else {
      setFilteredBookIssue(bookIssues);
    }
  }
  return (
    <div className="shadow-lg rounded-md p-5 bg-white">
      <h2 className="text-xl text-center font-bold p-2">Book Issue Details</h2>
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
      </div>
      <DataTable
        data={filteredBookIssue}
        idName="bookIssueId"
        overflowMenu={overflowMenuItems}
      />
    </div>
  );
};

export default YourBook;
