<script>
    import {cn} from "@/utils.js";
    import {m} from '$paraglide/messages.js';
    import * as Card from '@/components/ui/card/index.js';
    import ExpertiseBar from "@/components/ui/Skill/ExpertiseBar.svelte";
    import {SquareArrowOutUpRight  } from '@lucide/svelte';
    /**@type import('./types').SkillProps*/
    let {
        ref = $bindable(),
        name,
        expertise,
        references,
        class:className,
    } = $props();


</script>

<Card.Root bind:ref class={cn("bg-gradient-to-br shadow-accent-foreground shadow-md border-none from-zinc-600/100 from-0% via-zinc-700/100 via-10% to-zinc-900/100 to-90% grid grid-rows-subgrid row-span-full w-[15rem] py-1 md:py-3 md:w-[17.5rem] lg:w-[20rem] rounded-4xl",className)}>
    <Card.Header class="place-content-center text-center">
        <Card.Title class="text-xl md:text-2xl lg:text-3xl font-['Geist'] font-medium text-orange-100/80 text-center">{name}</Card.Title>
    </Card.Header>
    <Card.Content class="grid grid-cols-[auto_auto]">
        <p class="p-0 m-0 mb-1 text-gray-300/100 font-semibold text-start text-sm md:text-md">{m.expertise()}:</p>
        <ExpertiseBar {expertise}/>
    </Card.Content>
    {#if references && references?.length > 0}
        <div>
            <div class="left-0 border-t-1 border-t-orange-200/60 mx-2 mb-3 md:mx-4"></div>
            <Card.Footer class="relative grid grid-cols-1 place-items-start">
                <ul class="grid grid-cols-{references.length} gap-3 text-xs md:text-sm lg:text-md">
                    {#each references as reference,i(reference)}
                        <li class="p-0">
                            <a class="text-muted hover:underline flex flex-row justify-items-start gap-0 p-0" onclick={reference.onclick} href={reference.href}><p>{reference.text}</p><SquareArrowOutUpRight class="p-0 m-0 pb-0.5 self-center text-center min-w-4 aspect-square" size={12}/></a>
                        </li>
                    {/each}
                </ul>
            </Card.Footer></div>

    {/if}
</Card.Root>
