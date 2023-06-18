<template>
  <div :class="['form-render-container', `sc${widget.style}`]">
    <div v-for="(wi, i) of ws" :key="i" :class="[`s${i}`]">
      <component
        v-for="w of wi.children"
        :key="w.id || w.flag"
        :is="renderComponents[w.widgetType]"
        :widget="w"
        :auth="auth"
        :env="env"
        ref="widgets"
        :isType="isType"
        :isBatch="isBatch"
        :inContainer="true"
        :readonly="readonly"
        :onlyView="onlyView"
        @select-typedata="onSelectTypedata"
      >
      </component>
    </div>
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
        lengtha: Object.freeze([2,2,2,3,3,3,3,3,3,4,5,6]),
      }
    },
    computed: {
      ws() {
        const lengths = [2,2,2,3,3,3,3,3,3,4,5,6]

        const ws = Array.from({ length: lengths[this.widget.style] }, () => ({}))

        for (let index = 0; index < lengths[this.widget.style]; index++) {
          ws[index].children = this.widget.children.filter(({ floor }) => floor === index)
        }

        return ws
      },
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

        let values = []

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
.form-render-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px 20px;

  &.sc0 {
    .s0 {
      grid-area: 1 / 1 / 3 / 4;
    }
    .s1 {
      grid-area: 1 / 4 / 3 / 7;
    }
  }
  &.sc1 {
    .s0 {
      grid-area: 1 / 1 / 3 / 5;
    }
    .s1 {
      grid-area: 1 / 5 / 3 / 7;
    }
  }
  &.sc2 {
    .s0 {
      grid-area: 1 / 1 / 3 / 3;
    }
    .s1 {
      grid-area: 1 / 3 / 3 / 7;
    }
  }
  &.sc3 {
    .s0 {
      grid-area: 1 / 1 / 2 / 7;
    }
    .s1 {
      grid-area: 2 / 1 / 3 / 5;
    }
    .s2 {
      grid-area: 2 / 5 / 3 / 7;
    }
  }
  &.sc4 {
    .s0 {
      grid-area: 1 / 1 / 2 / 7;
    }
    .s1 {
      grid-area: 2 / 1 / 3 / 3;
    }
    .s2 {
      grid-area: 2 / 3 / 3 / 7;
    }
  }
  &.sc5 {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 0.8fr 0.8fr 1.4fr 1.4fr 0.8fr 0.8fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px 20px;

    .s0 {
      grid-area: 1 / 1 / 3 / 3;
    }
    .s1 {
      grid-area: 1 / 3 / 3 / 5;
    }
    .s2 {
      grid-area: 1 / 5 / 3 / 7;
    }
  }
  &.sc6 {
    .s0 {
      grid-area: 1 / 1 / 3 / 3;
    }
    .s1 {
      grid-area: 1 / 3 / 3 / 5;
    }
    .s2 {
      grid-area: 1 / 5 / 3 / 7;
    }
  }
  &.sc7 {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 0.8fr 0.8fr 0.8fr 0.8fr 1.4fr 1.4fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px 20px;

    .s0 {
      grid-area: 1 / 1 / 3 / 3;
    }
    .s1 {
      grid-area: 1 / 3 / 3 / 5;
    }
    .s2 {
      grid-area: 1 / 5 / 3 / 7;
    }
  }
  &.sc8 {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 1.4fr 1.4fr 0.8fr 0.8fr 0.8fr 0.8fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px 20px;

    .s0 {
      grid-area: 1 / 1 / 3 / 3;
    }
    .s1 {
      grid-area: 1 / 3 / 3 / 5;
    }
    .s2 {
      grid-area: 1 / 5 / 3 / 7;
    }
  }
  &.sc9 {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 20px 20px;

    .s0 {
      grid-area: 1 / 1 / 2 / 2;
    }
    .s1 {
      grid-area: 1 / 2 / 2 / 3;
    }
    .s2 {
      grid-area: 1 / 3 / 2 / 4;
    }
    .s3 {
      grid-area: 1 / 4 / 2 / 5;
    }
  }
  &.sc10 {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 20px 20px;

    .s0 {
      grid-area: 1 / 1 / 2 / 2;
    }
    .s1 {
      grid-area: 1 / 2 / 2 / 3;
    }
    .s2 {
      grid-area: 1 / 3 / 2 / 4;
    }
    .s3 {
      grid-area: 1 / 4 / 2 / 5;
    }
    .s4 {
      grid-area: 1 / 5 / 2 / 6;
    }
  }
  &.sc11 {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 20px 20px;

    .s0 {
      grid-area: 1 / 1 / 2 / 2;
    }
    .s1 {
      grid-area: 1 / 2 / 2 / 3;
    }
    .s2 {
      grid-area: 1 / 3 / 2 / 4;
    }
    .s3 {
      grid-area: 1 / 4 / 2 / 5;
    }
    .s4 {
      grid-area: 1 / 5 / 2 / 6;
    }
    .s5 {
      grid-area: 1 / 6 / 2 / 7;
    }
  }
}
</style>
