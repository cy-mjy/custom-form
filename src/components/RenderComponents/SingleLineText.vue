<template>
  <div :class="[{ 'active': isCurrent }]" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <div v-show="canDel" class="design-board-container-item-close" @click.stop="onDel"></div>

    <template v-if="mode === 'pc'">
      <div class="design-board-container-item-common-title">
        <span class="design-board-container-item-common-title-required" v-show="widget.isRequired">*</span>
        <span class="design-board-container-item-common-title-text">{{ widget.title }}</span>
        <i v-if="isType" class="type-icon"></i>
        <i v-else-if="widget.isSystem" class="system-icon"></i>
      </div>

      <el-input :placeholder="widget.tips" :value="widget.default" size="small" readonly style="width:100%;" :disabled="isBatch && widget.widgetType === 14"></el-input>
    </template>

    <div v-else class="design-board-container-item-phone design-board-container-item-slt">
      <span class="design-board-container-item-common-title-text">{{ widget.title }}</span>
      <span class="design-board-container-item-common-title-required" v-show="widget.isRequired">*</span>
      <i v-if="isType" class="type-icon"></i>
      <i v-else-if="widget.isSystem" class="system-icon"></i>
      <el-input :placeholder="widget.tips" :value="widget.default" size="small" readonly></el-input>
      <svg v-show="widget.scanMode" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M1.667 13.333c.46 0 .833.373.833.834v2.5l.006.097c.048.414.4.736.827.736h3.334l.097.006a.833.833 0 0 1-.097 1.66H3.333l-.147-.004a2.5 2.5 0 0 1-2.353-2.495v-2.5l.006-.098a.833.833 0 0 1 .828-.736Zm16.666 0c.428 0 .78.322.828.736l.006.098v2.5a2.5 2.5 0 0 1-2.353 2.495l-.147.005h-3.334a.833.833 0 0 1-.097-1.661l.097-.006h3.334c.427 0 .78-.322.827-.736l.006-.097v-2.5c0-.46.373-.834.833-.834Zm.834-4.166a.833.833 0 1 1 0 1.666H.833a.833.833 0 1 1 0-1.666h18.334ZM6.667.833a.833.833 0 0 1 .097 1.661l-.097.006H3.333a.833.833 0 0 0-.827.736l-.006.097v2.5a.833.833 0 0 1-1.661.098l-.006-.098v-2.5A2.5 2.5 0 0 1 3.186.838l.147-.005h3.334Zm10 0 .147.005a2.5 2.5 0 0 1 2.353 2.495v2.5l-.006.098a.833.833 0 0 1-1.661-.098v-2.5l-.006-.097a.833.833 0 0 0-.827-.736h-3.334l-.097-.006a.833.833 0 0 1 .097-1.66h3.334Z" fill="#0B58D2" fill-rule="nonzero"/></svg>
    </div>

    <div class="design-board-container-item-desc" v-show="widget.desc">{{ widget.desc }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      widget: {
        type: Object,
        required: true,
      },
      widgets: {
        type: Array,
        required: true,
      },
      currentWidget: {
        type: Object,
        default: null,
      },
      mode: {
        type: String,
        default: 'pc',
      },
      isType: {
        type: Boolean,
        default: false,
      },
      needDel: {
        type: Boolean,
        default: false,
      },
      isBatch: {
        type: Boolean,
        default: false,
      },
      inContainer: {
        type: Boolean,
        default: false,
      },
    },
    inheritAttrs: false,
    methods: {
      onDel() {
        if(!this.canDel) return
        let index = 0
        if(this.widget.isNew) {
          index = this.widgets.findIndex(({ flag }) => flag === this.widget.flag)
        } else {
          index = this.widgets.findIndex(({ id }) => id === this.widget.id)
        }
        this.widgets.splice(index, 1)
        this.$emit('current-change', null)
      },
    },
    computed: {
      isCurrent() {
        if(this.currentWidget === null) return false

        if(this.widget.isNew === true) {
          /**
           * 使用flag判断
           */
          return this.currentWidget.isNew && this.currentWidget.flag === this.widget.flag;

        } else {
          return !this.currentWidget.isNew && this.currentWidget.id === this.widget.id;

        }
      },
      canDel() {
        if(this.isCurrent && this.needDel) return true

        return this.isCurrent && !this.widget.isSystem && !this.isType
      },
    },
    created() {
      if(!this.widget.isRequired) {
        this.widget.minLength = 0
      } else {
        if(this.widget.minLength < 1) {
          this.widget.minLength = 1
        }
      }
    },
  }
</script>

<style lang="scss">
.design-board-container-item-slt {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 8px;

  .design-board-container-item-common-title-text {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span, svg {
    flex: none;
  }
}
</style>
