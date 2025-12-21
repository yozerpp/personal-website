<script>
    import {defineMeta} from "@storybook/addon-svelte-csf";
    import YoutubePlayer from "@/components/ui/video-player/youtube-player.svelte";

    const {Story} = defineMeta({
        title: "Components/YoutubePlayer",
        component: YoutubePlayer,
        tags:["component", "video", "iframe"],
        argTypes:{
            videoUrl: {control: {type: "text"}},
        },
        args:{
            videoUrl:  "/vid.mp4",
        }
    });
</script>


<!--<Story name="VideoPlayer" />-->