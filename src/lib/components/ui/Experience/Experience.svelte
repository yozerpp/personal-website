<script>
    import {cn, makeId} from "@/utils.js";
    import {m} from '$paraglide/messages.js';
    import {Separator} from "@/components/ui/separator/index.js";
    import * as Card from "@/components/ui/card/index.js";
    import {SquareArrowOutUpRight} from "@lucide/svelte";
    /**@type {import('./types').ExperienceProps}*/
    let {
        ref = $bindable(),
        timeline,
        experienceType,
        title,
        description,
        footer,
        class: className,
    } = $props();
    const experienceLocalized = $derived(m['experience_' + experienceType]());
</script>

<Card.Root id={makeId(title)} bind:ref class={cn("bg-gradient-to-br from-slate-300 via-slate-300 to-slate-400 to-90% w-[80dvw] justify-between rounded-4xl md:w-[50dvw] lg:w-[35dvw] ",className)}>
    <div>
        <Card.Header data-timeline-slot="header" class="gap-2">
            <Card.Title class="text-center text-xl md:text-2xl lg:text-3xl text-shadow-2xs text-shadow-muted-foreground font-medium font-['Inter']">
                {#if typeof title === 'string'}
                    {@html title}
                {:else}
                    {@render title.snippet(title.args)}
                {/if}
            </Card.Title>
            <Card.Description class="w-full text-slate-800/80 border-b-1 border-b-gray-400/50 flex flex-row justify-between">
                <div class="content-center text-md xl:text-lg">{@html experienceLocalized}</div>
                <div class="w-full text-end">
                    <p class="text-sm md:text-lg xl:text-xl text-nowrap text-shadow-zinc-900">
                        {@html (timeline.start.toLocaleDateString ? timeline.start.toLocaleDateString() : timeline.start)}
                        {#if timeline.end}
                            - {@html (timeline.end.toLocaleDateString ? timeline.end.toLocaleDateString() : timeline.end)}
                        {/if}
                    </p>
                </div>
            </Card.Description>
        </Card.Header>
        <Card.Content data-timeline-slot="content" class="w-fit text-slate-900 font-normal mt-3 px-10 md:px-7 lg:px-10 text-sm md:text-md lg:text-lg">
            {#if typeof description === 'string'}
                {@html description}
            {:else if typeof description === 'function'}
                {@render description()}
            {:else}
                {@render description.snippet(description.args)}
            {/if}
        </Card.Content>
    </div>
    {#if footer && footer.length > 0}
        <Card.Footer class="text-sm md:text-md lg:text-lg text-zinc-700/75 pt-2 border-t-2 border-solid border-t-neutral-400/60 flex flex-row gap-5 justify-start content-center">
            <span class="p-0 font-semibold">{m.links()}:</span>
            <ul class="flex flex-row gap-3">
                {#each footer as footerElem,i(footerElem)}
                    <li class="p-0">
                        {#if footerElem.href || footerElem.onclick}
                            <a target={!footerElem.download && footerElem.href?.startsWith("http") ? "_blank":"_self"} class="hover:underline cursor-pointer w-fit flex flex-row text-start" href={footerElem.href} onclick={footerElem.onclick} download={footerElem.download ? footerElem.href : undefined}><p >{footerElem.text}</p><SquareArrowOutUpRight class="p-0 m-0 pb-0.5 self-center text-center" size={12}/></a>
                        {:else}
                            <p class="p-0 m-0">{footerElem.text}</p>
                        {/if}
                    </li>
                {/each}
            </ul>
        </Card.Footer>
    {/if}
</Card.Root>