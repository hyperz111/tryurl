<script>
	import EditUrlForm from "$lib/EditUrlForm.svelte";

	let { data, form } = $props();

	// Make it editable
	let urls = $state([...data.urls]);
</script>

<h1>Edit Slug</h1>

<EditUrlForm submitButtonText="Update" bind:urls>
	{#snippet header()}
		<div>
			<label for="slug">Slug name:</label>
			<input type="text" name="slug" value={data.slug} readonly />
		</div>
	{/snippet}
</EditUrlForm>

{#if form?.success}
	<p>Success</p>
{/if}
