<template>
  <div class="design-board pcmode" @click="setCurWidgetNull">
    <draggable
            class="design-board-container"
            :style="{ backgroundColor: widgets.length === 0 ? '#EEF2F5' : '#ffffff' }"
            :value="widgets"
            :group="{ name: gName, pull: true, put: gName }"
            :animation="150"
            @add="onAdd"
            @update="onUpdate"
            @remove="onRemove"
            :disabled="disabled"
    >
      <component
              class="design-board-container-item"
              v-for="w of widgetsWithLevel"
              :key="w.id || w.flag"
              :is="renderComponents[w.widgetType]"
              :widgets="widgetsWithLevel"
              :currentWidget="currentWidget"
              :widget="w"
              mode="pc"
              :isType="isType"
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
    </draggable>
    <Empty v-if="widgets.length === 0" />
  </div>
</template>

<script>
import { createWidget, widgets } from '@/data/components'
import { flatWidgets } from '@/utils'

import Draggable from 'vuedraggable'
import Empty from '../components/Empty.vue'

import Attachment from '../components/RenderComponents/Attachment.vue'
import CascadeBox from '../components/RenderComponents/CascadeBox.vue'
import CheckBox from '../components/RenderComponents/CheckBox.vue'
import Container from '../components/RenderComponents/Container.vue'
import Date from '../components/RenderComponents/Date.vue'
import DateRange from '../components/RenderComponents/DateRange.vue'
import Detail from '../components/RenderComponents/Detail.vue'
import Group from '../components/RenderComponents/Group.vue'
import MultipleLineText from '../components/RenderComponents/MultipleLineText.vue'
import Numeric from '../components/RenderComponents/Numeric.vue'
import NumericRange from '../components/RenderComponents/NumericRange.vue'
import Picture from '../components/RenderComponents/Picture.vue'
import RadioBox from '../components/RenderComponents/RadioBox.vue'
import SingleLineText from '../components/RenderComponents/SingleLineText.vue'

/**
 * 添加层级
*/
function addLevel(data, level = 1) {
  data.children.forEach((i) => {
    i.level = level

    if(i.children) {
      addLevel(i, level + 1)
    }
  })
}

function deepJson(data) {
  return JSON.stringify(data, (_, val) => {
    let valClone = val
    if(typeof valClone === 'object' && valClone !== null) {
      valClone = JSON.parse(JSON.stringify(valClone))
      Object.keys(valClone).forEach((key) => {
        if(['default', 'value'].includes(key) && typeof valClone[key] === 'object' && valClone[key] !== null) {
          valClone[key] = deepJson(valClone[key])
        }
      })
    }

    return valClone
  })
}

export default {
  name: 'DesignBoard',
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
        '41': Container,
      },
    }
  },
  props: {
    widgets: {
      type: Array,
      default: () => [],
    },
    currentWidget: {
      type: Object,
      default: null,
    },
    mode: {
      type: String,
      default: 'pc',
    },
    /**
     * 是否为类型表单
    */
    isType: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否显示删除(级别最高),一般类型表单的字段不能删除,为了删除适用于示例表单的字段
    */
    needDel: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否为批次表单,禁用批次号的标志
    */
    isBatch: {
      type: Boolean,
      default: false,
    },
    /**
     * Draggable的groupname
    */
    gName: {
      type: String,
      default: 'zh',
    },
  },
  methods: {
    onAdd(e) {
      /**
       * 判断是否是来自widgetSetup
      */
      const isSetup = e.pullMode === 'clone'

      if(isSetup) {
        const widget = e.from.__vue__.widget || e.from.__vue__.$attrs.widget

        const curWidget = createWidget(widget.type)
        if(curWidget === null) return

        curWidget.title = this.getWidgetTitle(curWidget)

        this.widgets.splice(e.newIndex, 0, curWidget)

        this.changeCurrentWidget(curWidget)
        return
      }

      const widget = e.item.__vue__.widget

      this.widgets.splice(e.newIndex, 0, widget)
      this.changeCurrentWidget(widget)
    },
    onUpdate(e) {
      const { newIndex, oldIndex } = e
      const { [0]: moveWidget } = this.widgets.splice(oldIndex, 1)

      this.widgets.splice(newIndex, 0, moveWidget)
    },
    onRemove(e) {
      /**
       * 处理移动到另一个容器
      */
      const origin = e.item.__vue__.widget
      const target = e.to.__vue__.$attrs.widget || e.to.__vue__.widget

      if(![13, 40, 41].includes(origin.widgetType)) {
        /**
         * 非可嵌套组件，哪都能进
        */
        let index = 0
        if(origin.isNew) {
          index = this.widgets.findIndex(({ flag }) => flag === origin.flag)
        } else {
          index = this.widgets.findIndex(({ id }) => id === origin.id)
        }
        this.widgets.splice(index, 1)
      } else if([13, 41].includes(origin.widgetType)) {
        /**
         * 非分组可嵌套，只能拖进分组吧
        */
        if(target.widgetType === 40) {
          let index = 0
          if(origin.isNew) {
            index = this.widgets.findIndex(({ flag }) => flag === origin.flag)
          } else {
            index = this.widgets.findIndex(({ id }) => id === origin.id)
          }
          this.widgets.splice(index, 1)
        }
      } else if(origin.widgetType === 40) {
        /**
         * 离开根只能去别的分组
        */
        if(target.widgetType !== 40) return

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
            index = this.widgets.findIndex(({ flag }) => flag === origin.flag)
          } else {
            index = this.widgets.findIndex(({ id }) => id === origin.id)
          }
          this.widgets.splice(index, 1)
        }
      }
    },
    changeCurrentWidget(widget) {
      this.$emit('current-change', widget)
    },
    setCurWidgetNull() {
      this.$emit('current-change', null)
    },
    getWidgetTitle(widget) {
      const base = widgets.find((w) => w.type === widget.widgetType).name

      const name = base
      let title = base

      const titles = this.widgetsFlat.map(({ title }) => title)

      if(titles.includes(title)) {
        let index = 1

        while(titles.includes(title)) {
          title = `${name}(${index})`
          index++
        }
      }

      return title
    },
    generateUsefulJSON() {
      const json = JSON.parse(deepJson(this.widgets))
      return json
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
    widgetsFlat() {
      return flatWidgets(this.widgets)
    },
    widgetsWithLevel() {
      addLevel({ children: this.widgets, level: 0 })
      return this.widgets
    },
    viewMode() {
      return this.mode === 'phone' ? 'phone' : 'pc'
    },
  },
}
</script>



