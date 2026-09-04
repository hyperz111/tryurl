<svelte:head>
	<title>Edit - TryURL</title>
</svelte:head>

<h1 class="title has-text-centered">Edit</h1>

<form method="GET" class="box is-flex is-flex-direction-column is-gap-1 container is-max-tablet has-text-centered">
	<label for="token" class="label">Enter Your Edit Token</label>
	<input name="token" id="token" class="input" placeholder="Your token..." required />
	<button type="submit" class="button is-primary">Edit</button>
</form>
