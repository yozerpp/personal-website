<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import CarouselComponent from "@/components/ui/carousel/Carousel.svelte";
    import ProjectComponent from "@/components/ui/Project/Project.svelte";

    const projectData = [
        {
            name: "Realtime Collaboration Suite",
            tagline: "Coordinate product teams without context switching.",
            summary:
                "Bring planning, documentation, and retrospectives into one shared canvas that updates in realtime across every device.",
            highlights: [
                "Cross-functional agendas synced with integrations from Figma, Linear, and Jira.",
                "Granular permissions with audit trails for enterprise compliance.",
                "AI summaries for async contributors joining after live workshops.",
            ],
            videoUrl: "https://www.youtube.com/embed/aA5FgDdRwHI?si=vvVBYNwKto8cAVxn&autoplay=1&controls=0&loop=1&disablekb=1&fs=0playsinline=1&mute=1",
            cta: {
                linkLabel: "View collaboration case study",
                linkHref: "https://example.com/collaboration",
            },
        },
        {
            name: "Customer Insights Portal",
            tagline: "Centralise feedback and prioritise the right work.",
            summary:
                "Automatically pull qualitative signals into a single board and connect them to roadmap initiatives with confidence scoring.",
            highlights: [
                "Realtime sentiment analysis across support, sales, and research channels.",
                "Trend detection alerts surfaced directly to product squads.",
                "Deep integrations with analytics tools for closed-loop reporting.",
            ],
            videoUrl: "https://www.youtube.com/embed/F3V7lGx6qLc?autoplay=0&controls=1",
            cta: {
                linkLabel: "Explore insights demo",
                linkHref: "https://example.com/insights",
            },
        },
        {
            name: "Partner Enablement Hub",
            tagline: "Launch, train, and certify channel partners globally.",
            summary:
                "Give partners a personalised onboarding journey with playbooks, live office hours, and certification paths that adapt to their goals.",
            highlights: [
                "Self-serve learning with progress saved per workspace.",
                "Campaign builder for co-marketing launches with analytics dashboards.",
                "Localized content delivery with automatic subtitling for 12 languages.",
            ],
            videoUrl: "https://www.youtube.com/embed/mvRhdB2D6rA?autoplay=0&controls=1",
            cta: {
                linkLabel: "See partner success story",
                linkHref: "https://example.com/enablement",
            },
        },
        {
            name: "Operations Command Center",
            tagline: "Monitor health metrics across distributed teams.",
            summary:
                "A single source of truth for capacity planning, incident response, and team sentiment tailored for operations leaders.",
            highlights: [
                "Incident playbooks with automated stakeholder updates.",
                "Scenario planning with what-if forecasting for staffing decisions.",
                "Custom dashboards with export-ready compliance views.",
            ],
            videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&controls=1",
            cta: {
                linkLabel: "Review operations rollout",
                linkHref: "https://example.com/operations",
            },
        },
    ];

    const projectSlides = projectData.map((project) => ({
        snippet: projectSlide,
        args: { project },
    }));

    const { Story } = defineMeta({
        title: "Components/Project/Slides",
        component: CarouselComponent,
        tags: ["autodocs"],
        parameters: {
            layout: "fullscreen",
        },
        argTypes: {
            animation: {
                control: false,
                description:
                    "Transition preset applied to each slide. Use 'zoom-slide' for a zoom-out/in effect while scrolling.",
            },
            slides: {
                control: false,
                description: "Snippet array rendered inside the Carousel content.",
            },
            controls: {
                control: false,
                description: "Two-way bound Embla API instance exposed by Carousel.Root.",
            },
        },
        args: {
            // class: "w-full max-w-5xl mx-auto",
            slides: projectSlides,
        },
    });
</script>

{#snippet titleSnippet({ name, tagline })}
    <div class="flex flex-col gap-2 text-balance">
        <span class="font-semibold">{name}</span>
        {#if tagline}
            <span class="text-base text-slate-500">{tagline}</span>
        {/if}
    </div>
{/snippet}

{#snippet descriptionSnippet({ summary, highlights = [] })}
    <p class="mb-4 text-lg leading-relaxed text-slate-700">{summary}</p>
    {#if highlights.length}
        <ul class="space-y-2 text-base text-slate-500">
            {#each highlights as highlight}
                <li class="leading-snug">• {highlight}</li>
            {/each}
        </ul>
    {/if}
{/snippet}

{#snippet footerSnippet({ linkLabel, linkHref })}
    <a
        class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 hover:underline"
        href={linkHref}
        target="_blank"
        rel="noreferrer"
    >
        {linkLabel}
    </a>
{/snippet}

{#snippet projectSlide(project)}
    <ProjectComponent
        videoUrl={project.videoUrl}
        class="bg-white/80 rounded-2xl shadow-lg backdrop-blur"
        title={{ snippet: titleSnippet, args: { name: project.name, tagline: project.tagline } }}
        description={{ snippet: descriptionSnippet, args: { summary: project.summary, highlights: project.highlights } }}
        footer={project.cta ? { snippet: footerSnippet, args: project.cta } : undefined}
    />
{/snippet}

<Story name="Defaul" />