import React, { useState } from 'react';
import Book from '@/model/Book';

const BASE_URL = `http://localhost:1205/api/v1`;

interface BooksProps {
  books: Book[];
}

const Books: React.FC<BooksProps> = ({ books }) => {
  const [approvalStatus, setApprovalStatus] = useState<{ [bookName: string]: 'pending' | 'approved' | 'issued' }>({});

  const handleIssue = (bookName: string) => {
    
    setApprovalStatus((prevStatus) => ({ ...prevStatus, [bookName]: 'pending' }));

    
    setTimeout(() => {
      setApprovalStatus((prevStatus) => ({ ...prevStatus, [bookName]: 'approved' }));

      setTimeout(() => {
        setApprovalStatus((prevStatus) => ({ ...prevStatus, [bookName]: 'issued' }));
      }, 1000); 
    }, 2000); 
  };

  return (
    <>
      {books.length > 0 ? (
        books.map(({ bookName, description, author, image }) => (
          <div key={bookName} className="max-w-sm rounded-lg overflow-hidden shadow-xl bg-white mb-4">
            {/* Add 'mb-4' for margin-bottom */}
            <img
              className="w-full"
              src={`${BASE_URL}/${image}`}
              alt="Book Cover"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{bookName}</div>
              <p className="text-gray-700 text-base">{description}</p>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-between items-center">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
                {author}
              </span>
              {approvalStatus[bookName] === 'issued' ? (
                <span className="text-green-500">Issued</span>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleIssue(bookName)}
                  disabled={approvalStatus[bookName] === 'pending' || approvalStatus[bookName] === 'approved'}
                >
                  {approvalStatus[bookName] === 'pending' ? 'Approval Pending' : 'Issue'}
                </button>
              )}
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
