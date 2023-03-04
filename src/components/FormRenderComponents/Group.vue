<template>
  <div class="form-render-group">
    <div class="form-render-common-title" style="line-height:16px;">
      <span style="font-size:16px;font-weight:500;">{{ widget.title }}</span>
      <el-popover v-if="widget.tips" :content="widget.tips" trigger="hover" placement="right">
        <svg slot="reference" style="flex:none;cursor:pointer;" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M8 15.333A7.333 7.333 0 1 0 8 .667a7.333 7.333 0 0 0 0 14.666ZM8 5.8a.867.867 0 1 1 0-1.733A.867.867 0 0 1 8 5.8ZM8 12a.667.667 0 0 1-.667-.667v-4a.667.667 0 0 1 1.334 0v4A.667.667 0 0 1 8 12Z" fill="#0B58D2" fill-rule="nonzero"/></svg>
      </el-popover>
    </div>
    <div :class="['form-render-group-container', { 'group-border': widget.isShowBorder }]">
    <component
      @current-change="onCurrentChange"
      @select-typedata="onSelectTypedata"
      v-for="w of widget.children"
      :key="w.id || w.flag"
      :is="renderComponents[w.widgetType]"
      :widget="w"
      :auth="auth"
      :env="env"
      ref="widgets"
      :isType="isType"
      :isBatch="isBatch"
      :readonly="readonly"
      :onlyView="onlyView"
    >
    </component>
    </div>
  </div>
</template>

<script>
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
      widget: Object,
      auth: String,
      env: String,
      isType: Boolean,
      isBatch: Boolean,
      onlyView: Boolean,
      readonly: Boolean,
    },
    inheritAttrs: false,
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
        return values
      },
      onSelectTypedata(data) {
        this.$emit('select-typedata', data)
      },
    },
  }
</script>

<style lang="scss">
.form-render-group {
  &:not(:last-child) {
    margin-bottom: 22px;
  }

  &-container {
    padding: 20px;
    margin-top: 12px;

    &.group-border {
      border: 1px solid #DFE3E9;
    }
  }
}
</style>
