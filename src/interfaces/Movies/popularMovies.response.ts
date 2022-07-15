import type IMovie from './movie.entity';

interface IPopularMoviesResponse {
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

export default IPopularMoviesResponse;
