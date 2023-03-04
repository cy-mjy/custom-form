<template>
  <div class="form-render">
    <component
            @current-change="onCurrentChange"
            @select-typedata="onSelectTypedata"
            ref="widgets"
            v-for="w of widgetsCloned"
            :key="w.id || w.flag"
            :is="renderComponents[w.widgetType]"
            :widget="w"
            :auth="auth"
            :env="env"
            :isType="isType"
            :isBatch="isBatch"
            :onlyView="onlyView"
            :readonly="readonly"
    >
    </component>
  </div>
</template>

<script>
import Attachment from '../components/FormRenderComponents/Attachment.vue'
import CascadeBox from '../components/FormRenderComponents/CascadeBox.vue'
import CheckBox from '../components/FormRenderComponents/CheckBox.vue'
import Container from '../components/FormRenderComponents/Container.vue'
import Date from '../components/FormRenderComponents/Date.vue'
import DateRange from '../components/FormRenderComponents/DateRange.vue'
import Detail from '../components/FormRenderComponents/Detail.vue'
import Group from '../components/FormRenderComponents/Group.vue'
import MultipleLineText from '../components/FormRenderComponents/MultipleLineText.vue'
import Numeric from '../components/FormRenderComponents/Numeric.vue'
import NumericRange from '../components/FormRenderComponents/NumericRange.vue'
import Picture from '../components/FormRenderComponents/Picture.vue'
import RadioBox from '../components/FormRenderComponents/RadioBox.vue'
import SingleLineText from '../components/FormRenderComponents/SingleLineText.vue'

export default {
  name: 'FormRender',
  props: {
    widgets: {
      type: Array,
      default: () => [],
    },
    auth: String,
    env: String,
    isType: {
      type: Boolean,
      default: false,
    },
    isBatch: {
      type: Boolean,
      default: false,
    },
    onlyView: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      widgetsCloned: [],
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
  methods: {
    onCurrentChange(widget) {
      this.$emit('current-change', widget)
    },
    getValue() {
      /**
       * @type { { getValue: Function }[] }
      */
      const widgets = this.$refs.widgets
      if(!widgets) return

      const values = []

      widgets.forEach((widget) => {
        const value = widget.getValue()
        values.push(value)
      })

      if(values.find((value) => value === false) === false) {
        return false
      }
      return values.flat(Infinity)
    },
    onSelectTypedata(data) {
      this.$emit('select-typedata', data)
    },
  },
  watch: {
    widgets: {
      handler() {
        this.widgetsCloned = JSON.parse(JSON.stringify(this.widgets))
      },
      immediate: true,
    },
  },
}
</script>



<style lang="scss">
.form-render {
  &-common-title {
    color: #000c25;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 36px;

    .required {
      flex: none;
      color: #F54A45;
    }
  }

  &-common-desc {
    color: #8F959E;
    font-size: 12px;
    word-break: break-all;
    overflow-wrap: anywhere;
    line-break: anywhere;
    line-height: 14px;
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

  &-attachment {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #000c25;
    gap: 8px;
    margin-top: 10px;

    img {
      flex: none;
      width: 40px;
      height: 40px;
      object-fit: cover;
    }

    span {
      line-height: 16px;
    }

    svg {
      flex: none;
    }
  }

  &-common-select {
    position: relative;
    max-width: 500px;

    &-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 10;
      cursor: pointer;

      &.disable {
        cursor: not-allowed;
      }
    }
  }

  &-common-view {
    font-size: 14px;
    &:not(:last-child) {
      margin-bottom: 24px;
    }

    &-title {
      color: #8F959E;
    }
    &-content {
      margin-top: 10px;
      border-radius: 4px;
      background-color: #f6f6f6;
      color: #000c25;
      padding: 9px 12px;
      line-height: 15px;

      &.rcfile {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        border: 1px solid #DFE3E9;

        img, svg {
          width: 40px;
          height: 40px;
          flex: none;
          object-fit: cover;
        }

        .dlbtn {
          color: #0b58d2;
          cursor: pointer;
          flex: none;
        }

        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
