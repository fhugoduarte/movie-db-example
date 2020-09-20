import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';

import MovieList, {Movie as MovieType} from './components/MovieList';
import api from './services/api';

interface RequestResponse {
  page: number;
  results: Array<MovieType>;
  total_pages: number;
  total_results: number;
}

const App = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Array<MovieType>>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useRef({value: 0});
  const totalResults = useRef({value: 0});

  const totalMoviesFetched = useMemo(() => {
    return movies.length * currentPage;
  }, [movies, currentPage])

  useEffect(() => {
    setLoading(true);
    api.get<RequestResponse>('trending/all/day', {
      params: {
        page: currentPage,
      }
    }).then(response => {
      setMovies(response.data.results);
      totalPages.current.value = response.data.total_pages;
      totalResults.current.value = response.data.total_results;
      setLoading(false);
    });
  }, [currentPage])

  const handleNextPage = useCallback(() => {
    setCurrentPage(oldState => {
      if (oldState >= totalPages.current.value ) {
        return oldState;
      }

      return oldState + 1;
    });
  }, []);
  
  const handlePrevPage = useCallback(() => {
    setCurrentPage(oldState => {
      if (oldState > 1) {
        return oldState - 1;
      }

      return  oldState;
    });
  }, []);

  return (
    <>
      <h1>Trending Movies</h1>
  
      {loading ? <h2>Loading...</h2> : (
        <MovieList movies={movies} />
      )}

      <footer>
        <button onClick={handlePrevPage}>Prev</button>
          {`${totalMoviesFetched} de ${totalResults.current.value}`}
        <button onClick={handleNextPage}>Next</button>
      </footer>
    </>
  )
}

export default App;