<script>
	let { form } = $props();
</script>

<h1>Create</h1>

<form method="POST">
	<textarea name="urls" placeholder="One URL per line" required></textarea>
	<button type="submit">Create</button>
</form>

{#if form?.success}
	<p>Slug: {form.slug}</p>
	<p>Token: {form.token}</p>
{/if}
