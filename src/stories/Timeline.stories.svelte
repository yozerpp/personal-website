<script module>
    import Timeline from '@/components/ui/timeline/Timeline.svelte';
    import {defineMeta} from "@storybook/addon-svelte-csf";

    const {Story} = defineMeta({
        component: Timeline,
        tags: ["autodocs"],
        title:"Components/Timeline",
        argTypes: {
            elements: {control: false}
        },
        args:{
            elements: Array(6).fill({content: {snippet: timeLineSnippet, args: {} }, header:{snippet: headerSnippet, args:{}}, separatorLength: 4})
        }
    })
</script>

{#snippet headerSnippet()}
    <h4 class="text-center p-2">Header</h4>
{/snippet}
{#snippet timeLineSnippet({...args})}
    <div class="px-3 py-1 text-shadow-white text-black text-2xl text-shadow-md">Ballsacks</div>
{/snippet}
<Story name="Timeline" />