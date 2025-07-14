import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams, useNavigate } from "react-router-dom"
import { FaHeart } from 'react-icons/fa';
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import { addToWishlist } from '../../redux/features/wishlist/wishlistSlice';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const SingleBook = () => {
    const {id} = useParams();
    const {data: book, isLoading, isError} = useFetchBookByIdQuery(id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useAuth();

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
        dispatch(addToCart(product));
        Swal.fire({
            title: "Added to Cart!",
            text: "The book has been added to your cart.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        });
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

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error happening to load book info</div>
  
    return (
        <div className="max-w-lg shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

            <div className=''>
                <div>
                    <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                        className="mb-8"
                    />
                </div>

                <div className='mb-5'>
                    <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author || 'admin'}</p>
                    <p className="text-gray-700 mb-4">
                        <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-4 capitalize">
                        <strong>Category:</strong> {book?.category}
                    </p>
                    <p className="text-gray-700"><strong>Description:</strong> {book.description}</p>
                </div>

                <button 
                    onClick={() => handleAddToCart(book)} 
                    className="btn-primary px-6 space-x-1 flex items-center gap-1"
                >
                    <FiShoppingCart className="" />
                    <span>Add to Cart</span>
                </button>

                <button 
                    onClick={handleAddToWishlist} 
                    className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                >
                    <FaHeart />
                </button>
            </div>
        </div>
    )
}

export default SingleBook