<script>
    import {cn} from "@/utils.js";
    import VideoPlayer from "@/components/ui/VideoPlayer/VideoPlayer.svelte";
    import {typewriter} from "@/components/ui/transitions.js";
    import {Separator} from "@/components/ui/separator/index.js";

    /** @type import('./types').ProjectProps */
    let {
        ref = $bindable(),
        title,
        description,
        footer,
        videoUrl,
        class:classNames,
        animation = typewriter,
        ...restProps
    } = $props()
    let mediaWidth = $state(0);
    const isBig = $derived(mediaWidth > 768);
</script>
<svelte:window bind:innerWidth={mediaWidth}/>
<div class={cn("container grid gap-2 p-6 sm:grid-cols-1 border-double border-blue-800/80 border-10 md:grid-rows-[2fr_3fr_1fr]", classNames)} {...restProps}>
    <div class="grid w-full py-0 px-3 my-0 place-items-end justify-items-center border-b-2 grid-cols-1 border-b-gray-400 {videoUrl ? 'md:grid-cols-[2fr_3fr]' : ''}">
        {#if videoUrl}
            <VideoPlayer class="pb-2" {videoUrl}/>
        {/if}
        <div in:animation={{speed: .75, delay: 200}} class="pb-5 text-center sm:text-2xl md:text-3xl lg:text-5xl ">
            {@render title.snippet(title.args)}
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
        <div class="hidden md:block p-0 m-0"></div>
        <div in:animation={{speed: 1, delay: 200}} class="md:text-xl text-center lg:text-2xl">
            {@render description.snippet(description.args)}
        </div>
    </div>
    {#if footer}
        <div in:animation={{speed: 1, delay: 200}} class="sm:text-sm w-full pe-6 text-center place-items-center justify-end">
            {@render footer.snippet(footer.args)}
        </div>
    {:else}
        <div class="p-0 m-0"></div>
    {/if}
</div>