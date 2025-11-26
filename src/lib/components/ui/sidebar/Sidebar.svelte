<script>
    import {cn} from "@/utils.js";
    import SidebarElement from "./sidebar-element.svelte";
    import {onMount} from "svelte";
    /** @type import('./types').SidebarProps */
    let {
        ref = $bindable(null),
        elements,
        selected = $bindable(),
        class: className,
    } = $props();
    /** @type HTMLElement */
    let ls;
    onMount(()=>{
        ls.style.height = ls.clientHeight + 'px';
        ls.style.width = ls.clientWidth + 'px';
    })
</script>

<div bind:this={ref} class={cn("h-[1dvh] w-auto md:h-auto md:w-[10dvw] md:top-auto container", className)}>
    <ul bind:this={ls} class="py-5 px-0 m-0 grid relative shadow-black shadow-2xl place-items-stretch rounded-4xl gap-0 bg-slate-950/70 text-black border-accent/40 border-1 grid-cols-{elements.length} md:grid-cols-none md:grid-rows-{elements.length}">
        {#each elements as element (element)}
            <li class="grid place-items-center max-h-[100%] md:max-h-none md:max-w-[100%]" onfocusin={()=>selected = element.href} data-name={element.name}>
                <SidebarElement {...element} reveal={!!selected && selected === element.href}/>
            </li>
        {/each}
    </ul>
</div>