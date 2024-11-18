import React, { useEffect, useState } from 'react'
import { MovieResponse } from '../models/MovieModel';
import Link from 'next/link';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Image from 'next/image';
import { getFavorites, saveFavorites } from '@/utils/localStorage';

type Props = {
  movie: MovieResponse
}


function MovieCard({ movie }: Props) {
  console.log({ movie })

  const [like, setLike] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    setLike(favorites.some((fav) => fav.id === movie.id));
  }, [movie.id]);

  const saveShow = () => {
    const favorites = getFavorites();
    if (like) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
      saveFavorites(updatedFavorites);
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, movie];
      saveFavorites(updatedFavorites);
    }
    setLike(!like);
  };

  return (
   
      <div className="rounded-lg shadow-md overflow-hidden hover:scale-105 transition">
        <div
          className=' inline-block relative p-2'
          key={movie?.id}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
            alt='movie image'
            width={100}
            height={100}
            className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[500px]'
          />

          <div className='absolute top-0 left-0 w-full h-full hover:bg-black/60 opacity-0 hover:opacity-100 text-white hover:transition-all hover:ease-in-out  hover:duration-150'>
            <p className='cursor-pointer' onClick={saveShow}>
              {like ? (
                <FaHeart className='absolute top-4 left-4 text-gray-300' />
              ) : (
                <FaRegHeart className='absolute top-4 left-4 text-gray-300' />
              )}
            </p>
          </div>
        </div>
        <Link href={`/movie/${movie.id}`}>
        <div className="p-2">
          <h3 className="font-semibold">{movie.title}</h3>
          <p className="text-sm text-gray-500">{movie.release_date}</p>
          <p className="text-sm text-yellow-500">⭐ {movie.vote_average && movie.vote_average.toFixed(1)}</p>
        </div>
        </Link>
      </div>
  );
}

export default MovieCard