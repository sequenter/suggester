<script lang="ts">
	import Sidebar from '$lib/components/ui/Sidebar.svelte';
	import '../app.css';
</script>

<div class="flex">
	<Sidebar />
	<main class="flex flex-col container mx-auto h-screen">
		<slot />
	</main>
</div>
