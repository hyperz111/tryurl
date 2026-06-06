<script>
	let {
		isCreate,
		slug = "",
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

<form method="POST" class="">
	<fieldset class="">
		<div class="">
			<label for="slug">Slug Name</label>
			<input type="text" name="slug" value={slug} class="" {...{ [isCreate ? "required" : "readonly"]: true }} />
		</div>

		<div>
			<label>URLs</label>

			<ul>
				{#each urls as _, index}
					<li class="">
						<input type="url" class="" bind:value={urls[index]} required />
						<button type="button" class="" onclick={() => remove(index)}>×</button>
					</li>
				{/each}
			</ul>

			<button type="button" onclick={add}>Add</button>
			<input type="hidden" name="urls" {value} />
		</div>

		<div>
			<button type="submit">{isCreate ? "Create" : "Save"}</button>
		</div>
	</fieldset>
</form>
