import requestHandler from '../axios';
import type IPopularMoviesResponse from '../interfaces/Movies/popularMovies.response';
import { moviesList } from './moviesList.store';

interface PopularMoviesParams {
	language?: 'he' | 'en-US';
	page: number;
}

export const fetchPopularMovieList = async ({
	language = 'en-US',
	...rest
}: PopularMoviesParams) => {
	const popularMoviesRes = await requestHandler
		.get<IPopularMoviesResponse>('movie/popular', { params: { language, ...rest } })
		.then((res) => res.data);

	moviesList.update(({ movies: prevMovies }) => ({
		page: rest.page,
		movies: [...prevMovies, ...popularMoviesRes.results],
		isLoading: false,
		total: popularMoviesRes.total_results
	}));
};

fetchPopularMovieList({ page: 1 });
