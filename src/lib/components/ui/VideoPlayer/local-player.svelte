<script>
    import {cn} from "@/utils.js";

    /**@type import('./types').VideoPlayerProps */
    let {
        videoUrl,
        name,
        class: classNames = null,
    } = $props();
</script>

<video title="{name ?? 'Project'} Live Demo" autoplay loop muted class={"aspect-video h-[30vh] " +  (classNames??"")}>
    <track src={null} kind="captions">
    <source src={videoUrl.toString()} type="video/mp4" />
</video>