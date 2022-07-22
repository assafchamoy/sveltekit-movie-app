<script lang="ts">
	import MovieList from '../../components/movies/MovieList.svelte';
	import type { ISearchResult } from '../../interfaces/Movies/searchResult.response';
	import { moviesList } from '../../stores/moviesList.store';

	export let searchResults: ISearchResult;

	$: {
		if (searchResults) {
			moviesList.set({
				isLoading: false,
				movies: searchResults.results,
				page: searchResults.page,
				total: searchResults.total_pages
			});
		}
	}
</script>

<MovieList />
