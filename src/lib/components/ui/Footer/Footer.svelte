<script>
    import {projects, socialLinks} from "../../../../data.js";
    import {m} from "$paraglide/messages.js"
    import FooterList from "./footer-list.svelte";
    import FooterLanguage from './footer-language.svelte';
    import {cn} from "@/utils.js";
    let {
        class:className,
        ...rest
    } = $props();
    const projectLinks = projects.flatMap(p=>{
        if(!Array.isArray(p.footer)) return [];
        return p.footer.map(i=>({snippet: socialItem, args: {...i, text: p.title + ' ' + i.text}}))
    })
</script>
{#snippet socialItem(/**@type import('$lib/components/ui/types').AnchorProp*/p)}
    <a href={p.href} target="_blank" class={cn("no-underline transition-all group-focus:text-muted group-hover:text-muted", p.class)} onclick={p.onclick} download={p.download}>{@html p.text}</a>
{/snippet}
<footer {...rest} class={cn("py-10 px-[5dvw] md:px-[10dvw] lg:px-[15dvw] flex flex-row  justify-between gap-7 content-start items-start",className)}>
    <div class="grid grid-cols-2">
        <FooterList class="w-full" title={m.profil_links()} items={socialLinks.map(i=>({snippet: socialItem, args: {...i, text:i.title}}))}/>
        <FooterList class="w-full" title={m.project_links()} items={projectLinks}/>
    </div>
    <FooterLanguage class="my-5"/>
</footer>