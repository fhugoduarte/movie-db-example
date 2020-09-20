import React, {memo, useCallback} from 'react';

import './styles.css';

export interface Movie {
  id: number;
  original_name?: string;
  title?: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

interface Props {
  movies: Array<Movie>;
}

const MovieList = ({movies} : Props): JSX.Element => {
  const getMovieName = useCallback((movie: Movie) => {
    return movie.original_name || movie.title;
  }, []);

  return (
    <ul>
      {movies.map(movie => (
        <li key={`movie-${movie.id}`}>
          <img alt={`Poster do filme ${getMovieName(movie)}`} src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
          
          <span>
            {getMovieName(movie)}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default memo(MovieList);