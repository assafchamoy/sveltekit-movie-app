import { writable } from 'svelte/store';
import requestHandler from '../axios';
import type IMovie from '../interfaces/Movies/movie.entity';
import type IPopularMoviesResponse from '../interfaces/Movies/popularMovies.response';

interface PopularMovies {
	page: number;
	movies: IMovie[];
	isLoading: boolean;
	total: number;
}

export const popularMovies = writable<PopularMovies>({
	page: 1,
	movies: [],
	isLoading: true,
	total: 0
});

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

	popularMovies.update(({ movies: prevMovies }) => ({
		page: rest.page,
		movies: [...prevMovies, ...popularMoviesRes.results],
		isLoading: false,
		total: popularMoviesRes.total_results
	}));
};

fetchPopularMovieList({ page: 1 });
