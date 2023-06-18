<template>
  <div :class="[{ 'active': isCurrent }]">
    <div v-show="canDel" class="design-board-container-item-close" @click.stop="onDel"></div>

    <div :class="['design-board-container-item-common-title', { 'phone': mode !== 'pc' }]">
      <span class="design-board-container-item-common-title-text">{{ widget.title }}</span>
      <i v-if="isType" class="type-icon"></i>
      <i v-else-if="widget.isSystem" class="system-icon"></i>
    </div>

    <div :class="['design-board-container-item-detail', { 'phone': mode !== 'pc' }]">
      <div class="design-board-container-item-detail-header">
        <span v-show="widget.showIndex" style="margin-right:8px;">{{ widget.indexName }}</span>
        <svg @click="open = !open" width="12" height="12" :style="{ 'cursor': 'pointer', 'transform': open ? 'rotate(0deg)' : 'rotate(180deg)' }" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.7 8.746c.4-.4.4-1.047 0-1.446-.4-.4-1.05-.4-1.45 0L12 14.53 4.75 7.3c-.4-.4-1.05-.4-1.45 0-.4.399-.4 1.046 0 1.446l7.975 7.954c.4.4 1.05.4 1.45 0L20.7 8.746Z" fill="#646A73" fill-rule="evenodd"/></svg>
      </div>

      <div class="design-board-container-item-detail-wrapper" v-show="open">
        <Draggable
          class="design-board-container-item-detail-wrapper-container"
          :style="{ backgroundColor: widget.children.length === 0 ? '#f6f6f6' : '#ffffff' }"
          :animation="150"
          :value="widget.children"
          :group="{ name: gName, pull: true, put: gName }"
          @add="onAdd"
          @remove="onRemove"
          @update="onUpdate"
          :widget="widget"
          :disabled="disabled"
        >
          <component
            class="design-board-container-item"
            v-for="w of widget.children"
            :key="w.id || w.flag"
            @click.native.stop="changeCurrentWidget(w)"
            :is="renderComponents[w.widgetType]"
            :widgets="widget.children"
            :currentWidget="currentWidget"
            :widget="w"
            @current-change="changeCurrentWidget"
            :mode="mode"
            @mouseover.native.stop="onMouseEnter"
            @mouseout.native.stop="onMouseLeave"
            @mouseenter.native.stop
            @mouseleave.native.stop
            :isType="isType"
            :needDel="needDel"
            :isBatch="isBatch"
          >
          </component>
        </Draggable>
        <Empty tip="可拖入多个控件（不包含明细/分组/布局控件）" :showIcon="false" v-show="widget.children.length === 0" />
      </div>
    </div>

    <div v-if="mode === 'pc'">
      <el-button size="small">
        <div style="display:flex;align-items:center;justify-content:center;gap:12px;">
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h16v16H0z"/><path d="M8 1.333c.368 0 .667.299.667.667v5.332L14 7.333a.667.667 0 0 1 0 1.334H8.666V14a.667.667 0 0 1-1.333 0V8.666H2a.667.667 0 0 1 0-1.333h5.333V2c0-.368.299-.667.667-.667Z" fill="currentColor"/></g></svg>
          <span style="font-size:14px;">{{ widget.buttonText }}</span>
        </div>
      </el-button>
    </div>
    <div v-else class="design-board-container-item-detail-add">
      <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h16v16H0z"/><path d="M8 1.333c.368 0 .667.299.667.667v5.332L14 7.333a.667.667 0 0 1 0 1.334H8.666V14a.667.667 0 0 1-1.333 0V8.666H2a.667.667 0 0 1 0-1.333h5.333V2c0-.368.299-.667.667-.667Z" fill="currentColor"/></g></svg>
      <span style="font-size:14px;">{{ widget.buttonText }}</span>
    </div>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import Empty from '../Empty.vue'

  import { createWidget } from '@/data/components'

  import Attachment from './Attachment.vue'
  import CascadeBox from './CascadeBox.vue'
  import CheckBox from './CheckBox.vue'
  import Date from './Date.vue'
  import DateRange from './DateRange.vue'
  import MultipleLineText from './MultipleLineText.vue'
  import Numeric from './Numeric.vue'
  import NumericRange from './NumericRange.vue'
  import Picture from './Picture.vue'
  import RadioBox from './RadioBox.vue'
  import SingleLineText from './SingleLineText.vue'

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
      disabled: {
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
      gName: {
        type: String,
        default: 'zh',
      },
      getWidgetTitle: Function,
    },
    components: {
      Draggable,
      Empty,
    },
    data() {
      return {
        renderComponents: {
          '1': SingleLineText,
          '2': MultipleLineText,
          '3': Numeric,
          '4': NumericRange,
          '5': RadioBox,
          '6': CheckBox,
          '7': CascadeBox,
          '8': Date,
          '9': DateRange,
          '10': Attachment,
          '11': Picture,
        },
        open: true,
      }
    },
    inheritAttrs: false,
    methods: {
      async onDel() {
        if(!this.canDel) return

        if(this.widget.children.find((n) => n.isSystem)) return


        let index = 0
        if(this.widget.isNew) {
          index = this.widgets.findIndex(({ flag }) => flag === this.widget.flag)
        } else {
          index = this.widgets.findIndex(({ id }) => id === this.widget.id)
        }
        this.widgets.splice(index, 1)
        this.changeCurrentWidget(null)
      },
      onAdd(e) {
        /**
         * 判断是否是来自widgetSetup
         */
        const isSetup = e.pullMode === 'clone'

        if(isSetup) {
          const widget = e.from.__vue__.widget || e.from.__vue__.$attrs.widget
          const type = widget.type

          if([13, 40, 41].includes(type)) return

          const curWidget = createWidget(type)

          curWidget.title = this.getWidgetTitle(curWidget)

          this.widget.children.splice(e.newIndex, 0, curWidget)

          this.changeCurrentWidget(curWidget)
          return
        }

        const widget = e.item.__vue__.widget
        const type = widget.type

        if([13, 40, 41].includes(type)) return

        this.widget.children.splice(e.newIndex, 0, widget)
        this.changeCurrentWidget(widget)
      },
      onRemove(e) {
        /**
         * 处理移动到另一个容器
         */
        const origin = e.item.__vue__.widget

        let index = 0
        if(origin.isNew) {
          index = this.widget.children.findIndex(({ flag }) => flag === origin.flag)
        } else {
          index = this.widget.children.findIndex(({ id }) => id === origin.id)
        }
        this.widget.children.splice(index, 1)
      },
      onUpdate(e) {
        const { newIndex, oldIndex } = e
        const { [0]: moveWidget } = this.widget.children.splice(oldIndex, 1)

        this.widget.children.splice(newIndex, 0, moveWidget)
      },
      changeCurrentWidget(widget) {
        this.$emit('current-change', widget)
      },
      /**
       * @param { MouseEvent } e
       */
      onMouseOver(e) {
        e.currentTarget.classList.add('zzxxcc')
      },
      /**
       * @param { MouseEvent } e
       */
      onMouseOut(e) {
        e.currentTarget.classList.remove('zzxxcc')
      },
      onMouseEnter(e) {
        e.currentTarget.classList.add('zzxxcc')
      },
      onMouseLeave(e) {
        e.currentTarget.classList.remove('zzxxcc')
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
.design-board-container-item-detail {
  border: 1px solid #DFE3E9;

  &-header {
    height: 32px;
    background-color: #F6F6F6;
    color: #000c25;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #DFE3E9;
  }

  &-wrapper {
    padding: 20px;
    background-color: #fff;
    position: relative;

    &-container {
      min-height: 65px;
    }
  }

  &.phone {
    .design-board-container-item-detail-header {
      background-color: #fff;
      height: 48px;
      color: #8F959E;
    }
    .design-board-container-item-detail-wrapper {
      padding: 0;
      border-color: transparent;
    }
  }

  &-add {
    height: 56px;
    color: #0b58d2;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background-color: #fff;
  }
}
</style>
