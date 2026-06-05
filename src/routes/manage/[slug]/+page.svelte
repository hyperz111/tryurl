<script>
	let { data } = $props();
</script>

<h1>Manager</h1>
<p>{data.slug}</p>
<textarea value={data.urls.join("\n")}></textarea>
