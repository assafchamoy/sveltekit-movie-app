<script>
	import MovieList from '../components/movies/MovieList.svelte';
	import SearchBar from '../components/SearchBar.svelte';
</script>

<h1 class="title">Popular Movies</h1>
<div class="search_container">
	<SearchBar on:searchValueChange={({detail: {value}})=>{ console.log(value)}}/>
</div>
<MovieList />

<style>
	.title {
		margin: 20px 0px;
	}
	.search_container {
		width: 100%;
		align-items: center;
		justify-content: center;
	}
</style>
