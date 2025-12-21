<script module>
    import {defineMeta} from "@storybook/addon-svelte-csf";
    import Dropdown from "@/components/ui/dropdown-menu/DropdownMenu.svelte";

    let {Story} = defineMeta({
        title: "Components/Dropdown",
        tags: ["autodocs"],
        component: Dropdown,
        argTypes:{
            selected:{control:'number'},
            items: {control:false},
            class:{control: 'text'},
        },
        args:{
            items: Array.from({length: 4}).map((_,i)=>({snippet: dropdownElement, args:i})),
            class: "w-30"
        }
    })
</script>
{#snippet dropdownElement(i)}
    <span class="rounded-full aspect-square p-7 bg-red-400">{i}</span>
{/snippet}
<Story name="Default"/>