<script>
	import EditUrlForm from "$lib/EditUrlForm.svelte";

	let { form } = $props();

	let urls = $state([""]);
	let resultSections = $derived([
		{
			id: "slug",
			label: "Slug Name",
			value: form?.slug,
		},
		{
			id: "token",
			label: "Edit Token",
			value: form?.token,
		},
	]);
</script>

<h1 class="title has-text-centered">Create</h1>

{#if form?.reason}
	<div class="box container is-max-tablet has-background-danger has-text-white">
		<p>{form?.reason}</p>
	</div>
{/if}

<EditUrlForm isCreate={true} bind:urls showForm={!form || !form?.success}>
	{#each resultSections as { id, label, value } (id)}
		<div>
			<label for={id} class="label">{label}</label>
			<input type="text" {id} class="input is-static has-text-centered" {value} readonly />
		</div>
	{/each}
</EditUrlForm>
