<template>
    <div>
        <el-button @click="saveImg" class="savebutton">下载</el-button>
        <flow-default-blocks @dragBlock="onDragstart($event)"></flow-default-blocks>
        <div
            class="flow_container"
            :style="containerStyle"
            @dragover="onDragover($event)"
            @drop="onDrop($event)"
            ref="container"
            @contextmenu="contextmenu($event)"
        >
            <template v-for="block in blocks">
                <flow-block
                    v-if="!block.children"
                    v-bind.sync="block"
                    :key="block.id + '1'"
                    :options="optionsForChild"
                    @linkingStart="linkingStart(block, $event)"
                    @linkingStop="linkingStop(block, $event)"
                    @mouseEnterBlock="$emit('mouseEnterBlock', $event)"
                    @mouseLeaveBlock="$emit('mouseLeaveBlock', $event)"
                    @dblclickBlock="$emit('dblclickBlock', $event)"
                    @contextmenu="contextmenu($event, block)"
                    @update="updateScene"
                    @close="deleteBlock($event)"
                    @select="selectBlock(block)"
                ></flow-block>
                <FlowBlockGroup
                    v-if="block.children && block.children.length"
                    :key="
                        block.children
                            .filter(val => {
                                return val.id;
                            })
                            .join('')
                    "
                    v-show="block.show !== false"
                    v-bind.sync="block"
                    :options="optionsForChild"
                    @openChild="openChild($event, block)"
                    @update="updateScene"
                    @select="selectBlock(block)"
                >
                    <flow-block
                        v-for="blockitem in block.children"
                        v-bind.sync="blockitem"
                        :key="blockitem.id"
                        @linkingStart="linkingStart(blockitem, $event)"
                        @linkingStop="linkingStop(blockitem, $event)"
                        @mouseEnterBlock="$emit('mouseEnterBlock', $event)"
                        @dblclickBlock="$emit('dblclickBlock', $event)"
                        @mouseLeaveBlock="$emit('mouseLeaveBlock', $event)"
                        @close="deleteBlock($event)"
                        @contextmenu="contextmenu($event, blockitem)"
                    ></flow-block>
                </FlowBlockGroup>
            </template>
            <FlowLink :lines="lines" :outline="true" @chooseLine="linkChoosed($event)" />
            <div class="contextmenu" :style="menuStyle" v-show="contextmenuShow">
                <slot name="contextmenu" :block="menuData">右键菜单</slot>
            </div>
        </div>
    </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import FlowBlock from './FlowBlock';
import FlowBlockGroup from './FlowBlockGroup';
import FlowLink from './FlowLink';
import mouseHelper from './helpers/mouse';
import FlowDefaultBlocks from './FlowDefaultBlocks';