<style lang="scss">
.design-board {
  background-color: #ffffff;
  position: relative;

  .zzxxcc {
    &:not(.active) {
      border: #0B58D2 dashed 1px !important;
    }
  }

  &.pcmode {
    padding: 24px;

    .design-board-container-item {
      display: flex;
      flex-direction: column;
      gap: 10px;

      &:not(:last-child) {
        margin-bottom: 24px;
      }
    }
  }

  &.phonemode {
    padding: 8px;

    .design-board-container {
      border: 1px dashed #DFE3E9;
    }

    .design-board-container::-webkit-scrollbar {
      display: none;
    }

    .design-board-container-item {
      background-color: rgb(238, 242, 245);
      border-color: #FFFFFF;
      border-style: solid;
      border-bottom-color: #DFE3E9;

      &.active {
        border: #0B58D2 1px solid;
      }

      &:not(.active):last-child {
        border-bottom: none;
      }
    }

    .design-board-container-item-desc {
      padding: 8px 16px;
    }

    .design-board-container-item-common-title {
      font-size: 16px;
    }

    input, textarea {
      padding: 0;
    }
  }

  .sortable-ghost {
    width: 100%;
    height: 4px !important;
    background-color: #0B58D2 !important;
    flex: none;

    *, *::before, *::after {
      opacity: 0;
    }
  }

  &-container {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    &-item {
      &-phone {
        background-color: #ffffff;

        input, textarea {
          border: none;
          font-size: 16px;
        }

        input {
          text-align: right;
        }
      }

      .need-pr {
        padding-right: 24px !important;

        svg, path, g, circle {
          fill: #E2E2E2;
        }
      }

      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      border-width: 1px;
      border-style: dotted;
      border-color: transparent;

      input, textarea {
        color: #000c25;
      }

      &-close {
        position: absolute;
        top: 0;
        right: 0;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: #0B58D2;
        cursor: pointer;
        transform: translate(50%,-50%);
        z-index: 10;

        &::before {
          content: "";
          display: block;
          width: 16px;
          height: 16px;
          position: absolute;
          bottom: 0;
          left: 0;
          background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 32 32'%3E%3Cpath fill='%23FFFFFF' d='M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z'/%3E%3C/svg%3E");
          transform: translate(40%,-40%);
        }
      }

      &.active {
        border-style: solid;
        border-color:#0B58D2;
      }

      &-common-title {
        &.phone {
          background-color: #fff;
          padding: 12px 16px;
          font-size: 14px;
        }

        color: #000c25;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 4px;

        &-required {
          flex: none;
          color: #F54A45;
        }

        &-text {
          word-break: break-all;
          overflow-wrap: anywhere;
          line-break: anywhere;
        }
      }

      &-desc {
        font-size: 12px;
        color: #8F959E;
        white-space: pre-wrap;
        word-break: break-all;
        overflow-wrap: anywhere;
        line-break: anywhere;
      }

      .el-button {
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        &--small {
          font-size: 14px;
          height: 32px;
        }
      }

      .el-input__suffix-inner {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
