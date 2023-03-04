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
        <template v-if="widget.layout === 0">
          <el-radio v-for="(o, i) of widget.options" :key="i" :value="o.isDefault" :label="true">{{ o.content }}</el-radio>
        </template>
        <el-select v-else :value="contents" size="small" style="width:100%;" :placeholder="widget.tips">
          <el-option v-for="(o, i) of widget.options" :key="i" :value="o.content" :label="o.content">{{ o.content }}</el-option>
        </el-select>
      </div>
    </template>

    <div v-else class="design-board-container-item-phone design-board-container-item-rb">
      <span class="design-board-container-item-common-title-text">{{ widget.title }}</span>
      <span class="design-board-container-item-common-title-required" v-show="widget.isRequired">*</span>
      <i v-if="isType" class="type-icon"></i>
      <i v-else-if="widget.isSystem" class="system-icon"></i>
      <el-input :placeholder="widget.tips" :value="contents" size="small" readonly>
        <svg slot="suffix" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M4.866 2.2a.685.685 0 0 0 0 .967L9.687 8l-4.82 4.833a.685.685 0 0 0 0 .967.68.68 0 0 0 .964 0l5.303-5.317a.685.685 0 0 0 0-.966L5.83 2.2a.68.68 0 0 0-.965 0Z" fill="#646A73" fill-rule="evenodd"/></svg>
      </el-input>
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
      contents() {
        const hasDefault = this.widget.options.find((o) => o.isDefault)

        if(hasDefault) {
          return hasDefault.content
        } else {
          return null
        }
      },
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
.design-board-container-item-rb {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;

  .design-board-container-item-common-title-text {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  input {
    padding-right: 24px !important;
  }

  span, svg {
    flex: none;
  }
}
</style>