export default {
    name: 'FlowContainer',
    components: {FlowBlock, FlowBlockGroup, FlowLink, FlowDefaultBlocks},
    props: {
        scene: {
            type: Object,
            default: function () {
                return {blocks: [], links: [], container: {}};
            },
        },
        defaultBlocks: {
            type: Array,
            default() {
                return [];
            },
        },
        operable: {
            type: Boolean,
            default: true,
        },
    },
    provide() {
        return {
            defaultBlocksOptions: this.defaultBlocks,
            operable: this.operable,
        };
    },
    data() {
        return {
            blocks: [],
            links: [],
            container: {},
            tempLink: null,
            mouseX: 0,
            mouseY: 0,
            menuX: 0,
            menuY: 0,
            lastMouseX: 0,
            lastMouseY: 0,
            scale: 1,
            centerY: 0,
            centerX: 0,
            chooseLine: null,
            chooseDefaultBlock: null,
            minScale: 0.2,
            maxScale: 5,
            contextmenuShow: false,
            menuData: null,
        };
    },
    created() {
        this.blocks = cloneDeep(this.scene.blocks);
        this.links = cloneDeep(this.scene.links);
        this.container = cloneDeep(this.scene.container);
        let container = this.container;
        if (container.centerX) {
            this.centerX = container.centerX;
        }
        if (container.centerY) {
            this.centerY = container.centerY;
        }
        if (container.scale) {
            this.scale = container.scale;
        }
    },
    mounted() {
        document.documentElement.addEventListener('mousemove', this.handleMove, true);
        document.documentElement.addEventListener('mousedown', this.handleDown, true);
        document.documentElement.addEventListener('mouseup', this.handleUp, true);
        document.documentElement.addEventListener('wheel', this.handleWheel, {passive: false});

        document.documentElement.addEventListener('keydown', this.handleKeyboard, true);

        // this.centerX = this.$refs.container.clientWidth / 2;
        // this.centerY = this.$refs.container.clientHeight / 2;

        // this.importBlocksContent();
        // this.importScene();
        this.updateScene();
    },
    beforeDestroy() {
        document.documentElement.removeEventListener('mousemove', this.handleMove, true);
        document.documentElement.removeEventListener('mousedown', this.handleDown, true);
        document.documentElement.removeEventListener('mouseup', this.handleUp, true);
        document.documentElement.removeEventListener('wheel', this.handleWheel, {passive: false});
    },
    methods: {
        handleMove(e) {
            let mouse = mouseHelper.getMousePosition(this.$refs.container, e);
            this.mouseX = mouse.x;
            this.mouseY = mouse.y;

            if (this.dragging) {
                let diffX = this.mouseX - this.lastMouseX;
                let diffY = this.mouseY - this.lastMouseY;

                this.lastMouseX = this.mouseX;
                this.lastMouseY = this.mouseY;

                this.centerX += diffX;
                this.centerY += diffY;

                this.hasDragged = true;
            }

            if (this.linking && this.linkStartData) {
                let linkStartPos = this.getConnectionPos(this.linkStartData.block, this.linkStartData.lineDot);
                this.tempLink = {
                    x1: linkStartPos.x,
                    y1: linkStartPos.y,
                    x2: this.mouseX,
                    y2: this.mouseY,
                    scale: this.scale,
                };
            }
        },
        handleDown(e) {
            const target = e.target || e.srcElement;

            if ((target === this.$refs.container || target.matches('svg, svg *')) && e.which === 1) {
                this.dragging = true;

                let mouse = mouseHelper.getMousePosition(this.$refs.container, e);
                this.mouseX = mouse.x;
                this.mouseY = mouse.y;

                this.lastMouseX = this.mouseX;
                this.lastMouseY = this.mouseY;

                this.deselectBlockAll();

                if (e.preventDefault) e.preventDefault();
            }
        },
        handleUp(e) {
            this.contextmenuShow = false;

            const target = e.target || e.srcElement;

            if (this.dragging) {
                this.dragging = false;

                if (this.hasDragged) {
                    this.updateScene();
                    this.hasDragged = false;
                }
            }

            if (this.$refs.container.contains(target) && !(target.className === 'linkEnd')) {
                this.linking = false;
                this.tempLink = null;
                this.linkStartData = null;
            }
        },
        handleWheel(e) {
            const target = e.target || e.srcElement;
            if (this.$refs.container.contains(target)) {
                if (e.preventDefault) e.preventDefault();
                let deltaScale = Math.pow(1.1, e.deltaY * -0.01);
                this.scale *= deltaScale;
                if (this.scale < this.minScale) {
                    this.scale = this.minScale;
                    return;
                } else if (this.scale > this.maxScale) {
                    this.scale = this.maxScale;
                    return;
                }
                let zoomingCenter = {
                    x: this.mouseX,
                    y: this.mouseY,
                };
                let deltaOffsetX = (zoomingCenter.x - this.centerX) * (deltaScale - 1);
                let deltaOffsetY = (zoomingCenter.y - this.centerY) * (deltaScale - 1);
                this.centerX -= deltaOffsetX;
                this.centerY -= deltaOffsetY;
                this.updateScene();
            }
        },
        handleKeyboard(event) {
            if (!this.operable) {
                return;
            }
            var e = event || window.event || arguments.callee.caller.arguments[0];

            if (e && e.keyCode == 46) {
                if (this.chooseLine !== null) {
                    this.links = this.links.filter(val => {
                        return !(val.start === this.chooseLine.start && val.end === this.chooseLine.end);
                    });
                    this.chooseLine = null;
                    this.updateScene();
                }
            }
        },

        getConnectionPos(block, lineDot) {
            let dot = null;
            switch (lineDot) {
                case 0:
                    dot = {x: block.x, y: block.y + block.height / 2};
                    break;
                case 1:
                    dot = {x: block.x + block.width, y: block.y + block.height / 2};
                    break;
                case 2:
                    dot = {x: block.x + block.width / 2, y: block.y};
                    break;
                case 3:
                    dot = {x: block.x + block.width / 2, y: block.y + block.height};
                    break;
            }
            dot.x *= this.scale;
            dot.y *= this.scale;

            dot.x += this.centerX;
            dot.y += this.centerY;

            return dot; //{ x: block.x + block.width, y: block.y + block.height / 2 };
        },

        linkingStart(block, lineDot) {
            this.linkStartData = {block, lineDot};
            let linkStartPos = this.getConnectionPos(this.linkStartData.block, this.linkStartData.lineDot);
            this.tempLink = {
                x1: linkStartPos.x,
                y1: linkStartPos.y,
                x2: this.mouseX,
                y2: this.mouseY,
                scale: this.scale,
            };
            this.linking = true;
        },
        linkingStop(targetBlock, lineDot) {
            if (this.linkStartData && targetBlock) {
                this.links = this.links.filter(value => {
                    return !(value.start === this.linkStartData.block.id && value.end === targetBlock.id);
                });
                // skip if looping
                if (this.linkStartData.block.id !== targetBlock.id) {
                    this.links.push({
                        start: this.linkStartData.block.id,
                        end: targetBlock.id,
                        themeColor: '#555',
                    });
                    this.updateScene();
                }
            }

            this.linking = false;
            this.tempLink = null;
            this.linkStartData = null;
        },
        linkChoosed(e) {
            this.chooseLine = e;
        },

        exportScene() {
            // let blocks = cloneDeep(this.blocks).map(value => {
            //     // delete value['selected'];

            //     return value;
            // });

            return {
                blocks: this.blocks,
                links: this.links,
                container: this.container,
            };
        },
        updateScene() {
            this.$emit('update:scene', this.exportScene());
        },

        findBlockById(bs, blockId) {
            let r = null;
            for (let item of bs) {
                if (item.children && item.children.length) {
                    if (this.findBlockById(item.children, blockId)) {
                        r = this.findBlockById(item.children, blockId);
                        break;
                    }
                } else if (item.id == blockId) {
                    r = {block: item, parent: bs};
                    break;
                }
            }
            return r;
        },

        findMaxId(bs) {
            let max = undefined;
            for (let item of bs) {
                if (item.children && item.children.length) {
                    max = this.findMaxId(item.children);
                } else if (max === undefined || max < item.id) {
                    max = item.id;
                }
            }
            return max;
        },

        onDragstart(data) {
            this.chooseDefaultBlock = data;
        },
        onDragover(e) {
            if (e.preventDefault) e.preventDefault();
        },
        onDrop(e) {
            if (!this.operable) {
                return;
            }
            let mouse = mouseHelper.getMousePosition(this.$refs.container, e);

            this.chooseDefaultBlock.x = (mouse.x - this.chooseDefaultBlock.x * this.scale - this.centerX) / this.scale;
            this.chooseDefaultBlock.y = (mouse.y - this.chooseDefaultBlock.y * this.scale - this.centerY) / this.scale;
            this.chooseDefaultBlock.width = 120;
            this.chooseDefaultBlock.height = 20;

            this.chooseDefaultBlock.id = this.findMaxId(this.blocks) + 1;

            this.blocks.push(this.chooseDefaultBlock);

            this.$emit('update:scene', this.exportScene());
            console.log(this.links, this.blocks);
        },

        selectBlock(block) {
            this.deselectBlockAll(block);
            this.$set(block, 'selected', true);

            this.$emit('select', block);
        },
        deselectBlock(block) {
            this.$set(block, 'selected', false);

            this.$emit('deselect', block);
        },
        deselectBlockAll(except) {
            this.blocks.forEach(block => {
                if (except !== block) {
                    this.deselectBlock(block);
                }
            });
            // this.updateScene();
        },
        deleteBlock(id) {
            let b = this.findBlockById(this.blocks, id);
            let i = b.parent.indexOf(b.block);
            if (i >= 0) {
                b.parent.splice(i, 1);

                this.links = this.links.filter(link => {
                    return !(link.start === id || link.end === id);
                });
                this.$nextTick(() => {
                    this.updateScene();
                });
            }
        },

        openChild(e, b) {
            console.log('开关', e, b);
            b.onoff = e.state;
            this.updateScene();
            this.$emit('openChild', e);
        },

        contextmenu(e, block) {
            if (!this.operable) {
                return
            }

            if (e && e.preventDefault) e.preventDefault();

            this.contextmenuShow = true;
            this.menuData = block;

            let mouse = mouseHelper.getMousePosition(this.$refs.container, e);
            this.menuX = mouse.x;
            this.menuY = mouse.y;

            this.$emit('contextmenu', block);
        },

        saveImg() {
            console.log(this.$refs.container);
            this.$emit('saveimage', this.$refs.container);
        },
    },
    computed: {
        lines() {
            let lines = [
                ...this.links.map(val => {
                    let startBlock = this.findBlockById(this.blocks, val.start).block;
                    let endBlock = this.findBlockById(this.blocks, val.end).block;
                    let startDot = null;
                    let endDot = null;
                    if (startBlock && endBlock) {
                        startDot = this.getConnectionPos(startBlock, 1);
                        endDot = this.getConnectionPos(endBlock, 0);
                    }
                    return {
                        x1: startDot ? startDot.x : -1,
                        y1: startDot ? startDot.y : -1,
                        x2: endDot ? endDot.x : -1,
                        y2: endDot ? endDot.y : -1,
                        start: val.start,
                        end: val.end,
                        show: val.show,
                        style: {
                            stroke: val.themeColor || '#666',
                            strokeWidth: 2 * this.scale,
                            fill: 'none',
                        },
                        scale: this.scale,
                    };
                }),
            ];

            if (this.tempLink) {
                this.tempLink.style = {
                    stroke: '#8f8f8f',
                    strokeWidth: 2 * this.scale,
                    fill: 'none',
                };

                lines.push(this.tempLink);
            }
            return lines;
        },
        groups() {
            return this.blocks.filter(val => {
                return val.children && val.children.length;
            });
        },
        containerStyle() {
            return !this.defaultBlocks.length
                ? {}
                : {
                      left: '120px',
                  };
        },
        optionsForChild() {
            return {
                scale: this.scale,
                center: {
                    x: this.centerX,
                    y: this.centerY,
                },
            };
        },
        menuStyle() {
            return {
                left: this.menuX + 'px',
                top: this.menuY + 'px',
            };
        },
    },
    watch: {
        'scene.links': {
            handler(val) {
                console.log('links变化', val);
                this.links = cloneDeep(val);
            },
            deep: true,
        },
        'scene.blocks': {
            handler(val) {
                console.log('blocks变化', val);
                this.blocks = cloneDeep(val);
            },
            deep: true,
        },
        // scene: {
        //   handler(val) {
        //     console.log('scene变化',val);
        //     this.blocks = cloneDeep(val.blocks);
        //     this.links = cloneDeep(val.links);
        //   },
        //   deep: true,
        // }
    },
};
</script>

<style scoped>
.flow_container {
    position: relative;
    overflow: hidden;
    background-color: #eee;
    background: url(http://haohedata.com:8888/HHDI/svg/images/paintbg.gif) repeat;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
}
.flow_container {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 1px solid black;
}
.savebutton {
    position: absolute;
    z-index: 9990;
    right: 0px;
}

.contextmenu {
    position: absolute;
    z-index: 999;
    background-color: rgb(255, 255, 255);
    cursor: pointer;
    border: 1px solid #333;
    user-select: none;
}
</style>