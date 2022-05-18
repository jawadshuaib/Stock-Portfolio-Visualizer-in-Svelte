<script>
	import Nav from '../components/Nav.svelte';
</script>

<svelte:head><title>Visualize Your Portfolio On a Grid</title></svelte:head>
<div class="p-8 max-w-6xl mx-auto">
	<Nav />
	<slot />
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
