<script lang="ts">
	import Container from '../components/Container.svelte';

	import NavBar, { type Route } from '../components/NavBar.svelte';
	const routesList: Route[] = [
		{ path: '/', name: 'Home' },
		{ path: '/about', name: 'About' }
	];
</script>

<svelte:head>
	<title>Movie Searcher</title>
</svelte:head>

<div class="appContainer">
	<NavBar {routesList} />
	<Container>
		<slot />
	</Container>
	<!-- <footer class="foot">Movie App inc</footer> -->
</div>

<style>
	@import '../global.css';
</style>
