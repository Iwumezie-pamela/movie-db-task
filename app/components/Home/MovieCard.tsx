import React from 'react'
import { MovieResponse } from '../models/MovieModel';
import Link from 'next/link';

type Props = {
    movie: MovieResponse
}


function MovieCard({movie} : Props) {
    console.log({movie})
    return (
        <Link href={`/movie/${movie.id}`}>
          <div className="rounded-lg shadow-md overflow-hidden hover:scale-105 transition">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto object-cover"
            />
            <div className="p-2">
              <h3 className="font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-500">{movie.release_date}</p>
              <p className="text-sm text-yellow-500">⭐ {movie.vote_average.toFixed(1)}</p>
            </div>
          </div>
        </Link>
      );
}

export default MovieCard