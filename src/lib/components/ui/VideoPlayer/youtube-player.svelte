<script>
    import {cn} from "@/utils.js";
    /**@type import('./types').VideoPlayerProps */
    let {videoUrl, name, class: classNames = null} = $props();
</script>

<div class={"aspect-video " + (classNames??"")}>
    <iframe
            class="w-full h-full rounded-lg"
            src={videoUrl.toString()}
            title="{name ?? 'Project'} Live Demo"
            allow="autoplay; encrypted-media"
            allowfullscreen
    ></iframe>
</div>