<template>
  <Draggable
    :style="{ backgroundColor: widget.children.length === 0 ? '#F6F6F6' : '#ffffff' }"
    :animation="150"
    :value="widget.children"
    :group="{ name: gName, pull: true, put: gName }"
    @add="onAdd"
    @remove="onRemove"
    @update="onUpdate($event, widget)"
    :widget="widget"
    :disabled="disabled"
  >
    <component
      class="design-board-container-item"
      v-for="w of widget.children"
      :key="w.id || w.flag"
      :is="renderComponents[w.widgetType]"
      :widgets="real.children"
      :currentWidget="currentWidget"
      :widget="w"
      :mode="mode"
      :isType="isType"
      :needDel="needDel"
      :isBatch="isBatch"
      :inContainer="true"
      @click.native.stop="changeCurrentWidget(w)"
      @current-change="changeCurrentWidget"
      @mouseover.native.stop="onMouseEnter"
      @mouseout.native.stop="onMouseLeave"
      @mouseenter.native.stop
      @mouseleave.native.stop
    >
    </component>
  </Draggable>
</template>

<script>
  import Draggable from 'vuedraggable'
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
      index: {
        type: Number,
        required: true,
      },
      real: {
        type: Object,
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
      }
    },
    inheritAttrs: false,
    methods: {
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
          curWidget.floor = this.index

          let index = 0
          let target = this.widget.children[e.newIndex]
          let addEnd = false

          if(!target) {
            target = this.widget.children.slice(-1)[0]
            addEnd = true

            if(!target) {
              this.real.children.splice(index, 0, curWidget)
              this.changeCurrentWidget(curWidget)
              return
            }
          }

          if(target.isNew) {
            index = this.real.children.findIndex(({ flag }) => flag === target.flag)
          } else {
            index = this.real.children.findIndex(({ id }) => id === target.id)
          }

          if(addEnd) {
            index += 1
          }

          this.real.children.splice(index, 0, curWidget)

          this.changeCurrentWidget(curWidget)
          return
        }

        const widget = e.item.__vue__.widget
        const type = widget.type

        if([13, 40, 41].includes(type)) return

        widget.floor = this.index

        let target = this.widget.children[e.newIndex]
        let index = 0
        let addEnd = false

        if(!target) {
          target = this.widget.children.slice(-1)[0]
          addEnd = true

          if(!target) {
            this.real.children.splice(index, 0, widget)
            this.changeCurrentWidget(widget)
            return
          }
        }

        if(target.isNew) {
          index = this.real.children.findIndex(({ flag }) => flag === target.flag)
        } else {
          index = this.real.children.findIndex(({ id }) => id === target.id)
        }

        if(addEnd) {
          index += 1
        }

        this.real.children.splice(index, 0, widget)

        this.changeCurrentWidget(widget)
      },
      onRemove(e) {
        /**
         * 处理移动到另一个容器
         */
        const origin = e.item.__vue__.widget
        let index = 0
        if(origin.isNew) {
          index = this.real.children.findIndex(({ flag }) => flag === origin.flag)
        } else {
          index = this.real.children.findIndex(({ id }) => id === origin.id)
        }
        this.real.children.splice(index, 1)
      },
      onUpdate(e, block) {
        const origin = e.item.__vue__.widget

        let originIndex = 0
        if(origin.isNew) {
          originIndex = this.real.children.findIndex(({ flag }) => flag === origin.flag)
        } else {
          originIndex = this.real.children.findIndex(({ id }) => id === origin.id)
        }
        const { newIndex } = e
        const prevWidget = block.children[newIndex]

        let prevIndex = 0
        if(prevWidget.isNew) {
          prevIndex = this.real.children.findIndex(({ flag }) => flag === prevWidget.flag)
        } else {
          prevIndex = this.real.children.findIndex(({ id }) => id === prevWidget.id)
        }

        const { [0]: moveWidget } = this.real.children.splice(originIndex, 1)
        this.real.children.splice(prevIndex, 0, moveWidget)
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
  }
</script>
