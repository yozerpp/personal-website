<script>
	import '../app.css';
    import Header from "@/components/ui/Header/Header.svelte";
    import Sidebar from "@/components/ui/sidebar/Sidebar.svelte";
	
	let { children } = $props();
</script>
<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>
<div class="bg-linear-to-b p-0 m-0 min-w-screen from-20% from-gray-950 via-slate-900 to-slate-800 backdrop-blur-lg">

    <Header photoUrl="/img/favicon.svg" class="z-20" name="Yusuf Özer"/>
    <main>
        {@render children?.()}
    </main>
</div>
