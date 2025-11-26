<script module>
    import {defineMeta} from "@storybook/addon-svelte-csf";
    import Page from '../routes/+page.svelte';
    import Layout from '../routes/+layout.svelte';
    const {Story} = defineMeta({
        title: 'Page/Test',
        render: page,
        tags: ['autodocs'],
    });
</script>
{#snippet page()}
    <Layout>
        <Page/>
    </Layout>
{/snippet}
<Story name="Page" />