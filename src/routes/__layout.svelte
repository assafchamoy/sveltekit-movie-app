<script>
    import {fly} from 'svelte/transition';
</script>

<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
</nav>

<div in:fly class="appContainer">
    <slot />
    <footer>Movie App inc</footer>
</div>

<style>
    @import '../../static/global.css';
</style>