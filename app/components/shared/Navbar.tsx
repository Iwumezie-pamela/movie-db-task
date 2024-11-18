import Link from 'next/link';
import React from 'react';


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
            href='/favorite'
            className=' bg-red-600  py-1 px-1 sm:py-2 sm:px-6 rounded cursor-pointer'
          >
         Favorite
          </Link>
        </div>
    </section>
  );
};

export default Navbar;
