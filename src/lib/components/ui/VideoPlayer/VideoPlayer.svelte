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
{#snippet players(videoUrl, name)}
    {#if videoUrl.toString().startsWith('http')}
        <YoutubePlayer {name} {videoUrl}/>
    {:else}
        <LocalPlayer {name} {videoUrl} />
    {/if}
{/snippet}

{#if aspectRatio}
<AspectRatio class={classNames} ratio={aspectRatio}>
    {@render players(videoUrl, name)}
</AspectRatio>
{:else}
    <div class={cn("w-full h-full", classNames)}>
        {@render players(videoUrl, name)}
    </div>
{/if}