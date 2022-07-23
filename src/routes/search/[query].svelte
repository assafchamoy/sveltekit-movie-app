<script lang="ts">
import { page } from '$app/stores';

import { onMount } from 'svelte';

	import MovieList from '../../components/movies/MovieList.svelte';
	import type { ISearchResult } from '../../interfaces/Movies/searchResult.response';
	import { moviesList, resetScrollTopPosition } from '../../stores/moviesList.store';

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
</script>

<MovieList />
