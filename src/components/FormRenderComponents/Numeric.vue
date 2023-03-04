<template>
  <div v-if="onlyView" class="form-render-common-view" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <div class="form-render-common-view-title">{{ widget.title }}</div>
    <div class="form-render-common-view-content" style="display:flex;align-items:center;justify-content:space-between;gap:14px;">
      <span>{{ [null, '', undefined].includes(widget.value) ? '-' : widget.value }}</span>
      <span style="flex:none;">{{ widget.unitSign || widget.unitName }}</span>
    </div>
  </div>
  <el-form v-else :model="widget" :rules="rules" ref="Form" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <el-form-item prop="value">
      <div class="form-render-common-title">
        <span class="required" v-show="widget.isRequired">*</span>
        <span>{{ widget.title }}</span>
        <i v-if="isType" class="type-icon"></i>
        <i v-else-if="widget.isSystem" class="system-icon"></i>
      </div>
      <el-input :placeholder="widget.tips" @input="onInput" @blur="onBlur" :value="widget.value" size="small" class="numeric-render-input" style="width:100%;" :disabled="readonly">
        <template slot="suffix">
          <span style="margin-right:12px;">{{ widget.unitSign || widget.unitName }}</span>
          <div class="numeric-render-input-step" v-show="widget.valueAdjuster">
            <div @click="inc(1)" :class="['numeric-render-input-step-item', { 'disable': readonly }]">
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M10.35 7.627c.2.2.2.524 0 .723-.2.2-.525.2-.725 0L6 4.734 2.375 8.35c-.2.2-.525.2-.725 0a.51.51 0 0 1 0-.723L5.638 3.65c.2-.2.524-.2.724 0l3.988 3.977Z" fill="#646A73" fill-rule="evenodd"/></svg>
            </div>
            <div @click="inc(-1)" :class="['numeric-render-input-step-item', { 'disable': readonly }]">
              <svg style="transform:rotate(180deg);" width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M10.35 7.627c.2.2.2.524 0 .723-.2.2-.525.2-.725 0L6 4.734 2.375 8.35c-.2.2-.525.2-.725 0a.51.51 0 0 1 0-.723L5.638 3.65c.2-.2.524-.2.724 0l3.988 3.977Z" fill="#646A73" fill-rule="evenodd"/></svg>
            </div>
          </div>
        </template>
      </el-input>
      <div class="form-render-common-desc" v-show="widget.desc !== ''">{{ widget.desc }}</div>
    </el-form-item>
  </el-form>
</template>

<script>
  import Big from 'big.js'

  export default {
    props: {
      widget: Object,
      isType: Boolean,
      inContainer: Boolean,
      readonly: Boolean,
      onlyView: Boolean,
    },
    inheritAttrs: false,
    created() {
      if(this.widget.value !== '' && this.widget.value !== null) {
        this.widget.value = Big(this.widget.value).toPrecision()
      }
      if(this.widget.default !== '' && this.widget.value !== null) {
        this.widget.default = Big(this.widget.default).toPrecision()
      }
      if(this.widget.value === '' && this.widget.default !== '') {
        this.widget.value = this.widget.default
      }
    },
    data() {
      const validateValue = (rule, value, cb) => {
        const vHub = {
          max: this.widget.max,
          min: this.widget.min,
          required: this.widget.isRequired,
        }

        if(vHub.required && (value === '' || value === null)) {
          cb(Error(this.widget.tips))
          return
        }

        if(value === '-') {
          cb()
          return
        }

        if(value === '' || value === null || isNaN(value)) {
          cb()
          return
        }

        if(Big(value).gt(Big(vHub.max)) || Big(value).lt(Big(vHub.min))) {
          cb(Error('大小不正确'))
          return
        }

        cb()
      }

      return {
        rules: Object.freeze({
          value: [
            {
              validator: validateValue,
              triggor: 'change',
            },
          ],
        }),
      }
    },
    methods: {
      onInput(val) {
        if(this.readonly) return
        if(val[0] === '.') return

        let isNg = false

        if(val[0] === '-') {
          isNg = true
          val = val.slice(1)
        }

        val = val.split('.').slice(0,2).join('.')

        const regStrs = [
          ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
          [`^(\\d+\\.\\d{${this.widget.decimalPlace}}).+`, '$1'], //禁止录入小数点后n位以上
        ]
        regStrs.forEach((rgs) => {
          const reg = new RegExp(rgs[0])
          val = val.replace(reg, rgs[1])
        })

        let value = val.replace(/[^0-9.]*/g, "")

        if(isNg) {
          value = `-${value}`
        }

        if((+value === 0 || value === '-') && isNg) {
          this.widget.value = '-'
          return
        }

        this.widget.value = value
      },
      onBlur() {
        if(this.readonly) return
        if(this.widget.value === '' || this.widget.value === null || isNaN(this.widget.value)) {
          this.widget.value = null
          return
        }

        this.widget.value = Big(this.widget.value).toPrecision()
      },
      inc(forward) {
        if(this.readonly) return
        if(!this.widget.value) return

        let incCount = 1
        let decimal = 0
        switch (this.widget.decimalPlace) {
          case 0:
            incCount = 1
            decimal = 0
            break;
          case 1:
            incCount = 0.1
            decimal = 1
            break;
          case 2:
            incCount = 0.01
            decimal = 2
            break;
          case 3:
            incCount = 0.001
            decimal = 3
            break;
          default:
            incCount = 0.001
            decimal = 3
            break;
        }

        const incStep = incCount * forward

        const value = Big(this.widget.value).plus(Big(incStep))

        const fucks = this.widget.value.toString().split('.')
        if(fucks[1] !== undefined) {
          decimal = fucks[1].length > decimal ? fucks[1].length : decimal
        }

        this.widget.value = Big(value).toFixed(decimal)
      },
      getValue() {
        let value = null
        this.$refs.Form.validate((valid) => {
          if(!valid) {
            value =  false
            return
          }
          value =  {
            id: this.widget.id,
            value: this.widget.value,
          }
        })
        return value
      },
    },
  }
</script>

<style lang="scss">
.numeric-render-input {
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

      &.disable {
        opacity: .5;
        cursor: not-allowed;
      }
    }
  }
}
</style>
