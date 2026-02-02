<script>
    import Project from "@/components/ui/Project/Project.svelte";
    import Carousel from "@/components/ui/project-carousel/Carousel.svelte";
    import {projects, skills, languages, experiences} from "../data.js";
    import { m } from "$paraglide/messages";
    import About from "@/components/ui/About/About.svelte";
    import Experience from "@/components/ui/Experience/Experience.svelte";
    import Timeline from "@/components/ui/timeline/Timeline.svelte";
    import CarouselStream from "@/components/ui/carousel-stream/CarouselStream.svelte";
    import Skill from "@/components/ui/Skill/Skill.svelte";
    import Tooltip from "@/components/ui/tooltip/Tooltip.svelte";
    import {CircleQuestionMark} from '@lucide/svelte';
    import {cn, SectionIntersectedEvent} from "@/utils.js";
    import {onMount} from "svelte";
    const projectsRendered = projects.map((p)=>({title: p.title, content:{snippet: projectSnippet, args: p}}));
    const experiencesRendered = experiences.map((e)=>({content: {snippet: experienceSnippet, args: e}}));
    const skillsRendered = skills.map(s=>({title: s.name, content: {snippet: skillSnippet, args: s}}))
    /**@type number*/
    let innerWidth = $state();
    const isMd= $derived(innerWidth >=768);
    const isLg = $derived(innerWidth >= 1024);
    const threshold=$derived(isMd ? .6 : 0.8);
    /**@type HTMLElement*/
    let main;
    onMount(()=>{
        const obs = new IntersectionObserver((entries)=>{
            const entry = entries.toSorted((e1,e2)=>e2.intersectionRatio - e1.intersectionRatio)[0];
            if(entry.target.id!=='skills') skillsControls.stopScroll();
            else skillsControls.startScroll();
            document.dispatchEvent(new SectionIntersectedEvent(entry.target.id))
        }, {threshold})
        for (const section of main.children) {
            if(section.id)
                obs.observe(section);
        }
        return obs.disconnect;
    })
    /**@type import('$lib/components/ui/carousel-stream/types').CarouselControls*/
    let skillsControls;
</script>
<svelte:window bind:innerWidth/>
{#snippet projectSnippet(/**@type import('$lib/components/ui/Project/types').ProjectProps*/props)}
    <Project {...props}/>
{/snippet}
{#snippet experienceSnippet(/**@type import('$lib/components/ui/Experience/types').ExperienceProps*/props)}
    <Experience class="h-full" {...props}/>
{/snippet}
{#snippet skillSnippet(/**@type import('$lib/components/ui/Skill/types').SkillProps*/props)}
    <Skill {...props}/>
{/snippet}
{#snippet titleSnippet(text, tooltip, cls)}
    <div class={cn("flex flex-row justify-center content-center items-center gap-3",cls)}>
        <h1 class="text-4xl md:text-5xl lg:text-7xl  font-['Inter'] text-accent text-shadow-md text-shadow-accent-foreground">{@html text}</h1>
        {#if tooltip}
            <Tooltip content={tooltip}><CircleQuestionMark class="text-gray-400 self-center"/></Tooltip>
        {/if}
    </div>
{/snippet}
{#snippet divider()}
    <div class="w-full ">
        <div class="mx-0 py-0.5 border-t-2 border-t-accent border-solid"></div>
    </div>
{/snippet}

<main bind:this={main} id="main" class="min-h-full w-screen flex m-0 flex-col items-center pt-20 lg:pt-30 gap-[10dvh] md:gap-[15dvh]">
    <div id="about">
        <About show={true} title={m.about_title()} text={m.about_text()}/>
    </div>
    {@render divider()}
    <div id="experiences" class="w-full">
        <div class="w-full text-center mb-5">{@render titleSnippet(m.experience_title(), m.experience_tooltip())}</div>
        <Timeline elements={experiencesRendered}/>
    </div>
    {@render divider()}
    <div id="projects" class="w-screen grid place-items-center">
        <div class="self-center grid lg:w-[70%] place-items-center">
            <Carousel title={m.projects_title()} slides={projectsRendered}/>
        </div>
    </div>
    {@render divider()}
    <div class="w-auto h-[70dvh] lg:w-screen lg:h-auto my-15" id="skills">
        <div class="w-full lg:text-start mb-3 px-[5%]">
                {@render titleSnippet(m.skills_title(),isLg ? m.skills_tooltip_lg():m.skills_tooltip_sm(), 'justify-center lg:justify-start')}
        </div>
        <CarouselStream bind:controls={skillsControls} slides={skillsRendered}/>
    </div>
</main>
<style>
    main > div[id]{
        scroll-margin-top: var(--header-offsetHeight);
    }
</style>