<script>
    import {cn} from "@/utils.js";
    /**@type import('./types').VideoPlayerProps */
    let {videoUrl, name, class: classNames = null} = $props();
</script>

<iframe
        class={cn("aspect-video size-full rounded-lg", classNames)}
        src={videoUrl.toString()}
        title="{name ?? 'Project'} Live Demo"
        allow="autoplay; encrypted-media"
        allowfullscreen
></iframe>
