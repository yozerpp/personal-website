<script>
    import {cn} from "@/utils.js";
    import VideoPlayer from "@/components/ui/VideoPlayer/VideoPlayer.svelte";
    import {typewriter} from "@/components/ui/transitions.js";

    /** @type ProjectProps */
    let {
        ref = $bindable(),
        title,
        description,
        footer,
        videoUrl,
        classNames,
        animation = typewriter,
        ...restProps
    } = $props()
</script>

<div class={cn("container grid gap-9 p-6 sm:grid-cols-1 md:grid-cols-[1fr_3fr]", classNames)} {...restProps}>
    <div class="flex items-start justify-center">
        <VideoPlayer {videoUrl}/>
    </div>
    <div class="flex flex-col justify-between gap-6">
        <div class="flex flex-col gap-4">
            <div in:animation={{speed: .75, delay: 200}} class="pb-5 text-center sm:text-2xl md:text-3xl lg:text-5xl border-b-2 border-b-gray-400">
                {@render title.snippet(title.args)}
            </div>
            <div in:animation={{speed: 1, delay: 200}} class="md:text-xl lg:text-2xl">
                {@render description.snippet(description.args)}
            </div>
        </div>
        {#if footer}
            <div in:animation={{speed: 1, delay: 200}} class="sm:text-sm w-full pe-6 flex items-center justify-end">
                {@render footer.snippet(footer.args)}
            </div>
        {/if}
    </div>
</div>
