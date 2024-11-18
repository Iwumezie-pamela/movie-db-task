import Link from 'next/link';
import React from 'react';
import { FaHeart } from 'react-icons/fa';


const Navbar = () => {

  return (
    <section className='flex items-center justify-between py-4 px-10 z-[100] absolute w-full'>
      <Link
        href='/'
        className='text-red-600 uppercase text-4xl font-bold cursor-pointer'
      >
        netflix
      </Link>

      <div className='ml-2 text-white '>
        
          <Link
            href='/favorites'
            className='flex items-center gap-1 text-red-600 py-1 px-1 sm:py-2 sm:px-6 rounded cursor-pointer'
          >
            <span> <FaHeart className=' text-gray-300' /></span>
         Favorites
          </Link>
        </div>
    </section>
  );
};

export default Navbar;
