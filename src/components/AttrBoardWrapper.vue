<template>
  <div class="attr-board-wrapper" v-if="widget">
    <div class="attr-board-wrapper-title">
      <i v-html="widgetInfo.icon"></i>
      <span>{{ widgetInfo.name }}</span>
      <el-popover v-if="isType" :content="typeTip" trigger="hover" :disabled="!typeTip">
        <i slot="reference" class="type-icon"></i>
      </el-popover>
      <i v-else-if="widget.isSystem" class="system-icon"></i>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { widgets } from '@/data/components'

export default {
  props: {
    widget: Object,
    isType: Boolean,
    typeTip: String,
  },

  computed: {
    widgetInfo() {
      return widgets.find((w) => w.type === this.widget.widgetType)
    },
  },
}
</script>

<style lang="scss">
.attr-board-wrapper {
  width: 344px;
  background-color: #FFFFFF;
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex: none;

  &-title {
    flex: none;
    box-sizing: border-box;
    height: 56px;
    border-bottom: 1px solid #EBEEF5;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 24px;
    color: #000c25;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
