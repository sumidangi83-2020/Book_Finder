import React, { useState } from "react";
import BookList from "./BookList"; // Import BookList component to display fetched books

export default function App() {
  const [search, setSearch] = useState(""); // Stores current search input
  const [books, setBooks] = useState([]);   // Stores books fetched from API
  const [loading, setLoading] = useState(false); // Loading indicator while fetching
  const [error, setError] = useState("");   // Stores any error messages

  // Updates search state when user types in input
  const handleInputChange = (e) => setSearch(e.target.value);

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on submit
    if (!search.trim()) return; // Prevent submission if input is empty

    setError(""); // Clear previous errors
    setBooks([]); // Clear previous search results
    setLoading(true); // Show loading spinner

    try {
      // Fetch books from Open Library API using the search term
      const res = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(search)}`);
      if (!res.ok) throw new Error("Unable to fetch data"); // Handle HTTP errors
      const data = await res.json();

      // Handle no results
      if (!data.docs || data.docs.length === 0) throw new Error("No results found");

      setBooks(data.docs); // Update books state with fetched results
    } catch (err) {
      setError(err.message || "Unexpected error"); // Display any errors
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Book Finder</h1>

      {/* Search form */}
      <form className="flex mb-6 w-full max-w-md" onSubmit={handleSubmit}>
        <input
          type="text"
          aria-label="Search for a book title"
          className="flex-1 px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Search for a book title..."
          value={search} // Bind input to search state
          onChange={handleInputChange} // Update state on typing
        />
        <button
          type="submit"
          disabled={!search.trim()} // Disable button if input is empty
          className={`px-6 py-2 rounded-r text-white 
            ${search.trim() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          Search
        </button>
      </form>

      {/* Loading spinner */}
      {loading && (
        <div role="status" className="flex justify-center my-4">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {/* Message when no books found */}
      {!loading && !error && books.length === 0 && search.trim() && (
        <div className="text-center text-gray-700 mt-6">
          No books found for "<span className="font-semibold">{search}</span>". Try a different title.
        </div>
      )}

      {/* Display error message */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Display list of books using BookList component */}
      {books.length > 0 && <BookList books={books} />}
    </div>
  );
}
