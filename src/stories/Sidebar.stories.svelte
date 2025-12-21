<script module>
    import {defineMeta} from "@storybook/addon-svelte-csf";
    import Sidebar from "@/components/ui/Sidebar/Sidebar.svelte";

    import designIcon from "./assets/styling.png";
    import guideIcon from "./assets/tutorials.svg";
    import docsIcon from "./assets/docs.png";
    import testingIcon from "./assets/testing.png";
    import libraryIcon from "./assets/addon-library.png";

    /**@type import(' */
    const studioLibrary = [
        {
            name: "Design Systems",
            image: designIcon,
            href:"#design-systems"
        },
        {
            name: "Guides",
            image: guideIcon,
            href:"#guides"
        },
        {
            name: "Docs",
            image: docsIcon,
            href: "#docs"
        },
    ];
    /**@type import('*/
    const researchShelf = [
        {
            name: "Testing",
            image: testingIcon,
            href: "#testing"
        },
        {
            name: "Add-ons",
            image: libraryIcon,
            href: "#library"
        },
        {
            name: "Docs",
            image: docsIcon,
            href: "#docs"
        },
    ];

    const {Story} = defineMeta({
        title: "Components/Sidebar/Bookshelf",
        component: Sidebar,
        tags: ["autodocs"],
        argTypes: {
            class: {
                control: {type: "text"},
                description: "Additional classes merged into the bookshelf container.",
            },
            elements: {
                control: {type: "object"},
                description: "Array of SidebarElement objects rendered as books.",
            },
        },
        args: {
            elements: studioLibrary,
        },
    });
</script>

{#snippet displaySnippet({title, summary, stats})}
    <article class="space-y-1 text-slate-100">
        <h3 class="text-lg font-semibold tracking-tight">{title}</h3>
        <p class="text-sm text-slate-200/80">{summary}</p>
        <p class="text-xs uppercase tracking-widest text-emerald-300/90">{stats}</p>
    </article>
{/snippet}

<Story name="StudioLibrary" />
<Story name="ResearchShelf" args={{elements: researchShelf}} />
