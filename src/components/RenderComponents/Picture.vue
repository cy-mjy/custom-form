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
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M13.333 1.333a2 2 0 0 1 2 2v9.334a2 2 0 0 1-2 2H2.667a2 2 0 0 1-2-2V3.333a2 2 0 0 1 2-2Zm-1.1 7.59-3.018 2.72-.02.017c-.545.44-1.33.38-1.804-.117l-.072-.083-1.2-1.485-3.95 3.135c.122.137.3.223.498.223h10.666a.667.667 0 0 0 .667-.666v-1.935l-1.767-1.808Zm1.1-6.256H2.667A.667.667 0 0 0 2 3.333v8.21L5.29 8.93a1.333 1.333 0 0 1 1.794.125l.072.082 1.2 1.486 2.984-2.69a1.333 1.333 0 0 1 1.765-.018l.081.077.814.833V3.333a.667.667 0 0 0-.568-.66l-.099-.006ZM5.333 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 1.333a.667.667 0 1 0 0 1.334.667.667 0 0 0 0-1.334Z" fill="currentColor"/></svg>
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
      <svg style="flex:none;" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M13.333 1.333a2 2 0 0 1 2 2v9.334a2 2 0 0 1-2 2H2.667a2 2 0 0 1-2-2V3.333a2 2 0 0 1 2-2Zm-1.1 7.59-3.018 2.72-.02.017c-.545.44-1.33.38-1.804-.117l-.072-.083-1.2-1.485-3.95 3.135c.122.137.3.223.498.223h10.666a.667.667 0 0 0 .667-.666v-1.935l-1.767-1.808Zm1.1-6.256H2.667A.667.667 0 0 0 2 3.333v8.21L5.29 8.93a1.333 1.333 0 0 1 1.794.125l.072.082 1.2 1.486 2.984-2.69a1.333 1.333 0 0 1 1.765-.018l.081.077.814.833V3.333a.667.667 0 0 0-.568-.66l-.099-.006ZM5.333 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 1.333a.667.667 0 1 0 0 1.334.667.667 0 0 0 0-1.334Z" fill="#0b58d2"/></svg>
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
