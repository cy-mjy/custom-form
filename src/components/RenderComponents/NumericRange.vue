<template>
  <div :class="[{ 'active': isCurrent }]" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <div v-show="canDel" class="design-board-container-item-close" @click.stop="onDel"></div>

    <template v-if="mode === 'pc'">
      <div class="design-board-container-item-common-title">
        <span class="design-board-container-item-common-title-required" v-show="widget.isRequired">*</span>
        <span class="design-board-container-item-common-title-text">{{ widget.title }}</span>
        <i v-if="isType" class="type-icon"></i>
        <i v-else-if="widget.isSystem" class="system-icon"></i>
      </div>

      <div class="design-board-container-numeric-range" style="width:100%;">
        <el-input :placeholder="widget.tips" :value="widget.default.value2" size="small" readonly></el-input>
        <span>-</span>
        <el-input :placeholder="widget.tips2" :value="widget.default.value1" size="small" readonly></el-input>
        <span v-show="widget.unitSign || widget.unitName">{{ widget.unitSign || widget.unitName }}</span>
      </div>
    </template>
    <div v-else class="design-board-container-item-phone design-board-container-item-nr">
      <div class="design-board-container-item-common-title">
        <span class="design-board-container-item-common-title-text">{{ widget.title }}</span>
        <span class="design-board-container-item-common-title-required" v-show="widget.isRequired">*</span>
        <i v-if="isType" class="type-icon"></i>
        <i v-else-if="widget.isSystem" class="system-icon"></i>
      </div>
      <div style="width:200px;">
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;">
          <el-input :placeholder="widget.tips" :value="widget.default.value2" size="small" readonly>
          </el-input>
          <span style="flex:none;" v-show="widget.unitSign || widget.unitName">{{ widget.unitSign || widget.unitName }}</span>
        </div>
        <div style="width:100%;height:1px;border:dashed 1px #DFE3E9;"></div>
        <div style="display:flex;gap:8px;align-items:center;margin-top:6px;">
          <el-input :placeholder="widget.tips2" :value="widget.default.value1" size="small" readonly>
          </el-input>
          <span style="flex:none;" v-show="widget.unitSign || widget.unitName">{{ widget.unitSign || widget.unitName }}</span>
        </div>
      </div>
    </div>

    <div class="design-board-container-item-desc" v-show="widget.desc">{{ widget.desc }}</div>
  </div>
</template>

<script>
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
      needDel: {
        type: Boolean,
        default: false,
      },
      inContainer: {
        type: Boolean,
        default: false,
      },
    },
    inheritAttrs: false,
    methods: {
      onDel() {
        if(!this.canDel) return
        let index = 0
        if(this.widget.isNew) {
          index = this.widgets.findIndex(({ flag }) => flag === this.widget.flag)
        } else {
          index = this.widgets.findIndex(({ id }) => id === this.widget.id)
        }
        this.widgets.splice(index, 1)
        this.$emit('current-change', null)
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
    created() {
      if(typeof this.widget.default === 'string') {
        const value = this.widget.default
        if(value === '' || value === '{}') {
          this.widget.default = {
            value1: null,
            value2: null,
          }
        } else {
          this.widget.default = JSON.parse(value)
        }
      }
      if(typeof this.widget.value === 'string') {
        const value = this.widget.value
        if(value === '' || value === '{}') {
          this.widget.value = {
            value1: null,
            value2: null,
          }
        } else {
          this.widget.value = JSON.parse(value)
        }
      }
    },
  }
</script>

<style lang="scss">
.design-board-container-numeric-range {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #000c25;

  span {
    flex: none;
  }

  .el-input {
    flex: 1;
  }
}
.design-board-container-item-nr {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  .design-board-container-item-common-title-text {
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  > div {
    flex: none;
  }
}
</style>
