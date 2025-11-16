<script>
	import '../app.css';
    import Header from "@/components/ui/Header/Header.svelte";
	
	let { children } = $props();
</script>

<main>
    <Header photoUrl="/img/favicon.svg" name="Yusuf Özer"/>
    {@render children?.()}
</main>
