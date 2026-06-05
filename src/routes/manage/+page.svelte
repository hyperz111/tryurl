<script>
	import { goto } from "$app/navigation";

	let token = $state("");
</script>

<h1>Manage</h1>

<label for="token">Enter the manage token</label>
<input type="text" id="token" bind:value={token} />
<button type="button" onclick={() => goto(`/manage/${token}`)}>Get it</button>
