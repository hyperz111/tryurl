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
	<fieldset>
		{@render header?.()}

		<div>
			<label>URLs</label>

			<ul>
				{#each urls as _, index}
					<li>
						<input type="url" bind:value={urls[index]} required />
						<button type="button" onclick={() => remove(index)}>×</button>
					</li>
				{/each}
			</ul>

			<button type="button" onclick={add}>Add</button>
			<input type="hidden" name="urls" {value} />
		</div>

		<div>
			<button type="submit">{submitButtonText}</button>
			{@render footer?.()}
		</div>
	</fieldset>
</form>
