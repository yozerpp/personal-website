<script>
    import {cn} from "@/utils.js";

    /** @type VideoPlayerProps */
    let {
        videoUrl,
        classNames = null,
    } = $props();
</script>

<video muted class={"aspect-video h-[30vh] " +  (classNames??"")} autoplay={true} loop={true}>
    <track src={null} kind="captions">
    <source src={videoUrl.toString()} type="video/mp4" />
</video>