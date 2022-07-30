<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Container from '$Components/Container.svelte';
	import NavBar, { type Route } from '$Components/NavBar.svelte';
	import SearchBar from '$Components/SearchBar.svelte';

	const routesList: Route[] = [
		{ path: '/', name: 'Home' },
		{ path: '/about', name: 'About' }
	];
	const hideSearchOnRoutes = ['movie/[id=integer]'];

	$: pageRoute = $page.routeId as string;

	$: hideSearchbar = hideSearchOnRoutes.includes(pageRoute);
</script>

<svelte:head>
	<title>Movie Searcher</title>
</svelte:head>

<div class="appContainer">
	<NavBar {routesList} />
	<Container>
		{#if !hideSearchbar}
			<div class="search_container">
				<SearchBar
					on:searchValueChange={({ detail: { value } }) => {
						if (value.trim()) {
							goto(`/search/${value}`, { keepfocus: true });
						} else {
							goto('/', { keepfocus: true });
						}
					}}
				/>
			</div>
		{/if}
		<slot />
	</Container>
</div>

<style>
	@import '../global.css';
</style>
