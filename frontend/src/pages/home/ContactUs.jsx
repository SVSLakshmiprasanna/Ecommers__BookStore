import React, { useState } from 'react';
import contactImg from '../../assets/news/news-1.png'; // Use a relevant image from assets

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you could send the form data to a backend or email service
  };

  return (
    <section className="w-full py-16 px-4 flex flex-col md:flex-row items-center gap-12 bg-white">
      <div className="md:w-1/2 w-full flex justify-center">
        <img src={contactImg} alt="Contact Us" className="max-w-xs md:max-w-md rounded-lg shadow-lg" />
      </div>
      <div className="md:w-1/2 w-full">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        {submitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded mb-4">Thank you for contacting us! We'll get back to you soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button type="submit" className="bg-green-800 hover:bg-green-900 text-white px-6 py-2 rounded font-semibold transition duration-200">Send Message</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactUs; 