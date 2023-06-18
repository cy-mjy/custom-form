<template>
  <div style="margin-bottom:22px;">
    <div class="form-render-common-title" style="line-height:14px;">
      <span>{{ widget.title }}</span>
    </div>
    <div v-for="(b, i) of blocks" :key="i" class="form-render-detail">
      <div class="form-render-detail-header">
        <span>{{ widget.indexName }}</span>
        <svg @click="b.show = !b.show" width="12" height="12" :style="{ 'cursor': 'pointer', 'transform': b.show ? 'rotate(0deg)' : 'rotate(180deg)' }" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.7 8.746c.4-.4.4-1.047 0-1.446-.4-.4-1.05-.4-1.45 0L12 14.53 4.75 7.3c-.4-.4-1.05-.4-1.45 0-.4.399-.4 1.046 0 1.446l7.975 7.954c.4.4 1.05.4 1.45 0L20.7 8.746Z" fill="#646A73" fill-rule="evenodd"/></svg>
        <svg @click="rm(i)" class="form-render-detail-dl" v-if="i !== 0" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M13.333 4.667c.342 0 .624.257.663.589l.004.077v8a2 2 0 0 1-1.882 1.997l-.118.003H4a2 2 0 0 1-1.997-1.882L2 13.333v-8a.667.667 0 0 1 1.329-.077l.004.077v8c0 .342.258.624.59.663L4 14h8a.667.667 0 0 0 .662-.589l.005-.078v-8c0-.368.298-.666.666-.666ZM6 5.333c.368 0 .667.299.667.667v6a.667.667 0 0 1-1.334 0V6c0-.368.299-.667.667-.667Zm4 0c.368 0 .667.299.667.667v6a.667.667 0 0 1-1.334 0V6c0-.368.299-.667.667-.667ZM9.286.667a2 2 0 0 1 1.587.782l.078.108.541.813a.667.667 0 0 0 .472.292l.083.005h2.62a.667.667 0 0 1 .077 1.329L14.667 4h-2.62a2 2 0 0 1-1.587-.782l-.077-.109-.542-.812a.667.667 0 0 0-.472-.292L9.286 2H6.714a.667.667 0 0 0-.505.23l-.05.067-.542.812a2 2 0 0 1-1.53.887L3.952 4h-2.62a.667.667 0 0 1-.077-1.329l.077-.004h2.62a.667.667 0 0 0 .505-.231l.05-.066.541-.813A2 2 0 0 1 6.58.671l.134-.004h2.572Z" fill="#F54A45" fill-rule="nonzero"/></svg>
      </div>
      <div class="form-render-detail-wrapper" v-show="b.show">
        <component
          v-for="w of b.children"
          :key="w.id || w.flag"
          :is="renderComponents[w.widgetType]"
          :widget="w"
          :auth="auth"
          :env="env"
          :ref="`block${i}`"
          :isType="isType"
          :isBatch="isBatch"
          :readonly="readonly"
          :onlyView="onlyView"
          @select-typedata="onSelectTypedata"
        >
        </component>
      </div>
    </div>
    <el-button v-if="!onlyView" size="small" style="margin-top:10px;border-color:#0b58d2;" @click="clone" :style="{'opacity': readonly ? 0.5 : 1 }" :disabled="readonly">
      <div style="display:flex;align-items:center;justify-content:center;gap:12px;color:#0b58d2;">
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h16v16H0z"/><path d="M8 1.333c.368 0 .667.299.667.667v5.332L14 7.333a.667.667 0 0 1 0 1.334H8.666V14a.667.667 0 0 1-1.333 0V8.666H2a.667.667 0 0 1 0-1.333h5.333V2c0-.368.299-.667.667-.667Z" fill="currentColor"/></g></svg>
        <span style="font-size:14px;">{{ widget.buttonText }}</span>
      </div>
    </el-button>
  </div>
</template>

<script>
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
        },
        blocks: [],
        base: null,
      }
    },
    methods: {
      clone() {
        if(this.readonly) return

        this.blocks.push({
          show: true,
          children: JSON.parse(JSON.stringify(this.base)),
        })
      },
      rm(index) {
        this.blocks.splice(index, 1)
      },
      onCurrentChange(widget) {
        this.$emit('current-change', widget)
      },
      getValue() {
        let values = []

        for (let index = 0; index < this.blocks.length; index++) {
          /**
           * @type { { getValue: Function }[] }
           */
          const block = this.$refs[`block${index}`]

          if(!block) return

          block.forEach((b) => {
            const value = b.getValue()
            if(value !== false) {
              value.row = index
            }

            values.push(value)
          })
        }

        if(values.find((value) => value === false) === false) {
          return false
        }
        return values
      },
      onSelectTypedata(data) {
        this.$emit('select-typedata', data)
      },
    },
    created() {
      this.base = JSON.parse(JSON.stringify(this.widget.children))

      this.blocks.push({
        show: true,
        children: JSON.parse(JSON.stringify(this.base)),
      })
    },
  }
</script>

<style lang="scss">
.form-render-detail {
  border: 1px solid #DFE3E9;
  margin-top: 10px;

  &-header {
    height: 32px;
    background-color: #f6f6f6;
    color: #000c25;
    font-size: 14px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
  }

  &-dl {
    position: absolute;
    right: 20px;
    cursor: pointer;
  }

  &-wrapper {
    padding: 20px;
  }
}
</style>
