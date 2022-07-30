import type IMovie from './movie.entity';

export interface IPopularMoviesResponse {
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}