<script>
    import error from '$lib/assets/icons/error.svg';
</script>
<div class="error">
    <img class="error_icon" src={error} alt="error">
    <h3>Oops!</h3>
    <h4>Something went wrong here...</h4>
</div>

<style>
    .error_icon {
        height: 50px;
    }

    .error {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
    }
</style>