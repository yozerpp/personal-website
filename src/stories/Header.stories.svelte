<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import Header from "@/components/ui/Header/Header.svelte";
    const { Story } = defineMeta({
        title: 'Components/Header',
        render: snippet,
        tags: ['autodocs'],
        parameters: {
            svelteOptions: {intro: true}
        },
        argTypes: {
            photoUrl: {control : false,},
            name: {control : false,},
            visible: {control: 'boolean', defaultValue: true},
            class: {control: "text"},
            color: {control: false},
            avatarAnimation: {control: false},
            headerAnimation: {control: false},
            backgroundImage: {control: false}
        },
        args:{
            photoUrl: "/img/favicon.svg",
            name:"Yusuf Özer",
        }
    });
</script>

{#snippet snippet({visible = true, photoUrl, name})}
{#if visible}
<Header {photoUrl} {name}/>
{/if}
{/snippet}
<Story name="Default"/>