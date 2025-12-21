<script module>
    import {defineMeta} from "@storybook/addon-svelte-csf";
    import Skill from "@/components/ui/Skill/Skill.svelte";
    const {Story} = defineMeta({
        title: "Components/Skill",
        tags: ['autodocs'],
        component: Skill,
        argTypes:{
            name: {control: "text"},
            expertise: {control: 'number', options: [1,2,3,4,5]},
            references: {control: 'object'},
            class: {control: 'text'},
        },
        args: {
            references: [{text: 'someref', href: '#'}, {text:'otherref', href: '#'}],
            name: 'skill',
            expertise: 3,
        }
    })
</script>
<Story name="Default"/>