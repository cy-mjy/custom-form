<template>
  <div :class="[{ 'active': isCurrent }]">
    <div v-show="canDel" class="design-board-container-item-close" @click.stop="onDel"></div>

    <div :class="['design-board-container-item-common-title', { 'phone': mode !== 'pc' }]">
      <span class="design-board-container-item-common-title-text" style="font-size:16px;font-weight:500;">{{ widget.title }}</span>
      <el-popover v-if="widget.tips" :content="widget.tips" trigger="hover" placement="right">
        <svg slot="reference" style="flex:none;cursor:pointer;" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M8 15.333A7.333 7.333 0 1 0 8 .667a7.333 7.333 0 0 0 0 14.666ZM8 5.8a.867.867 0 1 1 0-1.733A.867.867 0 0 1 8 5.8ZM8 12a.667.667 0 0 1-.667-.667v-4a.667.667 0 0 1 1.334 0v4A.667.667 0 0 1 8 12Z" fill="#0B58D2" fill-rule="nonzero"/></svg>
      </el-popover>
      <i v-if="isType" class="type-icon"></i>
      <i v-else-if="widget.isSystem" class="system-icon"></i>
    </div>

    <div :class="['design-board-container-item-group', { 'group-border': widget.isShowBorder }, { 'phone': mode !== 'pc' }]">
      <Draggable
        class="design-board-container-item-group-wrapper"
        :style="{ backgroundColor: widget.children.length === 0 ? '#f6f6f6' : '#ffffff', 'min-height': widget.children.length === 0 ? '65px' : '' }"
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
          :is="renderComponents[w.widgetType]"
          :widgets="widget.children"
          :currentWidget="currentWidget"
          :widget="w"
          :mode="mode"
          :isType="isType"
          :disabled="disabled"
          :needDel="needDel"
          :isBatch="isBatch"
          :gName="gName"
          :getWidgetTitle="getWidgetTitle"
          @click.native.stop="changeCurrentWidget(w)"
          @current-change="changeCurrentWidget"
          @mouseover.native.stop="onMouseOver"
          @mouseout.native.stop="onMouseOut"
          @mouseenter.native.stop="onMouseEnter"
          @mouseleave.native.stop="onMouseLeave"
        >
        </component>
      </Draggable>
      <Empty :showIcon="false" tip="请将控件拖拽到这里" v-show="widget.children.length === 0" />
    </div>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import Empty from '../Empty.vue'

  import { createWidget } from '@/data/components'
  import { flatWidgets } from '@/utils'

  import Attachment from './Attachment.vue'
  import CascadeBox from './CascadeBox.vue'
  import CheckBox from './CheckBox.vue'
  import Container from './Container.vue'
  import Date from './Date.vue'
  import DateRange from './DateRange.vue'
  import Detail from './Detail.vue'
  import Group from './Group.vue'
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
          '12': Detail,
          '40': Group,
          '41': Container
        },
      }
    },
    methods: {
      async onDel() {
        if(!this.canDel) return

        const ws = flatWidgets([this.widget])

        if(ws.find((n) => n.isSystem)) return

        const children = this.widget.children

        let index = 0
        if(this.widget.isNew) {
          index = this.widgets.findIndex(({ flag }) => flag === this.widget.flag)
        } else {
          index = this.widgets.findIndex(({ id }) => id === this.widget.id)
        }
        this.widgets.splice(index, 1)
        this.changeCurrentWidget(null)

        this.widgets.push(...children)
      },
      onAdd(e) {
        /**
         * 判断是否是来自widgetSetup
         */
        const isSetup = e.pullMode === 'clone'

        if(isSetup) {
          const widget = e.from.__vue__.widget || e.from.__vue__.$attrs.widget
          const type = widget.type

          if(widget.type === 40 && this.widget.level >= 3) return

          const curWidget = createWidget(type)

          curWidget.title = this.getWidgetTitle(curWidget)

          this.widget.children.splice(e.newIndex, 0, curWidget)

          this.changeCurrentWidget(curWidget)
          return
        }

        const widget = e.item.__vue__.widget

        if(widget.widgetType !== 40) {
          this.widget.children.splice(e.newIndex, 0, widget)
          this.changeCurrentWidget(widget)
        } else {
          const baseLevel = this.widget.level

          let widgetLevel = 1
          let walk = widget.children.find(({ widgetType }) => widgetType === 40)
          while (walk) {
            walk = walk.children.find(({ widgetType }) => widgetType === 40)
            widgetLevel++
          }

          if(baseLevel + widgetLevel <= 3) {
            this.widget.children.splice(e.newIndex, 0, widget)
            this.changeCurrentWidget(widget)
          }
        }
      },
      onRemove(e) {
        /**
         * 处理移动到另一个容器
         */
        const origin = e.item.__vue__.widget
        const target = e.to.__vue__.$attrs.widget

        /**
         * 目标为主板或者可嵌套一层 明细/布局容器
         */
        if(![13, 40, 41].includes(origin.widgetType)) {
          /**
           * 非可嵌套组件，哪都能进
           */

          let index = 0
          if(origin.isNew) {
            index = this.widget.children.findIndex(({ flag }) => flag === origin.flag)
          } else {
            index = this.widget.children.findIndex(({ id }) => id === origin.id)
          }
          this.widget.children.splice(index, 1)
        } else if([13, 41].includes(origin.widgetType)) {
          /**
           * 非分组可嵌套，能拖进分组和根
           */
          if(!target || target.widgetType === 40) {
            let index = 0
            if(origin.isNew) {
              index = this.widget.children.findIndex(({ flag }) => flag === origin.flag)
            } else {
              index = this.widget.children.findIndex(({ id }) => id === origin.id)
            }
            this.widget.children.splice(index, 1)
          }
        } else if(origin.widgetType === 40) {
          if(!target) {
            /**
             * 移动到根必通过
             */
            let index = 0
            if(origin.isNew) {
              index = this.widget.children.findIndex(({ flag }) => flag === origin.flag)
            } else {
              index = this.widget.children.findIndex(({ id }) => id === origin.id)
            }
            this.widget.children.splice(index, 1)
          } else if(target.widgetType === 40) {
            /**
             * 除了根只能去别的分组
             */
            const targetLevel = target.level

            let originDeep = 1

            let walk = origin.children.find(({ widgetType }) => widgetType === 40)
            while (walk) {
              walk = walk.children.find(({ widgetType }) => widgetType === 40)
              originDeep++
            }

            if(targetLevel + originDeep <= 3) {
              let index = 0
              if(origin.isNew) {
                index = this.widget.children.findIndex(({ flag }) => flag === origin.flag)
              } else {
                index = this.widget.children.findIndex(({ id }) => id === origin.id)
              }
              this.widget.children.splice(index, 1)
            }
          }
        }
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
.group-border {
  border: 1px solid #DFE3E9;
}
.design-board-container-item-group {
  padding: 20px;
  position: relative;

  &.phone {
    padding: 0;
  }

  &-wrapper {
    width: 100%;
  }
}
</style>
