<template>
    <ul class="flow-default-blocks">
        <template v-for="(item, i) in defaultBlocksOptions">
            <li
                :key="i"
                draggable="true"
                @dragstart="onDragstart($event, item)"
                @dragend="onDragend($event)"
                @dragover="onDragover($event)"
                @drop="onDrop($event)"
                style="position: relative"
            >
                <div class="mengban"></div>
                <div class="blockIcon" draggable="true" @dragstart="onDragstart($event, item)">
                    <icon-svg
                        :name="item.icon"
                        draggable="true"
                        @dragstart="onDragstart($event, item)"
                        style="height: 100%; width: 100%"
                    ></icon-svg>
                </div>

                {{ item.datas.text }}
            </li>
        </template>
    </ul>
</template>

<script>
import mouseHelper from './helpers/mouse';
import cloneDeep from 'lodash/cloneDeep';

export default {
    name: 'FlowDefaultBlocks',
    inject: ['defaultBlocksOptions'],
    methods: {
        onDragstart(event, data) {
            let target = event.target || event.srcElement;

            let mouse = mouseHelper.getMousePosition(target, event);
            data = cloneDeep(data);
            data.x = mouse.x;
            data.y = mouse.y;

            this.$emit('dragBlock', data);
        },
        onDragend() {},
        onDragover(e) {
            if (e.preventDefault) e.preventDefault();
        },
        onDrop() {},
    },
    props: {
        options: {
            type: Array,
            default() {
                return [];
            },
        },
    },
};
</script>

<style scoped>
.flow-default-blocks {
    width: 120px;
    padding: 0;
    margin: 0;
}
.flow-default-blocks li {
    float: left;
    cursor: pointer;
    width: 120px;
    font-size: 12px;
    text-align: left;
    list-style: none;
    border: 1 solid #ccc;
    margin-bottom: 10px;
}
.blockIcon {
    width: 50px;
    height: 50px;
    margin: 0;
}
.mengban {
    position: absolute;
    top:0;
    left: 0;
    top:0;
    bottom: 0;
    width: 100%;
    height: 100%;
}
</style>