<script lang="ts">
import { page } from '$app/stores';

import { onDestroy, onMount } from 'svelte';

	import MovieList from '$Components/movies/MovieList.svelte';
	import type { ISearchResult } from '$IMovies';
	import { moviesList, resetMoviesList, resetScrollTopPosition } from '$Stores/moviesList.store';

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

	onMount(() => {
		resetScrollTopPosition({pathName: $page.url.pathname, except: true})
	})

	onDestroy(() => {
		resetMoviesList();
	})
</script>
<h1 class="title">Search Results</h1>
<MovieList />
