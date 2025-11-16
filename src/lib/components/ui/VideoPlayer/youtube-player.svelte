<script>
    import {cn} from "@/utils.js";

    /**@type VideoPlayerProps */
    let {videoUrl, classNames = null} = $props();
</script>

<div class={"aspect-video " + (classNames??"")}>
    <iframe
            class="w-full h-full rounded-lg"
            src={videoUrl.toString()}
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
    ></iframe>
</div>