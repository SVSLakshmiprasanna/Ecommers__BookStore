import React from 'react'
import { useNavigate } from 'react-router-dom';
import bannerImg from "../../assets/banner.png"

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
         <div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img src={bannerImg} alt="" />
        </div>
        
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>Find the best reads</h1>
            <p className='mb-10'>This week's new arrivals bring a fresh wave of unforgettable stories—from gripping thrillers that keep you on the edge of your seat, to powerful memoirs that stay with you long after the last page. Whether you're in the mood to escape, reflect, or be inspired, there's something here waiting just for you</p>

            <button 
              className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded transition duration-200"
              onClick={() => navigate('/books')}
            >
              Start Reading
            </button>

        </div>

       
    </div>
  )
}

export default Banner