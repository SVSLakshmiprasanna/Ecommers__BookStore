import { Link } from "react-router-dom";
import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineBookOpen,
} from "react-icons/hi2";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import avatarImg from "../assets/avatar.png";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useTheme } from '../context/ThemeContext';
import React from 'react';
import { useLazySearchBooksQuery } from '../redux/features/books/booksApi';

const navigation = [
  { name: 'Orders', href: '/orders' },
  { name: 'Cart Page', href: '/cart' },
  { name: 'Check Out', href: '/checkout' },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { isDarkMode, toggleTheme } = useTheme();

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [triggerSearch, { data: searchedBooks, isFetching }] = useLazySearchBooksQuery();
  const inputRef = React.useRef();
  const avatarRef = useRef();
  const dropdownRef = useRef();
  const searchDropdownRef = useRef();

  const handleLogOut = () => {
    logout();
    alert('Logged out successfully!');
    navigate('/');
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsSearchDropdownOpen(false);
      }
    }
    if (isDropdownOpen || isSearchDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isSearchDropdownOpen]);

  return (
    <header className="w-full bg-white dark:bg-gray-900 dark:text-white shadow-md sticky top-0 z-50">
      <div className="w-full px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Left side - Home and Title */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
            <HiOutlineHome className="size-6" />
          </Link>
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-green-800 hover:text-green-900 transition duration-200 dark:text-green-400 dark:hover:text-green-300">
              <span>BookShelf</span>
            </Link>
            </div>

          {/* Middle - Search */}
          <div className="flex-1 max-w-xl mx-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  triggerSearch(searchQuery);
                  setIsSearchDropdownOpen(false);
                }
              }}
              className="relative flex items-center gap-2"
            >
              <div className="relative flex-1">
                <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.trim()) {
                      triggerSearch(e.target.value);
                      setIsSearchDropdownOpen(true);
                    } else {
                      setSearchResults([]);
                      setIsSearchDropdownOpen(false);
                    }
                  }}
                  className="w-full py-2 pl-10 pr-10 bg-[#EAEAEA] border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                      setIsSearchDropdownOpen(false);
                      inputRef.current && inputRef.current.focus();
                    }}
                    aria-label="Clear search"
                  >
                    <IoClose size={20} />
                  </button>
                )}
                {searchedBooks && searchedBooks.length > 0 && isSearchDropdownOpen && (
                  <div ref={searchDropdownRef} className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
                    <ul>
                      {searchedBooks.map((book) => (
                        <li
                          key={book._id}
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => {
                            navigate(`/books/${book._id}`);
                            setSearchQuery('');
                            setSearchResults([]);
                            setIsSearchDropdownOpen(false);
                          }}
                        >
                          {book.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </form>
        </div>

          {/* Right side - Navigation Items */}
          <div className="flex items-center gap-4">
            {/* View Books Button */}
            <Link 
              to="/books"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <HiOutlineBookOpen className="size-5" />
              <span className="hidden sm:inline">View Books</span>
            </Link>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <HiOutlineSun className="size-6" />
              ) : (
                <HiOutlineMoon className="size-6" />
              )}
            </button>
            <div className="relative">
            {currentUser ? (
              <>
                  <button ref={avatarRef} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt=""
                      className={`size-7 rounded-full ${currentUser ? "ring-2 ring-blue-500" : ""}`}
                  />
                </button>
                {isDropdownOpen && (
                    <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-40">
                    <ul className="py-2">
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                          >
                            My Profile
                          </Link>
                        </li>
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>
            {/* Wishlist */}
            <Link to="/wishlist" className="hidden sm:block">
            <HiOutlineHeart className="size-6" />
            </Link>
            {/* Cart */}
          <Link
            to="/cart"
            className="bg-green-800 hover:bg-green-900 text-white p-1 sm:px-6 px-2 flex items-center rounded-sm transition duration-200"
          >
            <HiOutlineShoppingCart className="" />
            <span className="text-sm font-semibold text-white sm:ml-1">
              {cartItems.length > 0 ? cartItems.length : "0"}
            </span>
          </Link>
        </div>
      </nav>
      </div>
    </header>
  );
};

export default Navbar;
