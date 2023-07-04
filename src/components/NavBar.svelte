<script lang="ts" context="module">
	export interface Route {
		path: `/${string}`;
		name: string;
	}
</script>

<script lang="ts">
	export let routesList: Route[] = [];
</script>

<nav class="navBar">
	{#each routesList as route}
		<a class="link" href={route.path}>{route.name}</a>
	{/each}
</nav>

<style>
	.navBar {
		display: flex;
		gap: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0px 0 25px -10px #3e18e9;
		height: var(--nav-bar-height);
		background-color: white;
		z-index: 999;
	}

	a {
		text-decoration: none;
		color: black;
		align-self: center;
		transition: all 0.1s ease-in-out;
	}

	.navBar > *:hover {
		color: #191919;
		transform: scale(1.1);
	}
</style>
