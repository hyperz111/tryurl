<script>
	import EditUrlForm from "$lib/EditUrlForm.svelte";

	let { form } = $props();

	let urls = $state([""]);
</script>

<h1>Create</h1>

<EditUrlForm submitButtonText="Create" bind:urls>
	{#snippet header()}
		<span>
			<label for="slug">Slug name:</label>
			<input type="text" name="slug" required>
		</span>
	{/snippet}
</EditUrlForm>

{#if form?.success}
	<p>Slug Name: {form.slug}</p>
	<p>Edit Token: {form.token}</p>
{/if}
