<script>
    let num = 0;

    const incNumber = () => {
        if(num < 10) num += 1;
    } 
 
    const decNumber = () => {
        if(num > 0) num -= 1;
    } 
</script>
<div>
    <h1>Count is: {num}</h1>
    <button on:click={incNumber}>Increment</button>
    <button on:click={decNumber}>Decrement</button>
</div>