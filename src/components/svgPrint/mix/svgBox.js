const Box = {
    inject: {
        unit: {
            default: "pt",
        },
    },
    props: {
        defaultWidth: {
            type: Number,
            default: 0,
        },
        defaultHeight: {
            type: Number,
            default: 0,
        },
        defaultRelativeX: {
            type: Number,
            default: 0,
        },
        defaultRelativeY: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            relativeX: 0,
            relativeY: 0,
            width: 0,
            height: 0,
        }
    },
    computed: {
        relativeXStr() {
            let r = this.relativeX;
            if (this.unit == "pt") {
                r = (r * 4) / 3;
            }
            return r;
        },
        relativeYStr() {
            let r = this.relativeY;
            if (this.unit == "pt") {
                r = (r * 4) / 3;
            }
            return r;
        },
    },
    mounted() {
        if (this.$refs.box) {
            this.$nextTick(() => {
                this.height = this.$refs.box.getBoundingClientRect().height;
                if (this.unit == 'pt') {
                    this.height = (3 / 4) * this.height
                }
            })
        }
    },
    watch: {
        defaultWidth: {
            handler() {
                this.width = this.defaultWidth;
            },
            immediate: true,
        },
        defaultHeight: {
            handler() {
                this.height = this.defaultHeight;
            },
            immediate: true,
        },
        defaultRelativeX: {
            handler() {
                this.relativeX = this.defaultRelativeX;
            },
            immediate: true,
        },
        defaultRelativeY: {
            handler() {
                this.relativeY = this.defaultRelativeY;
            },
            immediate: true,
        },
    },
}

export default Box;