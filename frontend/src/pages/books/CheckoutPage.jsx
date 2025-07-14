import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/features/cart/cartSlice';
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import Swal from 'sweetalert2';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [createOrder, { isLoading }] = useCreateOrderMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: currentUser?.email || '',
        phone: '',
        address: {
            city: '',
            country: '',
            state: '',
            zipcode: ''
        }
    });

    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
    });

    const [showCardDetails, setShowCardDetails] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice * (item.quantity || 1), 0).toFixed(2);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handlePaymentMethodChange = (method) => {
        setShowCardDetails(method === 'online');
    };

    const handleCardDetailsChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePlaceOrder = async () => {
        // Validate all required fields
        const requiredFields = {
            name: 'Full Name',
            email: 'Email',
            phone: 'Phone Number',
            'address.city': 'City'
        };

        const missingFields = Object.entries(requiredFields)
            .filter(([field]) => {
                if (field.includes('.')) {
                    const [parent, child] = field.split('.');
                    return !formData[parent]?.[child];
                }
                return !formData[field];
            })
            .map(([_, label]) => label);

        if (missingFields.length > 0) {
            Swal.fire({
                title: "Missing Information",
                text: `Please fill in all required fields: ${missingFields.join(', ')}`,
                icon: "error"
            });
            return;
        }

        if (showCardDetails) {
            // Validate card details
            if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardName) {
                Swal.fire({
                    title: "Missing Card Details",
                    text: "Please fill in all card details",
                    icon: "error"
                });
                return;
            }
        }

        if (cartItems.length === 0) {
            Swal.fire({
                title: "Empty Cart",
                text: "Your cart is empty. Please add items before placing an order.",
                icon: "error"
            });
            return;
        }

        try {
            const orderData = {
                name: formData.name,
                email: formData.email,
                phone: Number(formData.phone),
                address: {
                    city: formData.address.city,
                    country: formData.address.country || '',
                    state: formData.address.state || '',
                    zipcode: formData.address.zipcode || ''
                },
                productIds: cartItems.map(item => item._id),
                totalPrice: Number(totalPrice)
            };

            console.log('Sending order data:', orderData); // Debug log

            const result = await createOrder(orderData).unwrap();
            console.log('Order creation result:', result); // Debug log
            
            if (result) {
                dispatch(clearCart());
                setOrderPlaced(true);
                
                Swal.fire({
                    title: "Order Placed Successfully!",
                    text: "Thank you for your purchase.",
                    icon: "success"
                });

                setTimeout(() => {
                    navigate('/orders');
                }, 2000);
            }
        } catch (error) {
            console.error('Order creation error:', error);
            Swal.fire({
                title: "Error",
                text: error.data?.message || "Failed to place order. Please try again.",
                icon: "error"
            });
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Processing your order...</h2>
                </div>
            </div>
        );
    }

    if (orderPlaced) {
        return (
            <div className="min-h-[calc(100vh-200px)] w-full pl-4 pr-2 sm:pl-12 sm:pr-6 py-8 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
                        <p className="text-gray-600">Thank you for your purchase.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] w-full pl-4 pr-2 sm:pl-12 sm:pr-6 py-8 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>
                        
                        {/* Personal Details Form */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Details</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-gray-900 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-900 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                        placeholder="john@example.com"
                                        disabled={!!currentUser?.email}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-900 mb-2">Phone Number</label>
                                    <input
                                        type="number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                        placeholder="1234567890"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-900 mb-2">City</label>
                                    <input
                                        type="text"
                                        name="address.city"
                                        value={formData.address.city}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                        placeholder="City"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-900 mb-2">Country</label>
                                        <input
                                            type="text"
                                            name="address.country"
                                            value={formData.address.country}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                            placeholder="Country"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-900 mb-2">State</label>
                                        <input
                                            type="text"
                                            name="address.state"
                                            value={formData.address.state}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                            placeholder="State"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-900 mb-2">Zipcode</label>
                                    <input
                                        type="text"
                                        name="address.zipcode"
                                        value={formData.address.zipcode}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                        placeholder="12345"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Payment Method</h3>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => handlePaymentMethodChange('cod')}
                                    className={`px-4 py-2 rounded-md ${
                                        !showCardDetails
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                                    }`}
                                >
                                    Cash on Delivery (COD)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handlePaymentMethodChange('online')}
                                    className={`px-4 py-2 rounded-md ${
                                        showCardDetails
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                                    }`}
                                >
                                    Online Payment
                                </button>
                            </div>
                        </div>

                        {/* Card Details Form */}
                        {showCardDetails && (
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Enter Card Details</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-gray-900 mb-2">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={cardDetails.cardNumber}
                                            onChange={handleCardDetailsChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                            placeholder="1234 5678 9012 3456"
                                            maxLength="19"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-900 mb-2">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={cardDetails.expiryDate}
                                                onChange={handleCardDetailsChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                                placeholder="MM/YY"
                                                maxLength="5"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-900 mb-2">CVV</label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={cardDetails.cvv}
                                                onChange={handleCardDetailsChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                                placeholder="123"
                                                maxLength="3"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-900 mb-2">Name on Card</label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={cardDetails.cardName}
                                            onChange={handleCardDetailsChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Order Summary */}
                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex justify-between">
                                        <span className="text-gray-900">{item.title} x {item.quantity || 1}</span>
                                        <span className="text-gray-900">₹{item.newPrice * (item.quantity || 1)}</span>
                                    </div>
                                ))}
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between font-medium">
                                        <span className="text-gray-900">Total</span>
                                        <span className="text-gray-900">₹{totalPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <button
                            onClick={handlePlaceOrder}
                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            {showCardDetails ? `Pay ₹${totalPrice}` : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage; 