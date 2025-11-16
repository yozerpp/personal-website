<script module>
    import {defineMeta} from "@storybook/addon-svelte-csf";
    import ProjectComponent from "@/components/ui/Project/Project.svelte";
    import {resolve} from "$app/paths";

    const {Story} = defineMeta({
        title: "Components/Project/Single",
        component: ProjectComponent,
        tags: ["autodocs"],
        argTypes: {
            videoUrl: {
                control: {type: "text"},
                description: "YouTube embed URL rendered in the project preview player.",
            },
            classNames: {
                control: {type: "text"},
                description: "Additional classes merged onto the Project root container.",
            },
            title: {
                control: false,
                description: "Snippet rendered as the project headline.",
            },
            description: {
                control: false,
                description: "Snippet rendered beneath the headline to describe the project.",
            },
            footer: {
                control: false,
                description: "Optional snippet rendered beneath the description (e.g. call-to-action).",
            },
        },
        args: {
            videoUrl: "/vid.mp4",
            classNames: "bg-white/80 rounded-xl shadow-lg",
            title: {snippet: titleSnippet, args: {text: "Storybook Project Showcase"}},
            description: {
                snippet: descriptionSnippet,
                args: {
                    summary: "Demonstrates how project highlights look inside the UI kit.",
                    details: "Combine video walkthroughs with rich copy to help visitors understand what makes the project special.",
                },
            },
            footer: {
                snippet: footerSnippet,
                args: {
                    linkLabel: "View repository",
                    linkHref: "https://github.com/example/project",
                },
            },
        },
    });
</script>

{#snippet titleSnippet({text})}
    <span class="tracking-tight">{text}</span>
{/snippet}

{#snippet descriptionSnippet({summary, details})}
    <p class="mb-4 text-lg text-slate-700">{summary}</p>
    <p class="text-base text-slate-500">{details}</p>
{/snippet}

{#snippet footerSnippet({linkLabel, linkHref})}
    <a
        class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 hover:underline"
        href={resolve(linkHref)}
        target="_blank"
        rel="noreferrer"
    >
        {linkLabel}
    </a>
{/snippet}

<Story name="Single" />
