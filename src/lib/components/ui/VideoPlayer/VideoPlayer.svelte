<script>
    import YoutubePlayer from './youtube-player.svelte'
    import LocalPlayer from './local-player.svelte'
    import {AspectRatio} from "@/components/ui/aspect-ratio/index.js";

    /** @type VideoPlayerProps */
    let {
        videoUrl,
        classNames = null
    } = $props();
</script>

<AspectRatio ratio={4/3}>
    {#if videoUrl.toString().startsWith('http')}
        <YoutubePlayer {videoUrl} {classNames} />
    {:else}
        <LocalPlayer {videoUrl} {classNames} />
    {/if}
</AspectRatio>