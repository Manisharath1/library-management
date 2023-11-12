import { useEffect, useState } from "react";
import { allBookIssue, returnBook } from "../services/bookIssueservice";
import DataTable from "@/common/datatable";
import { BiSearch } from "react-icons/bi";
import OverFlowMenuItem from "@/model/OverFlowMenuItem";
import { useToast } from "../ui/use-toast";
import BookIssue from "@/model/BookIssue";
import BookIssueModal from "./forms/modal-issue-book";

const IssueBook = () => {
  const { toast } = useToast();
  const [bookIssues, setBookIssues] = useState<BookIssue[]>([]);
  const [filteredBookIssue, setFilteredBookIssue] = useState<BookIssue[]>([]);
  const [search, setSearch] = useState("");
  const [displayBookIssueModal, setDisplayBookIssueModal] = useState(false);

  const overflowMenuItems: OverFlowMenuItem[] = [
    {
      label: "Mark Return",
      callBack: markReturn,
    }
  ];

  function markReturn(id: string) {
    try {
      returnBook(id).then(() => {
        getBookIssues();
        toast({ title: "Book returned" });
      });
    } catch (err) {
      console.error(err);
    }
  }

  function getBookIssues() {
    try {
      allBookIssue().then((response) => {
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

  useEffect(() => {
    getBookIssues();
  }, []);

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
        <div>
          <button
            className="bg-blacktext-white bg-black text-white p-2"
            onClick={() => {
              setDisplayBookIssueModal(true);
            }}
          >
            Issue Book
          </button>
        </div>
      </div>
      <DataTable
        data={filteredBookIssue}
        idName="bookIssueId"
        overflowMenu={overflowMenuItems}
      />
      {displayBookIssueModal && (
        <BookIssueModal
          setDisplayIssueModal={setDisplayBookIssueModal}
          updateBookIssueData={getBookIssues}
        />
      )}
    </div>
  );
};

export default IssueBook;
