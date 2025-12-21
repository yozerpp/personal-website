<script module>
    import {defineMeta} from "@storybook/addon-svelte-csf";
    import Experience from "@/components/ui/Experience/Experience.svelte";

    let {Story} = defineMeta({
        title: "Components/Experience",
        tags: ["autodocs"],
        component: Experience,
        argTypes: {
            timeline: {control: false},
            experienceType: {control: 'text'},
        },
        args:{
            timeline: {start: new Date(Date.now()), end: new Date(Date.now())},
            experienceType: 'internship',
            title: {snippet: title},
            description: {snippet: description},
        }
    });
</script>
{#snippet title()}
    <h3>ballsacks</h3>
{/snippet}
{#snippet description(text)}
    <p>destruction</p>
{/snippet}
{#snippet footer(text)}
    <p>hell</p>
{/snippet}

<Story name="withoutFooter"/>