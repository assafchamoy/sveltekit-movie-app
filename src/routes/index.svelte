<script>
    let num = 0;

    const incNumber = () => {
        if(num < 10) num += 1;
    } 
 
    const decNumber = () => {
        if(num > 0) num -= 1;
    } 
</script>
<div class="countView">

    <h1>Count is: {num}</h1>
    <div class="buttons">
        <button on:click={decNumber}>Decrement</button>
        <button on:click={incNumber}>Increment</button>
    </div>
</div>

<style>
    .countView {
        flex-direction: column;
        gap: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>