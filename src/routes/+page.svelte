<script>
    import Project from "@/components/ui/Project/Project.svelte";
    import Carousel from "@/components/ui/carousel/Carousel.svelte";
    import {thisWebsiteProject} from "@/data.js";
    import Sidebar from "@/components/ui/sidebar/Sidebar.svelte";
    import { m } from "../paraglide/messages";
    /**@type {import('$lib/components/ui/types').SnippetHolder[]}*/
    let projects = [
        {
            snippet: projectSnippet,
            args: thisWebsiteProject
        },
        {
            snippet: projectSnippet,
        args: thisWebsiteProject
        }
    ];
    const projectsId = 'projects';
    const skillsId = 'skills';
    const experienceId = 'experience';
    /**@type {import('@/components/ui/sidebar/types').SidebarElement[]}*/
    let sideBarElements = [
        {name: m.sidebar_projects_name(), href: `#${projectsId}`, image: '/static/img/favicon.png'},
        {name: m.sidebar_skills_name(), href: `#${skillsId}`, image: '/static/img/favicon.png'},
        {name: m.sidebar_experience_name(), href: `${experienceId}`, image: '/static/img/favicon.png'},
    ]
</script>
{#snippet projectSnippet(/**@type import('$lib/components/ui/Project/types').ProjectProps*/props)}
    <Project {...props}/>
{/snippet}
    <aside class="absolute h-full w-fit top-[0%] md:right-[2%] lg:right-[1%]">
        <Sidebar class="sticky z-15 md:top-[50%] md:transform-[translate(-50%)]" elements={sideBarElements}/>
    </aside>
    <div class="relative min-h-full min-w-full place-items-center">
    <!--    <aside class="absolute pointer-events-none h-full w-auto ">-->
    <!--    </aside>-->
        <div class="z-10" id={projectsId}>
            <Carousel slides={projects}/>
        </div>
    </div>