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

      <el-date-picker
        size="small"
        type="daterange"
        :value="date"
        :format="formatMap[widget.dateFormat]"
        :start-placeholder="widget.tips"
        :end-placeholder="widget.tips2"
        readonly
        style="width:100%;"
      ></el-date-picker>
    </template>
    <div v-else class="design-board-container-item-phone design-board-container-item-dtr">
      <div class="design-board-container-item-common-title">
        <span class="design-board-container-item-common-title-text">{{ widget.title }}</span>
        <span class="design-board-container-item-common-title-required" v-show="widget.isRequired">*</span>
        <i v-if="isType" class="type-icon"></i>
        <i v-else-if="widget.isSystem" class="system-icon"></i>
      </div>
      <div style="width:200px;">
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;">
          <el-date-picker size="small" readonly :value="date1" style="width:100%;" :format="formatMap[widget.dateFormat]" :placeholder="widget.tips">
          </el-date-picker>
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M4.866 2.2a.685.685 0 0 0 0 .967L9.687 8l-4.82 4.833a.685.685 0 0 0 0 .967.68.68 0 0 0 .964 0l5.303-5.317a.685.685 0 0 0 0-.966L5.83 2.2a.68.68 0 0 0-.965 0Z" fill="#646A73" fill-rule="evenodd"/></svg>
        </div>
        <div style="width:100%;height:1px;border:dashed 1px #DFE3E9;"></div>
        <div style="display:flex;gap:8px;align-items:center;margin-top:6px;">
          <el-date-picker size="small" readonly :value="date2" style="width:100%;" :format="formatMap[widget.dateFormat]" :placeholder="widget.tips2">
          </el-date-picker>
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M4.866 2.2a.685.685 0 0 0 0 .967L9.687 8l-4.82 4.833a.685.685 0 0 0 0 .967.68.68 0 0 0 .964 0l5.303-5.317a.685.685 0 0 0 0-.966L5.83 2.2a.68.68 0 0 0-.965 0Z" fill="#646A73" fill-rule="evenodd"/></svg>
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
    data() {
      return {
        formatMap: Object.freeze({
          '1': 'yyyy',
          '2': 'yyyy-MM',
          '3': 'yyyy-MM-dd',
          '4': 'yyyy-MM-dd HH',
          '5': 'yyyy-MM-dd HH:mm',
        }),
      }
    },
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
      date() {
        if(this.widget.default.value1 === null && this.widget.default.value2 === null) {
          return null
        }

        return [this.widget.default.value1, this.widget.default.value2]
      },
      date1() {
        return this.widget.default.value1
      },
      date2() {
        return this.widget.default.value2
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
.design-board-container-item-dtr {
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

  .el-input__suffix, .el-input__prefix {
    display: none;
  }

  span, svg {
    flex: none;
  }
}
</style>
