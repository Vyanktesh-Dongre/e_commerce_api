
import React from 'react';

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center space-x-2">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`cursor-pointer px-2 py-1 rounded-md text-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`cursor-pointer ${number === currentPage ? 'font-bold' : ''}`}>
            <button
              onClick={() => paginate(number)}
              className={`px-2 py-1 rounded-md text-sm ${number === currentPage ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-300'}`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`cursor-pointer px-2 py-1 rounded-md text-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

