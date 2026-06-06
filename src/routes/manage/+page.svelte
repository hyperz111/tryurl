<script>
	import { goto } from "$app/navigation";

	let token = $state("");
	let path = $derived(`/manage/${token}`);
</script>

<h1>Manage</h1>

<label for="token">Enter the manage token</label>
<input type="text" id="token" bind:value={token} />
<button type="button" onclick={() => goto(path)}>Get it</button>
