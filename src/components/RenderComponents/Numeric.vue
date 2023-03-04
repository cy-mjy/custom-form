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

      <el-input :placeholder="widget.tips" :value="widget.default" size="small" readonly class="numeric-input" style="width:100%;">
        <template slot="suffix">
          <span style="margin-right:12px;">{{ widget.unitSign || widget.unitName }}</span>
          <div class="numeric-input-step" v-show="widget.valueAdjuster">
            <div :class="['numeric-input-step-item', { 'disabled': widget.default === widget.maxLength }]">
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M10.35 7.627c.2.2.2.524 0 .723-.2.2-.525.2-.725 0L6 4.734 2.375 8.35c-.2.2-.525.2-.725 0a.51.51 0 0 1 0-.723L5.638 3.65c.2-.2.524-.2.724 0l3.988 3.977Z" fill="#646A73" fill-rule="evenodd"/></svg>
            </div>
            <div :class="['numeric-input-step-item', { 'disabled': widget.default === widget.minLength }]">
              <svg style="transform:rotate(180deg);" width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M10.35 7.627c.2.2.2.524 0 .723-.2.2-.525.2-.725 0L6 4.734 2.375 8.35c-.2.2-.525.2-.725 0a.51.51 0 0 1 0-.723L5.638 3.65c.2-.2.524-.2.724 0l3.988 3.977Z" fill="#646A73" fill-rule="evenodd"/></svg>
            </div>
          </div>
        </template>
      </el-input>
    </template>

    <div v-else class="design-board-container-item-phone design-board-container-item-num">
      <span class="design-board-container-item-common-title-text">{{ widget.title }}</span>
      <span class="design-board-container-item-common-title-required" v-show="widget.isRequired">*</span>
      <i v-if="isType" class="type-icon"></i>
      <i v-else-if="widget.isSystem" class="system-icon"></i>
      <div style="flex:auto;"></div>
      <div style="display:flex;align-items:center;">
        <svg style="flex:none;" v-show="widget.valueAdjuster" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 .833a9.167 9.167 0 1 1 0 18.334A9.167 9.167 0 0 1 10 .833ZM10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm3.333 6.667a.833.833 0 1 1 0 1.666H6.667a.833.833 0 1 1 0-1.666h6.666Z" fill="#646A73" fill-rule="nonzero"/></svg>
        <el-input :placeholder="widget.tips" :value="widget.default" size="small" readonly style="width:80px;margin:0 6px;"></el-input>
        <svg style="flex:none;" v-show="widget.valueAdjuster" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 .833a9.167 9.167 0 1 1 0 18.334A9.167 9.167 0 0 1 10 .833ZM10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15ZM10 5c.46 0 .833.373.833.833v3.333h3.334a.833.833 0 1 1 0 1.667h-3.334v3.334a.833.833 0 1 1-1.666 0l-.001-3.334H5.833a.833.833 0 1 1 0-1.666l3.333-.001V5.833c0-.46.374-.833.834-.833Z" fill="#646A73" fill-rule="nonzero"/></svg>
      </div>
      <span v-show="widget.unitSign || widget.unitName">{{ widget.unitSign || widget.unitName }}</span>
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
    created() {
      if(this.widget.value !== '') {
        this.widget.value = +this.widget.value
      }
      if(this.widget.default !== '') {
        this.widget.default = +this.widget.default
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
.numeric-input {
  overflow: hidden;

  .el-input__suffix {
    right: 1px;
  }

  .el-input__suffix-inner {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000c25;
  }

  &-step {
    width: 32px;
    height: 30px;
    background-color: #F6F6F6;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #DFE3E9;

    &-item {
      &:first-child {
        border-bottom: 1px solid #DFE3E9;
      }

      box-sizing: border-box;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &.disabled {
        cursor: not-allowed;
        opacity: .5;
      }
    }
  }
}
.design-board-container-item-num {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  gap: 8px;

  .design-board-container-item-common-title-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  input {
    text-align: center !important;
  }

  span {
    flex: none;
  }
}
</style>
