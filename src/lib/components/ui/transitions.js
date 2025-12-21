import {linear} from "svelte/easing";


/**@param {string} fontSizeHint
 * @param {string} maxHeightHint
 * @return HTMLElement*/
function createCaret(fontSizeHint = '', maxHeightHint = ''){
    const caretTemplate = document.createElement("span");
    caretTemplate.innerHTML = '_';
    caretTemplate.className = 'caret';
    caretTemplate.style.display = 'inline-flex'
    /**@type HTMLElement*/
    const ret = caretTemplate.cloneNode(true)
    const m = fontSizeHint.match(/^(\d+)(px|em|rem)$/);
    ret.style.setProperty("font-size", m ? parseFloat(m[1]) + m[2] : fontSizeHint, "important");
    ret.style.setProperty("max-height", maxHeightHint, "important");
    return ret;
}
/**
 *
 * @param {Element} node
 * @param {{delay: number, speed: number, duration: number | undefined, deleteAfter?: boolean, easing: function(number):number}} params
 * @param {{direction:'in' | 'out' |'both'}} options
 * @return import("svelte/transition").TransitionConfig
 */
/**@typedef {{node: Node, content: string, ratio: number, oldStyle: {height: string, width: string}}} nodeWithPropsType */
export function typewriter(node, {delay = 0, speed = 1, duration = undefined, deleteAfter = false, easing = linear}, options){
    const isIn = !options?.direction || options.direction !== 'out';
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null)
    /**@type {nodeWithPropsType[]}*/
    const textNodes = [];
    /**@type Node*/
    let node1;
    const re = new RegExp("^[\\n\\s\\t]+$")
    while ((node1 = walker.nextNode())) {
        if (node1.textContent.length === 0 || re.test(node1.textContent)) continue;
        textNodes.push({
            node: node1,
            content: node1.textContent,
            ratio: 0,
            oldStyle: {height: node1.parentElement.style.minHeight, width: node1.parentElement.style.minWidth}
        });
        // const d= node1.parentElement.style.display;
        // if(d === 'flex' || d ==='block') node1.parentElement.style.display = 'inline-' + d;
        // else node1.parentElement.style.display = 'inline-block';
        node1.parentElement.style.minWidth = node1.parentElement.clientWidth + 'px';
        node1.parentElement.style.minHeight = node1.parentElement.clientHeight + 'px';
        if(isIn)
        node1.textContent = null;
    }
    const totalLength = textNodes.map(n=>n.content.length).reduce((previousValue, currentValue)=>previousValue + currentValue,0);
    textNodes.forEach(t=>t.ratio = t.content.length / totalLength);
    /**@type {function(): nodeWithPropsType | undefined} */
    const iteratorMethod = isIn ? Array.prototype.shift : Array.prototype.pop;
    const sign = isIn ? 1 : -1;
    const begin = isIn ? 0 : 1;
    /**@type {function(number,number):boolean}*/
    const comp = isIn ? ((a, b)=>a>=b) : ((a,b)=>a<=b);
    /**@type {function(number,number):boolean}*/
    const comp2 = isIn ? ((a, b)=>a>b) : ((a,b)=>a<b)
    let visibleRatios = isIn ? 0 : 1;
    let nodeWithProps = iteratorMethod.call(textNodes);
    let cursorInited = false;
    return{
            delay,
            duration: duration ?? (totalLength * 10 / (speed!==0?speed:1)),
            easing,
            tick: (t, u) => {
                if(!nodeWithProps) return;
                if(!cursorInited && comp2(t, begin)){
                    nodeWithProps.node.after(createCaret(getComputedStyle(nodeWithProps.node.parentElement).fontSize, nodeWithProps.node.parentElement.style.minHeight))
                    cursorInited = true;
                }
                nodeWithProps.node.textContent = nodeWithProps.content.slice(0, Math.min(nodeWithProps.content.length, Math.round(nodeWithProps.content.length * (t-visibleRatios) / nodeWithProps.ratio )))
                if(comp(t,(sign * nodeWithProps.ratio) + visibleRatios)) {
                    if(textNodes.length > 0 || deleteAfter) nodeWithProps.node.nextSibling.remove();
                    nodeWithProps.node.parentElement.style.minHeight = nodeWithProps.oldStyle.height.length === 0 ? nodeWithProps.oldStyle.height + 'px' : '';
                    nodeWithProps.node.parentElement.style.minWidth = nodeWithProps.oldStyle.width.length === 0 ? nodeWithProps.oldStyle.width + 'px' : '';
                    visibleRatios += sign * nodeWithProps.ratio;
                    nodeWithProps = iteratorMethod.call(textNodes);
                    if(nodeWithProps)
                    nodeWithProps.node.after(createCaret(getComputedStyle(nodeWithProps.node.parentElement).fontSize, nodeWithProps.node.parentElement.style.minHeight));
                }
            }
        };
}