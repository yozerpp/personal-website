<script>
    import HeaderContent from './header-content.svelte'
    import {cn, getColorString} from "@/utils.js";
    /** @type import('./types').HeaderProps */
    let {
        color = {direction: 'b',from: {color:'gray-900', opacity: 90}, via: {color:'black',opacity: 90 }, to: {color: 'gray-900', opacity: 70}},
        class: classNames,
        backgroundImage,
        offsetHeight = $bindable(),
        ...properties
    } = $props()
    const colorClass = 'from' in color
        ? ['bg-gradient-to-' + color.direction,`from-${getColorString(color.from)}`, `via-${getColorString(color.via)}`, `to-${getColorString(color.to)}`]
        : [`bg-${getColorString(color)}`];

</script>

<header bind:offsetHeight style:background-image={backgroundImage} class={cn("w-full h-[15dvh] md:h-[20dvh] text-white font-[lato-heavy] rounded-b-[36px] md:rounded-b-[48px] border-2 border-accent/30 drop-shadow-lg drop-shadow-black/80", ...(Array.isArray(classNames) ? classNames : [classNames]), ...colorClass)}>
    <HeaderContent {...properties}/>
</header>

