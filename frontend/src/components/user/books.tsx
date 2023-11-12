import Book from "@/model/Book";

const BASE_URL = `http://localhost:1205/api/v1`;

interface BooksProps {
  books: Book[];
}

const Books: React.FC<BooksProps> = ({ books }) => {
  return (
    <>
      {books.length > 0 ? (
        books.map(({  bookName, description, author, image }) => (
          <div className="max-w-sm rounded-lg overflow-hidden shadow-xl bg-white">
            <img
              className="w-full"
              src={`${BASE_URL}/${image}`}
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{bookName}</div>
              <p className="text-gray-700 text-base">{description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {author}
              </span>
            </div>
          </div>
        ))
      ) : (
        <h1>No book found</h1>
      )}
    </>
  );
};

export default Books;
