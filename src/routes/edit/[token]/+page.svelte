<script>
	import EditUrlForm from "$lib/EditUrlForm.svelte";

	let { data, form } = $props();

	// Make it editable
	let urls = $state([...data.urls]);
</script>

<h1>Edit Slug</h1>

<EditUrlForm submitButtonText="Update" bind:urls>
	{#snippet header()}
		<p>Slug: {data.slug}</p>
	{/snippet}
</EditUrlForm>

{#if form?.success}
	<p>Success</p>
{/if}
