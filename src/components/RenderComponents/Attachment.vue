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

      <div>
        <el-button size="small">
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M14.264 2.3c.361.365.63.773.806 1.225a3.807 3.807 0 0 1 0 2.785c-.176.451-.445.86-.806 1.225l-5.77 5.782c-.36.366-.805.67-1.333.913a4.732 4.732 0 0 1-1.672.427 4.665 4.665 0 0 1-1.8-.244c-.612-.203-1.18-.568-1.702-1.096-.512-.517-.868-1.078-1.07-1.681a4.675 4.675 0 0 1-.24-1.804c.04-.598.178-1.161.414-1.689a4.48 4.48 0 0 1 .896-1.339L7.11 1.676c.09-.092.223-.114.399-.069a.851.851 0 0 1 .4.206c.08.091.145.225.195.403.05.178.03.312-.06.403L2.936 7.732a3.655 3.655 0 0 0-.678.96 3.09 3.09 0 0 0-.136 2.435c.151.425.423.836.814 1.232.352.355.74.606 1.168.753.426.147.85.208 1.272.183a3.64 3.64 0 0 0 1.206-.282c.381-.162.708-.38.979-.654l5.754-5.768a2.56 2.56 0 0 0 .58-.852 2.28 2.28 0 0 0 .165-.875 2.026 2.026 0 0 0-.203-.845 2.781 2.781 0 0 0-.542-.76c-.432-.427-.917-.627-1.454-.602-.537.026-1.077.312-1.62.86l-5.196 5.22c-.23.233-.344.492-.339.776a.98.98 0 0 0 .279.7c.22.223.474.314.76.274.287-.04.52-.152.701-.335l4.715-4.733c.09-.091.223-.114.399-.068a.851.851 0 0 1 .4.205.92.92 0 0 1 .21.404c.05.177.03.312-.06.403l-4.73 4.733c-.362.365-.708.618-1.04.76a2.094 2.094 0 0 1-.933.19 1.823 1.823 0 0 1-.814-.235 3.437 3.437 0 0 1-.693-.518 2.437 2.437 0 0 1-.46-.624 2.039 2.039 0 0 1-.233-.837c-.02-.304.033-.629.159-.973.125-.345.369-.695.73-1.05.18-.183.342-.35.482-.503a7.82 7.82 0 0 1 .339-.35l.173-.167 4.203-4.23a4.333 4.333 0 0 1 1.182-.86 3.505 3.505 0 0 1 1.303-.358c.442-.03.877.03 1.303.183.427.152.821.41 1.183.776Z" fill="currentColor"/></svg>
          <span style="margin-left:8px;">{{ widget.buttonText }}</span>
        </el-button>
      </div>
    </template>
    <div v-else class="design-board-container-item-phone" style="display:flex;align-items:center;gap:8px;padding:16px;">
      <span class="design-board-container-item-common-title-text" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ widget.title }}</span>
      <span class="design-board-container-item-common-title-required" style="flex:none;" v-show="widget.isRequired">*</span>
      <i v-if="isType" class="type-icon"></i>
      <i v-else-if="widget.isSystem" class="system-icon"></i>
      <div style="flex:auto;"></div>
      <svg style="flex:none;" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M14.264 2.3c.361.365.63.773.806 1.225a3.807 3.807 0 0 1 0 2.785c-.176.451-.445.86-.806 1.225l-5.77 5.782c-.36.366-.805.67-1.333.913a4.732 4.732 0 0 1-1.672.427 4.665 4.665 0 0 1-1.8-.244c-.612-.203-1.18-.568-1.702-1.096-.512-.517-.868-1.078-1.07-1.681a4.675 4.675 0 0 1-.24-1.804c.04-.598.178-1.161.414-1.689a4.48 4.48 0 0 1 .896-1.339L7.11 1.676c.09-.092.223-.114.399-.069a.851.851 0 0 1 .4.206c.08.091.145.225.195.403.05.178.03.312-.06.403L2.936 7.732a3.655 3.655 0 0 0-.678.96 3.09 3.09 0 0 0-.136 2.435c.151.425.423.836.814 1.232.352.355.74.606 1.168.753.426.147.85.208 1.272.183a3.64 3.64 0 0 0 1.206-.282c.381-.162.708-.38.979-.654l5.754-5.768a2.56 2.56 0 0 0 .58-.852 2.28 2.28 0 0 0 .165-.875 2.026 2.026 0 0 0-.203-.845 2.781 2.781 0 0 0-.542-.76c-.432-.427-.917-.627-1.454-.602-.537.026-1.077.312-1.62.86l-5.196 5.22c-.23.233-.344.492-.339.776a.98.98 0 0 0 .279.7c.22.223.474.314.76.274.287-.04.52-.152.701-.335l4.715-4.733c.09-.091.223-.114.399-.068a.851.851 0 0 1 .4.205.92.92 0 0 1 .21.404c.05.177.03.312-.06.403l-4.73 4.733c-.362.365-.708.618-1.04.76a2.094 2.094 0 0 1-.933.19 1.823 1.823 0 0 1-.814-.235 3.437 3.437 0 0 1-.693-.518 2.437 2.437 0 0 1-.46-.624 2.039 2.039 0 0 1-.233-.837c-.02-.304.033-.629.159-.973.125-.345.369-.695.73-1.05.18-.183.342-.35.482-.503a7.82 7.82 0 0 1 .339-.35l.173-.167 4.203-4.23a4.333 4.333 0 0 1 1.182-.86 3.505 3.505 0 0 1 1.303-.358c.442-.03.877.03 1.303.183.427.152.821.41 1.183.776Z" fill="#0b58d2"/></svg>
      <span style="color:#0b58d2;flex:none;">{{ widget.buttonText }}</span>
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
      if(typeof this.widget.default === 'string') {
        const value = this.widget.default
        if(value === '') {
          this.widget.default = []
        } else {
          this.widget.default = JSON.parse(value)
        }
      }
      if(typeof this.widget.value === 'string') {
        const value = this.widget.value
        if(value === '') {
          this.widget.value = []
        } else {
          this.widget.value = JSON.parse(value)
        }
      }
    },
  }
</script>
