<script>
	import EditUrlForm from "$lib/EditUrlForm.svelte";
	import { nanoid } from "nanoid";

	let { form } = $props();

	let urls = $state([""]);
	let slug = $state("");
</script>

<h1>Create</h1>

<EditUrlForm submitButtonText="Create" bind:urls>
	{#snippet header()}
		<div>
			<label for="slug">Slug name:</label>
			<span>
				<input type="text" name="slug" bind:value={slug} required />
				<button type="button" onclick={() => (slug = nanoid(12))}>🎲</button>
			</span>
		</div>
	{/snippet}
</EditUrlForm>

{#if form}
	{#if form.success}
		<p>Slug Name: {form.slug}</p>
		<p>Edit Token: {form.token}</p>
	{:else}
		<p>{form.reason}</p>
	{/if}
{/if}
