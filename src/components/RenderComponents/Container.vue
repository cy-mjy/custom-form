<template>
  <div :class="[{ 'active': isCurrent }]">
    <div v-show="canDel" class="design-board-container-item-close" @click.stop="onDel"></div>
    <div
      :class="['design-board-container-item-container', `sc${widget.style}`, mode === 'pc' ? 'pc' : 'phone']"
      :style="{ 'min-height': mode === 'pc' ? [3,4].includes(widget.style) ? '150px' : '65px' : '' }"
    >
      <ContainerItem
        v-for="(wi, i) of ws"
        :key="i"
        :index="i"
        :widget="wi"
        :real="widget"
        :currentWidget="currentWidget"
        :class="[`s${i}`, 'design-board-container-item-container-item']"
        :mode="mode"
        :isType="isType"
        :disabled="disabled"
        :needDel="needDel"
        :isBatch="isBatch"
        :gName="gName"
        :getWidgetTitle="getWidgetTitle"
        @current-change="changeCurrentWidget"
      />
    </div>
  </div>
</template>

<script>
  import ContainerItem from './ContainerItem.vue'

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
      ContainerItem,
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
      changeCurrentWidget(widget) {
        this.$emit('current-change', widget)
      },
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
.design-board-container-item-container {
  &.pc {
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

  &.phone {
    .design-board-container-item-container-item {
      border-width: 1px;
      border-color: #ffffff;

      &:not(:last-child) {
        border-bottom-color: #DFE3E9;
      }
    }
  }
}
</style>
