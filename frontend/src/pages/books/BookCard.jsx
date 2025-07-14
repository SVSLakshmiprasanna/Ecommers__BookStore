import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl'
import { FaHeart } from 'react-icons/fa'
import { Link } from'react-router-dom'
import { useDispatch, useSelector } from'react-redux'
import { addToCart, incrementQuantity, decrementQuantity } from '../../redux/features/cart/cartSlice'
import { addToWishlist } from '../../redux/features/wishlist/wishlistSlice'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { HiHeart } from 'react-icons/hi'
import Swal from 'sweetalert2';

const BookCard = ({book}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        if (!currentUser) {
            Swal.fire({
                title: "Login Required",
                text: "Please log in to add items to your cart.",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Login",
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }
        const alreadyInCart = cartItems.some(item => item._id === product._id);
        if (alreadyInCart) {
            Swal.fire({
                title: "Already in Cart",
                text: "This book is already in your cart!",
                icon: "info",
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            dispatch(addToCart(product));
            Swal.fire({
                title: "Added to Cart!",
                text: "The book has been added to your cart.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
        }
    }

    const handleAddToWishlist = () => {
        if (!currentUser) {
            Swal.fire({
                title: "Login Required",
                text: "Please log in to add items to your wishlist.",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Login",
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }
        dispatch(addToWishlist(book));
        Swal.fire({
            title: "Added to Wishlist!",
            text: "The book has been added to your wishlist.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        });
    };

    const cartItem = cartItems.find(item => item._id === book._id);

    return (
        <div className="w-full max-w-sm rounded-lg transition-shadow duration-300 bg-white dark:bg-gray-800 dark:border-gray-700 border border-gray-200 shadow-lg hover:shadow-xl">
            {/* Wishlist Heart Icon at top-right */}
            <button
                onClick={handleAddToWishlist}
                className="absolute top-3 right-3 bg-white dark:bg-gray-700 p-2 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-10"
                aria-label="Add to Wishlist"
            >
                <FaHeart className="text-red-500" />
            </button>
            <div className="flex flex-col h-full">
                <div className="h-64 w-full border-b border-gray-200 dark:border-gray-600 overflow-hidden">
                    <Link to={`/books/${book._id}`}>
                        <img
                            src={`${getImgUrl(book?.coverImage)}`}
                            alt={book?.title}
                            className="w-full h-full object-cover hover:scale-105 transition-all duration-200"
                        />
                    </Link>
                </div>

                <div className="flex-1 p-4 flex flex-col">
                    <Link to={`/books/${book._id}`}>
                        <h3 className="text-xl font-semibold hover:text-blue-600 mb-3 text-gray-900 dark:text-white line-clamp-2">
                            {book?.title}
                        </h3>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1">
                        {book?.description.length > 80 ? `${book.description.slice(0, 80)}...` : book?.description}
                    </p>
                    <div className="mt-auto">
                        <p className="font-medium mb-4 text-gray-900 dark:text-white">
                            ₹{book?.newPrice} <span className="line-through font-normal ml-2 text-gray-500 dark:text-gray-400">₹ {book?.oldPrice}</span>
                        </p>
                        {cartItem ? (
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            dispatch(decrementQuantity(book._id));
                                            Swal.fire({
                                                title: "Quantity Updated",
                                                text: "Cart quantity has been updated.",
                                                icon: "success",
                                                timer: 1500,
                                                showConfirmButton: false
                                            });
                                        }}
                                        className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white"
                                    >-</button>
                                    <span className="px-2 text-gray-900 dark:text-white">{cartItem.quantity}</span>
                                    <button
                                        onClick={() => {
                                            dispatch(incrementQuantity(book._id));
                                            Swal.fire({
                                                title: "Quantity Updated",
                                                text: "Cart quantity has been updated.",
                                                icon: "success",
                                                timer: 1500,
                                                showConfirmButton: false
                                            });
                                        }}
                                        className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white"
                                    >+</button>
                                </div>
                                <Link to="/cart" className="bg-green-800 hover:bg-green-900 text-white px-6 py-2 rounded flex items-center gap-2 whitespace-nowrap transition duration-200 dark:bg-green-700 dark:hover:bg-green-900 justify-center">
                                    View Cart
                                </Link>
                            </div>
                        ) : (
                            <button 
                                onClick={() => handleAddToCart(book)}
                                className="w-full bg-green-800 hover:bg-green-900 text-white px-6 py-2 rounded flex items-center gap-2 whitespace-nowrap transition duration-200 dark:bg-green-700 dark:hover:bg-green-900 justify-center"
                            >
                                <FiShoppingCart />
                                <span>Add to Cart</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookCard