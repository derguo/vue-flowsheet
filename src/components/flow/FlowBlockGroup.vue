<template>
    <div class="flow-block-group" :style="style">
        <div
            class="flow-block-group-title"
            :style="{backgroundColor: themeColor, borderBottomColor: themeColor}"
            ref="gtitle"
            :title="datas.title"
            @contextmenu.stop="$event.preventDefault && $event.preventDefault()"
        >
            {{ datas.title }}
            <div class="blockGroupCloseButton" @click="closeGroup($event)" title="删除节点" v-if="false">x</div>
            <div
                v-if="onoff"
                class="blockGroupAddButton"
                :style="{backgroundColor: themeColor, borderBottomColor: themeColor}"
                @click="openChild(false)"
                title="关闭后续节点"
            >
                -
            </div>
            <div
                v-if="!onoff"
                class="blockGroupAddButton"
                :style="{backgroundColor: themeColor, borderBottomColor: themeColor}"
                @click="openChild(true)"
                title="打开后续节点"
            >
                +
            </div>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';

export default {
    name: 'FlowBlockGroup',
    inject: ['operable'],
    props: {
        selected: Boolean,
        onoff: {
            type: Boolean,
            default: true,
        },
        x: {
            type: Number,
            default: 0,
            validator: function (val) {
                return typeof val === 'number';
            },
        },
        y: {
            type: Number,
            default: 0,
            validator: function (val) {
                return typeof val === 'number';
            },
        },
        datas: {
            type: Object,
            default: function () {
                return {title: '新建模块'};
            },
        },
        children: {
            type: Array,
            default: function (params) {
                return [];
            },
        },
        themeColor: {
            type: String,
            default: function (params) {
                return '#000';
            },
        },
        options: {
            type: Object,
        },
    },
    data() {
        return {
            open: true,
        };
    },
    created() {
        this.mouseX = 0;
        this.mouseY = 0;

        this.lastMouseX = 0;
        this.lastMouseY = 0;

        this.dragging = false;
    },
    mounted() {
        if (this.operable) {
            document.documentElement.addEventListener('mousemove', this.handleMove, true);
            document.documentElement.addEventListener('mousedown', this.handleDown, true);
            document.documentElement.addEventListener('mouseup', this.handleUp, true);
        }

        this.changeChildrenDot();
    },
    beforeDestroy() {
        if (this.operable) {
            document.documentElement.removeEventListener('mousemove', this.handleMove, true);
            document.documentElement.removeEventListener('mousedown', this.handleDown, true);
            document.documentElement.removeEventListener('mouseup', this.handleUp, true);
        }
    },
    methods: {
        handleMove(e) {
            this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft;
            this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop;

            if (this.dragging) {
                let diffX = this.mouseX - this.lastMouseX;
                let diffY = this.mouseY - this.lastMouseY;

                this.lastMouseX = this.mouseX;
                this.lastMouseY = this.mouseY;

                this.moveWithDiff(diffX, diffY);

                this.hasDragged = true;
            }
        },
        handleDown(e) {
            this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft;
            this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop;

            this.lastMouseX = this.mouseX;
            this.lastMouseY = this.mouseY;

            const target = e.target || e.srcElement;
            if (this.$refs.gtitle.contains(target) && e.which === 1) {
                this.dragging = true;

                this.$emit('select');

                if (e.preventDefault) e.preventDefault();
            }else if(this.$el.contains(target) && e.which === 1) {
                this.$emit('select');
            }
        },
        handleUp() {
            if (this.dragging) {
                this.dragging = false;

                if (this.hasDragged) {
                    this.save();
                    this.hasDragged = false;
                }
            }
        },
        moveWithDiff(diffX, diffY) {
            let left = this.x + diffX / this.options.scale;
            let top = this.y + diffY / this.options.scale;

            this.$emit('update:x', left);
            this.$emit('update:y', top);

            this.changeChildrenDot();
        },
        changeChildrenDot() {
            let add = 20;
            let tempChildren = cloneDeep(this.children);
            for (let i = 0; i < tempChildren.length; i++) {
                tempChildren[i].x = this.x;
                tempChildren[i].y = this.y + add;
                add += tempChildren[i].height;
            }

            this.$emit('update:children', tempChildren);
        },

        save() {
            this.$emit('update');
        },

        closeGroup(e) {},
        openChild(e) {
            this.open = e;
            this.$emit('openChild', {
                state: this.open,
                blockes: this.children.map(val => {
                    return val.id;
                }),
            });
        },
    },
    computed: {
        style() {
            return {
                top: this.options.center.y + this.y * this.options.scale + 'px',
                left: this.options.center.x + this.x * this.options.scale + 'px',
                border: '1px solid' + this.themeColor,
                transform: 'scale(' + (this.options.scale + '') + ')',
                transformOrigin: 'top left',
                zIndex: this.selected ? 2 : 1,
                boxShadow: this.selected ? '0px 0px 8px #15b123' : 'none',
            };
        },
    },
};
</script>

<style scoped>
.flow-block-group {
    position: absolute;
    background-color: #f6f6f6;
    border: 1px rgb(c, 100, 100) solid;
    border-radius: 3px;
}
.flow-block-group-title {
    height: 20px;
    line-height: 20px;
    cursor: move;
    color: white;
    font-size: 12px;
    border-bottom: 1px rgb(100, 100, 100) solid;
    background-color: rgb(100, 100, 100);
    /* max-width: 120px; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.blockGroupCloseButton {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: red;
    color: white;
    font-size: 6px;
    line-height: 10px;
    cursor: pointer;
    right: -5px;
    top: -5px;
    text-align: center;
}
.blockGroupAddButton {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: rgb(122, 122, 122);
    color: white;
    font-size: 12px;
    line-height: 16px;
    cursor: pointer;
    /* right: -16px; */
    /* top: 2px; */
    left: 52px;
    bottom: -16px;
    text-align: center;
}
</style>