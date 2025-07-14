import React, { useEffect, useState } from 'react'
import BookCard from '../books/BookCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchTopSellingBooksQuery } from '../../redux/features/books/booksApi';
import { useNavigate } from 'react-router-dom';

const categories = [
    { value: 'bestsellers', label: 'Bestsellers' },
    { value: 'new_releases', label: 'New Releases' },
    { value: 'award_winning', label: 'Award-Winning Books' },
    { value: 'holiday_seasonal', label: 'Holiday & Seasonal Reads' },
    { value: 'cookbooks', label: 'Cookbooks & Culinary Arts' },
    { value: 'travel_adventure', label: 'Travel & Adventure' },
    { value: 'art_photography', label: 'Art & Photography' },
    { value: 'religion_spirituality', label: 'Religion & Spirituality' },
    { value: 'hobby_crafting', label: 'Hobby & Crafting Guides' },
    { value: 'picture_books', label: 'Picture Books' },
    { value: 'middle_grade', label: 'Middle Grade Fiction' },
    { value: 'ya_fantasy_scifi', label: 'Young Adult Fantasy & Sci-Fi' },
    { value: 'educational', label: 'Educational Books' },
    { value: 'comics_graphic', label: 'Comics & Graphic Novels' },
    { value: 'textbooks', label: 'Textbooks' },
    { value: 'research_journals', label: 'Research Journals' },
    { value: 'dictionaries_encyclopedias', label: 'Dictionaries & Encyclopedias' },
    { value: 'law_legal', label: 'Law & Legal Studies' },
    { value: 'medical_healthcare', label: 'Medical & Healthcare Books' },
    { value: 'biography_memoir', label: 'Biography & Memoir' },
    { value: 'self_help', label: 'Self-Help & Personal Development' },
    { value: 'business_finance', label: 'Business & Finance' },
    { value: 'science_technology', label: 'Science & Technology' },
    { value: 'health_wellness', label: 'Health & Wellness' },
    { value: 'literary_fiction', label: 'Literary Fiction' },
    { value: 'mystery_thriller', label: 'Mystery & Thriller' },
    { value: 'science_fiction_fantasy', label: 'Science Fiction & Fantasy' },
    { value: 'historical_fiction', label: 'Historical Fiction' },
    { value: 'romance', label: 'Romance' },
];

const TopSellers = () => {
  const { data: books = [], isLoading, error } = useFetchTopSellingBooksQuery();
  const navigate = useNavigate();

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    if (genre) {
      navigate(`/books/genre/${genre}`);
    }
  };

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
    <div className="py-10">
      <div className="flex flex-col items-start mb-6">
        <h2 className="text-3xl font-semibold mb-4">Top Sellers</h2>
        <select
          onChange={handleGenreChange}
          className="border bg-[#EAEAEA] dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none transition-colors"
        >
          <option value="">Select a Genre</option>
          {categories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <button
          className="custom-swiper-prev absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white dark:bg-white dark:text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow hover:bg-gray-900 dark:hover:bg-gray-200 transition z-20"
          aria-label="Previous"
        >
          {'<'}
        </button>
        <button
          className="custom-swiper-next absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white dark:bg-white dark:text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow hover:bg-gray-900 dark:hover:bg-gray-200 transition z-20"
          aria-label="Next"
        >
          {'>'}
        </button>
        <Swiper
          slidesPerView={1}
          spaceBetween={4}
          navigation={{
            nextEl: '.custom-swiper-next',
            prevEl: '.custom-swiper-prev',
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 4,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 8,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            1180: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper mx-2"
        >
          {books.map((book) => (
            <SwiperSlide key={book._id} className="bg-white dark:bg-gray-900">
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopSellers