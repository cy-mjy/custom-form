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

      <el-date-picker size="small" readonly :value="widget.default" style="width:100%;" :format="formatMap[widget.dateFormat]" :placeholder="widget.tips"></el-date-picker>
    </template>

    <div v-else class="design-board-container-item-phone design-board-container-item-dt">
      <span class="design-board-container-item-common-title-text">{{ widget.title }}</span>
      <span class="design-board-container-item-common-title-required" v-show="widget.isRequired">*</span>
      <i v-if="isType" class="type-icon"></i>
      <i v-else-if="widget.isSystem" class="system-icon"></i>

      <el-date-picker size="small" readonly :value="widget.default" style="width:100%;" :format="formatMap[widget.dateFormat]" :placeholder="widget.tips">
      </el-date-picker>
      <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M4.866 2.2a.685.685 0 0 0 0 .967L9.687 8l-4.82 4.833a.685.685 0 0 0 0 .967.68.68 0 0 0 .964 0l5.303-5.317a.685.685 0 0 0 0-.966L5.83 2.2a.68.68 0 0 0-.965 0Z" fill="#646A73" fill-rule="evenodd"/></svg>
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
    created() {
      if(this.widget.value !== '') {
        this.widget.value = +this.widget.value
      }
      if(this.widget.default !== '') {
        this.widget.default = +this.widget.default
      }
    },
    data() {
      return {
        formatMap: Object.freeze({
          '1': 'yyyy',
          '2': 'yyyy-MM',
          '3': 'yyyy-MM-dd',
          '4': 'yyyy-MM-dd HH',
          '5': 'yyyy-MM-dd HH:mm',
        }),
      }
    },
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
  }
</script>

<style lang="scss">
.design-board-container-item-dt {
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
  .el-input__suffix, .el-input__prefix {
    display: none;
  }

  span, svg {
    flex: none;
  }
}
</style>
