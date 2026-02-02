<script>
	import '../app.css';
    import Header from "@/components/ui/Header/Header.svelte";
    import Sidebar from "@/components/ui/Sidebar/Sidebar.svelte";
    import {SidebarSelectionEventName} from "@/constants.js";
    import {m} from '../paraglide/messages.js';
    import {onMount} from "svelte";
    import {languages, sidebarElements} from "../data.js";
    import {switchLanguage} from "@/utils.js";
    import * as Avatar from "@/components/ui/avatar/index.js";
    import Footer from "@/components/ui/Footer/Footer.svelte";
	let { children } = $props();
    /**@type {Sidebar}*/
    let sidebar;
    /**@type {import('@/components/ui/Sidebar/types').SidebarElement[]}*/

    onMount(()=>{
        document.addEventListener(SidebarSelectionEventName, (/**@type import('*/ ev)=>{
            selectedSidebarItem = ev.detail.href;
        });
    })
    let sidebarClicked = false;
    /**@type number*/
    let headerOffsetHeight = $state();
    /**@type {string | null} */
    let selectedSidebarItem = $state(null);
    function sectionIntersect(ev){
        if(sidebarClicked) return;
        selectedSidebarItem = '#'+ev.detail.id;
    }
    function onSidebarClick(ev){
        sidebarClicked = true
        setTimeout(()=>sidebarClicked = false, 500);
    }
</script>
<svelte:document onsectionintersected={sectionIntersect}/>
<div class="bg-linear-to-b p-0 m-0 w-screen min-h-screen from-20% from-slate-900 to-slate-800 pb-[10dvh]">
    <Header bind:offsetHeight={headerOffsetHeight} photoUrl="/img/pp.jpg" class="z-20 sticky top-0" name="Yusuf Özer"/>
    <div class="p-0 m-0">
        <aside style="--header-offsetHeight: {headerOffsetHeight + 5}px"
                class="z-15 fixed top-[var(--header-offsetHeight)] grid place-items-center mt-3 h-auto w-full lg:top-0 lg:h-screen lg:right-[calc(5*var(--spacing))] lg:w-auto lg:mt-0" >
            <Sidebar onclick={onSidebarClick} bind:selected={selectedSidebarItem} bind:this={sidebar}
                     class="block w-[60%] lg:top-[65%] xl:top-[60%] lg:w-auto" elements={sidebarElements}/>
        </aside>
        {@render children?.()}
    </div>
    <div class="my-5 md:my-10 w-full py-0.5 border-b-2 border-accent content-none"></div>
    <Footer/>
</div>