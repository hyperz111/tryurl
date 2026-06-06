<script>
	let {
		urls = $bindable([]),
		submitButtonText,

		header,
		footer,
	} = $props();

	let value = $derived(urls.join("\n"));

	const remove = (index) => {
		if (urls.length > 1) {
			urls = [...urls.slice(0, index), ...urls.slice(index + 1)];
		}
	};

	const add = () => {
		urls = [...urls, ""];
	};
</script>

<form method="POST">
	{@render header?.()}
	<input type="hidden" name="urls" {value} />

	<div>
		{#each urls as _, index}
			<span>
				<input type="url" bind:value={urls[index]} required />
				<button type="button" onclick={() => remove(index)}>×</button>
			</span>
		{/each}
	</div>

	<button type="button" onclick={add}>Add</button>
	<button type="submit">{submitButtonText}</button>
	{@render footer?.()}
</form>
