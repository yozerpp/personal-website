<script module>
    import {defineMeta} from "@storybook/addon-svelte-csf";
    import Footer from "@/components/ui/Footer/Footer.svelte";

    const {Story} = defineMeta({
        title: "Components/Footer",
        tags: ["autodocs"],
        component: Footer,
    });
</script>
<Story name="Default"/>