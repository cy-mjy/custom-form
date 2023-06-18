<template>
  <AttrBoardWrapper v-if="widget" :widget="widget" :isType="isType" :typeTip="typeTip">
    <component
            :is="AttrBoardComponents[widget.widgetType]"
            :env="env"
            :auth="auth"
            :disableAttrs="disableAttrs"
            :widget="widget"
            :readonly="readonly"
            :titleTip="titleTip"
            :widgetFlat="widgetFlat"
            :getTitle="getTitle"
    ></component>
  </AttrBoardWrapper>
</template>

<script>
import { flatWidgets } from '@/utils'
import { widgets } from '@/data/components'

import AttrBoardWrapper from '../components/AttrBoardWrapper.vue'

import Attachment from '../components/AttrBoardComponents/Attachment.vue'
import CascadeBox from '../components/AttrBoardComponents/CascadeBox.vue'
import CheckBox from '../components/AttrBoardComponents/CheckBox.vue'
import Container from '../components/AttrBoardComponents/Container.vue'
import Date from '../components/AttrBoardComponents/Date.vue'
import DateRange from '../components/AttrBoardComponents/DateRange.vue'
import Detail from '../components/AttrBoardComponents/Detail.vue'
import Group from '../components/AttrBoardComponents/Group.vue'
import MultipleLineText from '../components/AttrBoardComponents/MultipleLineText.vue'
import Numeric from '../components/AttrBoardComponents/Numeric.vue'
import NumericRange from '../components/AttrBoardComponents/NumericRange.vue'
import Picture from '../components/AttrBoardComponents/Picture.vue'
import RadioBox from '../components/AttrBoardComponents/RadioBox.vue'
import SingleLineText from '../components/AttrBoardComponents/SingleLineText.vue'

export default {
  name: 'AttrBoard',
  components: {
    AttrBoardWrapper,
  },
  props: {
    widget: {
      type: Object,
      default: null,
    },
    widgets: {
      type: Array,
      default: () => [],
    },
    env: String,
    auth: String,
    readonly: {
      type: Boolean,
      default: false,
    },
    isType: {
      type: Boolean,
      default: false,
    },
    typeTip: {
      type: String,
      default: '',
    },
    titleTip: {
      type: String,
      default: '',
    },
    disableAttrs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      AttrBoardComponents: {
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
    getTitle(widget) {
      const titles = this.widgetFlat.map(({ title }) => title)

      if(widget.title === '' || titles.filter((t) => t === widget.title).length > 1) {
        const base = widgets.find((w) => w.type === widget.widgetType).name

        const name = base
        let title = base
        let index = 1

        while(titles.includes(title)) {
          title = `${name}(${index})`
          index++
        }

        widget.title = title
      }
    }
  },
  computed: {
    widgetFlat() {
      return flatWidgets(this.widgets)
    },
  },
}
</script>

<style lang="scss">
.attr-board {
  &-container {
    padding: 20px 24px;
    overflow: auto;
    font-size: 14px;
    color: #000c25;
    flex: auto;

    .disable {
      opacity: .5;
      cursor: not-allowed !important;
    }

    .el-input__suffix {
      width: 24px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &-common-title {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 6px;

    &-required {
      color: #F54A45;
    }

    &-tip {
      font-size: 12px;
      color: #8F959E;
    }
  }

  &-common-edge {
    margin-bottom: 20px;

    &-inline {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &-common-default {
    height: 32px;
    background-color: #F6F6F6;
    padding: 0 12px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    gap: 8px;
    margin-bottom: 8px;

    span {
      flex: 1;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    svg {
      flex: none;
      cursor: pointer;
      transform: scale(1.2);
    }
  }

  &-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    &-input {
      .el-input__inner {
        padding-right: 66px;
      }

      .el-input__suffix {
        transform: translateY(4px);
        width: 60px !important;
      }
    }

    .el-input {
      flex: auto;
    }

    svg {
      flex: none;
      cursor: pointer;
    }

    &-deitor {
      padding: 0 20px;

      textarea {
        font-size: 16px;
        color: #000c25;
      }
    }

    &-deitor-footer {
      padding: 20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}

.attr-options-wrapper {
  .el-form-item {
    margin-bottom: 12px !important;

    &__error {
      padding-top: 0 !important;
    }
  }
}
</style>
