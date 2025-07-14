import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchBooksByGenreQuery, useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import BookCard from './BookCard';

const BooksByGenre = () => {
  const { genre } = useParams();
  const { data: genreBooks = [], isLoading: isGenreLoading, error: genreError } = useFetchBooksByGenreQuery(genre);
  const { data: allBooks = [], isLoading: isAllLoading, error: allError } = useFetchAllBooksQuery();

  const isLoading = genre ? isGenreLoading : isAllLoading;
  const error = genre ? genreError : allError;
  const books = genre ? genreBooks : allBooks;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading books. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-8 py-2 dark:bg-gray-900 bg-white min-h-screen">
      <h2 className="text-3xl font-semibold my-8">
        {genre ? `Books in the ${genre} Genre` : 'All Books'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {books.map((book) => (
          <div key={book._id} className="flex justify-center">
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksByGenre; 