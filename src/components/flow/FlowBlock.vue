<template>
    <div
        class="flow-block"
        :style="style"
        @mouseenter="mouseEnter($event)"
        @mouseleave="mouseLeave($event)"
        @dblclick="dblclick($event)"
        @contextmenu.stop="contextmenu($event)"
    >
        <div class="blockIcon" v-if="icon || (!inGroup && icon)">
            <div class="iconMask"></div>
            <icon-svg :name="icon" style="height: 100%; width: 100%"></icon-svg>
        </div>
        <div class="blockText" :title="datas.text || '未命名'">
            {{ datas.text || '未命名' }}
        </div>

        <div class="linkEnd" @mouseup="slotMouseUp($event, 0)" @mousedown="slotBreak($event)"></div>
        <div class="linkStart" @mousedown="slotMouseDown($event, 1)"></div>
        <div
            class="blockCloseButton"
            @click="closeBlock($event)"
            v-if="operable"
            v-show="blockCloseButtonShow"
            title="删除节点"
        >
            x
        </div>
    </div>
</template>

<script>
export default {
    name: 'FlowBlock',
    inject: ['operable'],
    props: {
        selected: Boolean,
        id: {
            type: Number,
            default: 0,
            validator: function (val) {
                return typeof val === 'number';
            },
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
        height: {
            type: Number,
            default: 0,
            validator: function (val) {
                return typeof val === 'number';
            },
        },
        width: {
            type: Number,
            default: 0,
            validator: function (val) {
                return typeof val === 'number';
            },
        },
        datas: {
            type: Object,
            default: function () {
                return {text: '新建模块'};
            },
        },
        icon: {
            type: String,
            default: '',
        },
        options: {
            type: Object,
        },
        bgColor: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            blockCloseButtonShow: false,
            hasDragged: false,
            tempBgColor: false,
            inGroup: false,
        };
    },
    created() {
        this.mouseX = 0;
        this.mouseY = 0;

        this.lastMouseX = 0;
        this.lastMouseY = 0;

        this.linking = false;
        this.dragging = false;

        if (this.$parent.$vnode.tag.indexOf('FlowBlockGroup') >= 0) {
            this.inGroup = true;
        }
    },
    mounted() {
        if (!this.inGroup && this.operable) {
            document.documentElement.addEventListener('mousemove', this.handleMove, true);
            document.documentElement.addEventListener('mousedown', this.handleDown, true);
            document.documentElement.addEventListener('mouseup', this.handleUp, true);
        }
        if (!this.inGroup) {
            this.$emit('update:width', this.$el.offsetWidth);
            this.$emit('update:height', this.$el.offsetHeight);
        }

        this.moveWithDiff(0, 0);

        this.save();
    },
    beforeDestroy() {
        if (!this.inGroup && this.operable) {
            document.documentElement.removeEventListener('mousemove', this.handleMove, true);
            document.documentElement.removeEventListener('mousedown', this.handleDown, true);
            document.documentElement.removeEventListener('mouseup', this.handleUp, true);
        }
    },
    computed: {
        style() {
            return this.inGroup
                ? {
                      position: 'relative',
                      height: this.height + 'px',
                      width: this.width + 'px',
                      lineHeight: this.height + 'px',
                      cursor: 'default',
                      background: this.backColor,
                  }
                : {
                      top: this.options.center.y + this.y * this.options.scale - (this.selected ? 1 : 0) + 'px',
                      left: this.options.center.x + this.x * this.options.scale - (this.selected ? 1 : 0) + 'px',
                      //   height: this.height + 'px',//this.icon ? this.height + 100 : this.height + 'px',
                      //   width: this.width + 'px',
                      //   lineHeight: this.height + 'px',
                      border: `dashed ${this.selected ? '2px #15b123' : '1px #969696'}`,
                      borderRadius: '8px',
                      transform: 'scale(' + (this.options.scale + '') + ')',
                      transformOrigin: 'top left',
                      background: this.backColor,
                      zIndex: this.selected ? 2 : 1,
                      boxShadow: this.selected ? '0px 0px 5px #15b123' : 'none',
                  };
        },
        backColor() {
            return this.tempBgColor ? '#19bc9c' : this.bgColor;
        },
    },
    methods: {
        handleMove(e) {
            this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft;
            this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop;

            if (this.dragging && !this.linking) {
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
            if (this.$el.contains(target) && e.which === 1) {
                this.dragging = true;

                this.$emit('select');

                if (e.preventDefault) e.preventDefault();
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

            if (this.linking) {
                this.linking = false;
            }
        },

        moveWithDiff(diffX, diffY) {
            let left = 0;
            let top = 0;
            if (this.inGroup) {
                let add = 20;
                for (const block of this.$parent.$children) {
                    if (this === block) {
                        left = this.$parent.x;
                        top = this.$parent.y + add;
                        break;
                    }
                    add += block.height;
                }
            } else {
                left = this.x + diffX / this.options.scale;
                top = this.y + diffY / this.options.scale;
            }

            this.$emit('update:x', left);
            this.$emit('update:y', top);
        },
        save() {
            this.$emit('update');
        },

        slotMouseDown(e, dot) {
            if (!this.operable) {
                return;
            }
            this.linking = true;

            this.$emit('linkingStart', dot);
            if (e.preventDefault) e.preventDefault();
        },
        slotMouseUp(e, dot) {
            this.$emit('linkingStop', dot);
            if (e.preventDefault) e.preventDefault();
        },
        slotBreak(e) {
            this.linking = true;

            this.$emit('linkingBreak');
            if (e.preventDefault) e.preventDefault();
        },

        closeBlock(e) {
            this.$emit('close', this.id);
            if (this.inGroup) {
                this.$parent.changeChildrenDot();
            }
            if (e.preventDefault) e.preventDefault();
        },
        mouseEnter() {
            this.blockCloseButtonShow = true;
            this.tempBgColor = true;
            this.$emit('mouseEnterBlock', this.id);
        },
        mouseLeave() {
            this.blockCloseButtonShow = false;
            this.tempBgColor = false;
            this.$emit('mouseLeaveBlock', this.id);
        },
        dblclick() {
            this.$emit('dblclickBlock', this.id);
        },
        contextmenu(e) {
            if (e.preventDefault) e.preventDefault();

            this.$emit('contextmenu',e);
        }
    },
    updated() {
        // if (this.inGroup) {
        //     let add = 20;
        //     let left = 0;
        //     let top = 0;
        //     for (const block of this.$parent.$children) {
        //         if (this === block) {
        //             left = this.$parent.x;
        //             top = this.$parent.y + add;
        //             break;
        //         }
        //         add += block.height;
        //     }
        //     this.$emit('update:x', left);
        //     this.$emit('update:y', top);
        // }
    },
};
</script>
<style>
.flow-block {
    position: absolute;
    padding: 0px 7px;
    background-color: #e7e7e7;
}
.flow-block:hover {
    cursor: move;
    background-color: #afb4db;
}
.flow-block .blockText {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    text-align: left;
    max-width: 100px;
    margin: 0 auto;
}
.linkEnd,
.linkStart {
    position: absolute;
    height: 100%;
    width: 10px;
    top: 0;
}
.linkEnd:hover,
.linkStart:hover {
    background-color: rgb(1, 219, 110);
    cursor: crosshair;
}
.linkEnd {
    left: 0;
}
.linkStart {
    right: 0;
}
.blockCloseButton {
    position: absolute;
    width: 10px;
    height: 10px;
    text-align: center;
    border-radius: 5px;
    background-color: red;
    color: white;
    font-size: 6px;
    line-height: 10px;
    cursor: pointer;
    right: -5px;
    top: -5px;
}
.blockIcon {
    position: relative;
    width: 50px;
    height: 50px;
    margin: 0 auto;
}
.iconMask {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>