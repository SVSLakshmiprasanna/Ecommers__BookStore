import React from 'react';
import { useFetchRecommendedBooksQuery } from '../../redux/features/books/booksApi';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Recommended = () => {
  const { data: books = [], isLoading, error } = useFetchRecommendedBooksQuery();

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
      <div className="flex items-center mb-6">
        <h2 className="text-3xl font-semibold">Recommended For You</h2>
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

export default Recommended;