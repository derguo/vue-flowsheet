<template>
    <svg width="100%" height="100%">
        <g
            v-for="p in renderedPathes"
            :key="p.start + '_' + p.end"
            :style="{cursor: 'pointer',boxShadow: '0px 0px 5px #888888'}"
            @click="chooseLine($event, p)"
            ref="line"
        >
            <path
                :d="p.data"
                fill="none"
                stroke="#28f5a5"
                stroke-miterlimit="10"
                pointer-events="stroke"
                visibility="hidden"
                stroke-width="9"
            ></path>
            <path :d="p.data" :style="p.style"></path>
            <polygon :points="p.arrow" :style="p.arrowStyle"></polygon>
        </g>
        <g v-if="false">
            <path
                v-for="(a, index) in renderedArrows"
                :key="'p' + index"
                d="M -1 -2 L 0 1 L 1 -2 z"
                :style="a.style"
                :transform="a.transform"
            ></path>
        </g>
    </svg>
</template>

<script>
export default {
    props: {
        lines: {
            type: Array,
            default() {
                return [];
            },
        },
        outline: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        this.key++;
        document.documentElement.addEventListener('click', this.clickLine, true);
    },
    beforeDestroy() {
        document.documentElement.removeEventListener('click', this.clickLine, true);
    },
    methods: {
        distance(x1, y1, x2, y2) {
            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        },
        computeConnectionPoint(x1, y1, x2, y2, t) {
            let dist = this.distance(x1, y1, x2, y2);
            let p0 = {x: x1, y: y1};
            let p1 = {x: x1 + dist * 0.25, y: y1};
            let p2 = {x: x2 - dist * 0.25, y: y2};
            let p3 = {x: x2, y: y2};

            let c1 = (1 - t) * (1 - t) * (1 - t);
            let c2 = 3 * ((1 - t) * (1 - t)) * t;
            let c3 = 3 * (1 - t) * (t * t);
            let c4 = t * t * t;

            let x = c1 * p0.x + c2 * p1.x + c3 * p2.x + c4 * p3.x;
            let y = c1 * p0.y + c2 * p1.y + c3 * p2.y + c4 * p3.y;
            return {x: x, y: y};
        },
        clickLine(event) {
            // console.log(this.$refs.line);
            for (let item of this.$refs.line) {
                item.firstChild && item.firstChild.setAttribute('visibility', 'hidden');
            }
            const target = event.target || event.srcElement;
            if (!target.matches('path,path *')) {
                this.$emit('chooseLine', null);
            }
        },
        chooseLine(event, data) {
            const target = event.target || event.srcElement;
            if (target.matches('path,path *')) {
                const path = event.path || (event.composedPath && event.composedPath());

                path[1].firstChild.setAttribute('visibility', 'visible');
                this.$emit('chooseLine', {start: data.start, end: data.end});
            }
        },
    },
    computed: {
        renderedPathes() {
            if (!this.lines) {
                return [];
            }

            let pathes = [];
            this.lines.forEach(l => {
                // l.style["marker-end"] = "url(#markerArrow)";
                // console.log(l.show);
                if (l.show !== undefined && !l.show) {
                    return;
                }
                let dist = this.distance(l.x1, l.y1, l.x2, l.y2) * 0.25;
                pathes.push({
                    data: `M ${l.x1}, ${l.y1} C ${l.x1 + dist}, ${l.y1}, ${l.x2 - dist}, ${l.y2}, ${
                        l.x2 - 6 * l.scale
                    }, ${l.y2}`,
                    arrow: `${l.x2 - 7 * l.scale}, ${l.y2 + 3 * l.scale} ${l.x2 - 7 * l.scale}, ${l.y2 - 3 * l.scale} ${
                        l.x2
                    }, ${l.y2}`,
                    style: l.style,
                    arrowStyle: {stroke: l.style.stroke, fill: l.style.stroke},
                    outlineStyle: l.outlineStyle,
                    start: l.start,
                    end: l.end,
                });
            });

            return pathes;
        },
        renderedArrows() {
            if (!this.lines) {
                return [];
            }

            let arrows = [];
            this.lines.forEach(l => {
                // l.x1, l.y1, l.x2, l.y2
                let pos = this.computeConnectionPoint(l.x1, l.y1, l.x2, l.y2, 0.5); //{ x: l.x2, y: l.y2 };
                let pos2 = this.computeConnectionPoint(l.x1, l.y1, l.x2, l.y2, 1);

                let angle = -Math.atan2(pos2.x - pos.x, pos2.y - pos.y);
                let degrees = ((angle >= 0 ? angle : 2 * Math.PI + angle) * 180) / Math.PI;

                if (l.show !== undefined && !l.show) {
                    return;
                }

                arrows.push({
                    transform: `translate(${pos.x}, ${pos.y}) rotate(${degrees})`,
                    style: {
                        stroke: l.style.stroke,
                        strokeWidth: l.style.strokeWidth * 2,
                        fill: l.style.stroke,
                    },
                });
            });

            return arrows;
        },
    },
    data() {
        return {
            key: 1,
        };
    },
    watch: {
        lines() {
            this.key++;
        },
    },
};
</script>

<style scoped>
</style>
