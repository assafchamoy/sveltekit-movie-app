import type { ISearchedMovie } from './searchedMovie.entity';

export interface ISearchResult {
	page: number;
	results: ISearchedMovie[];
	total_results: number;
	total_pages: number;
}
