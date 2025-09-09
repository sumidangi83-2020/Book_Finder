import React from "react";

// BookList component receives 'books' as props from App.js
export default function BookList({ books }) {
  return (
    // Container for all book cards in a responsive grid
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
      {books.map((book, idx) => (
        // Individual book card
        <div
          key={idx} // Unique key for React list rendering
          className="bg-white rounded shadow p-4 flex flex-col items-center"
        >
          {/* Book cover image */}
          <img
            src={
              book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` // If cover exists, use it
                : "https://via.placeholder.com/128x192?text=No+Cover" // Otherwise, placeholder image
            }
            alt={book.title}
            className="h-48 w-auto mb-3 rounded"
          />

          {/* Book title */}
          <h2 className="text-lg font-medium text-center">{book.title}</h2>

          {/* Author name(s) */}
          <p className="text-gray-600 text-sm text-center">
            {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
            {/* If authors exist, join them with commas, else display 'Unknown Author' */}
          </p>
        </div>
      ))}
    </div>
  );
}
