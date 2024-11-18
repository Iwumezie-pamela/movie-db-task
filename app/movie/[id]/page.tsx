'use client'

import { useEffect, useState } from 'react';
import api from '@/app/api/apiClient';
import { MovieDetailModel } from '@/app/components/models/MovieModel';
import Image from 'next/image';

// Update Props type to reflect that params is a Promise
export type Props = {
  params: Promise<{ id: string }>;
};

function MovieDetail({ params }: Props) {
  const [movie, setMovie] = useState<MovieDetailModel>();
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState<string | null>(null);

  // Use an effect to resolve the params promise and set the ID
  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;  // Unwrap the promise
      setId(resolvedParams.id);  // Set the ID
    };

    fetchParams();
  }, [params]);

  const fetchMovie = async () => {
    if (!id) return;

    setIsLoading(true);

    try {
      const response = await api.get(`/movie/${id}`);
      const data = response.data;
      setMovie(data);
      console.log('Movie Data:', data);
    } catch (error) {
      console.error('Error fetching movie:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovie();
    }
  }, [id]); // Trigger when id is set


  return (
  <div>
  {isLoading && !movie ? (
      <div className="flex justify-center h-screen items-center mt-5">
      <div className="w-10 h-10 border-4 border-red-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  ) : (
  movie && (
    <div className="px-10 py-20 mx-auto">
    <h1 className="text-2xl md:text-4xl mb-10 font-bold">{movie?.title}</h1>
   <div className="flex flex-col md:flex-row justify-between gap-10">
   <div className="w-full">
   <Image
      src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
      alt='movie image'
      width={100}
      height={100}
      className='object-cover w-full h-[300px] md:h-[500px] rounded-lg'
    />
   </div>
  <div className="w-full">
  <p className='text-base mb-4'>{movie?.overview}</p>
    <ul className='flex items-center gap-2'>
    Genre -
      {movie?.genres?.map((genre,index) => (
       <li className="text-white/70" key={genre.id}>
      {genre.name}
       {index < movie.genres.length - 1 && <span>,</span>}
     </li>
      ))}
    </ul>
  </div>
   </div>
  </div>
  )
  )}

  </div>
  );
}

export default MovieDetail;
