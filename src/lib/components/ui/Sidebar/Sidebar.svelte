<script>
    import {cn} from "@/utils.js";
    import SidebarElement from "./sidebar-element.svelte";
    import {onMount} from "svelte";
    /** @type import('./types').SidebarProps */
    let {
        ref = $bindable(),
        elements,
        selected = $bindable(),
        class: className,
        ...restProps
    } = $props();
    /** @type HTMLElement */
    let ls;
    onMount(()=>{
        ls.style.height = ls.clientHeight + 'px';
        ls.style.width = ls.clientWidth + 'px';
    })

</script>

<div {...restProps} role="menubar" bind:this={ref} class={cn("h-[1dvh] w-auto md:h-auto lg:max-w-[12dvw] container", className)}>
    <div role="menu" bind:this={ls} class="py-2 items-center px-2 lg:py-2 lg:px-5 m-0 grid relative  place-items-stretch rounded-4xl gap-5 bg-slate-950/75 text-black border-accent/20 border-1 grid-cols-{elements.length} lg:grid-cols-none lg:grid-rows-{elements.length}">
        {#each elements as element (element)}
            <button role="menuitem" class="grid place-items-center m-0 p-0" data-name={element.name}
                    onclick={()=>{selected = element.href;document.querySelector(element.href).scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start'})}} >
                <SidebarElement {...element} reveal={!!selected && selected === element.href}/>
            </button>
        {/each}
    </div>
</div>