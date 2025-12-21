<script>
    import YoutubePlayer from './youtube-player.svelte'
    import LocalPlayer from './local-player.svelte'
    import {AspectRatio} from "@/components/ui/aspect-ratio/index.js";
    import {cn} from "@/utils.js";

    /** @type import('./types').VideoPlayerProps */
    let {
        videoUrl,
        class: classNames,
        name,
        aspectRatio,
    } = $props();
</script>
{#snippet players(videoUrl, name, classNames)}
    {#if videoUrl.toString().startsWith('http')}
        <YoutubePlayer {name} class={classNames} {videoUrl}/>
    {:else}
        <LocalPlayer {name} class={classNames} {videoUrl} />
    {/if}
{/snippet}

{#if aspectRatio}
<AspectRatio class="size-full" ratio={aspectRatio}>
    {@render players(videoUrl, name, classNames)}
</AspectRatio>
{:else}
    <div class={cn("size-full")}>
        {@render players(videoUrl, name, classNames)}
    </div>
{/if}