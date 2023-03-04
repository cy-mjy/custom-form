<template>
  <div v-if="onlyView" class="form-render-common-view" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <div class="form-render-common-view-title">{{ widget.title }}</div>
    <div class="form-render-common-view-content" style="display:flex;align-items:center;justify-content:space-between;gap:14px;">
      <div style="display:flex;align-items:center;gap:14px;">
        <span style="flex:none;">{{ [null, '', undefined].includes(widget.value.value1) ? '-' : widget.value.value1 }}</span>
        <span>~</span>
        <span style="flex:none;">{{ [null, '', undefined].includes(widget.value.value2) ? '-' : widget.value.value2 }}</span>
      </div>
      <span style="flex:none;">{{ widget.unitSign || widget.unitName }}</span>
    </div>
  </div>
  <el-form v-else :model="widget" :rules="rules" ref="Form" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <div class="form-render-common-title">
      <span class="required" v-show="widget.isRequired">*</span>
      <span>{{ widget.title }}</span>
      <i v-if="isType" class="type-icon"></i>
      <i v-else-if="widget.isSystem" class="system-icon"></i>
    </div>
    <div class="form-render-numrange" style="width:100%;">
      <el-form-item prop="value2">
        <el-input :disabled="readonly" :placeholder="widget.tips" :value="widget.value.value2" size="small" @input="onValue2Input" @blur="onValue2Blur"></el-input>
      </el-form-item>
      <span>-</span>
      <el-form-item prop="value1">
        <el-input :disabled="readonly" :placeholder="widget.tips2" :value="widget.value.value1" size="small" @input="onValue1Input" @blur="onValue1Blur"></el-input>
      </el-form-item>
      <span v-show="widget.unitSign">{{ widget.unitSign || widget.unitName }}</span>
    </div>
    <div class="form-render-common-desc" v-show="widget.desc !== ''">{{ widget.desc }}</div>
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

      if(this.widget.value.value1 === null && this.widget.default.value1 !== null) {
        this.widget.value.value1 = Big(this.widget.default.value1).toPrecision()
      }
      if(this.widget.value.value2 === null && this.widget.default.value2 !== null) {
        this.widget.value.value2 = Big(this.widget.default.value2).toPrecision()
      }
    },
    data() {
      const validateValue1 = (rule, value, cb) => {
        const vHub = {
          max: this.widget.max,
          min: this.widget.min,
          required: this.widget.isRequired,
        }

        if(vHub.required && (value === '' || value === null)) {
          cb(Error(this.widget.tips))
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

      const validateValue2 = (rule, value, cb) => {
        const vHub = {
          max: this.widget.max,
          min: this.widget.min,
          required: this.widget.isRequired,
        }

        if(vHub.required && (value === '' || value === null)) {
          cb(Error(this.widget.tips2))
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
          value1: [
            {
              validator: validateValue1,
              triggor: 'change',
            },
          ],
          value2: [
            {
              validator: validateValue2,
              triggor: 'change',
            },
          ],
        }),
      }
    },
    methods: {
      onValue1Input(val) {
        if(this.readonly) return
        if(val === '') {
          this.widget.value.value1 = null
          return
        }

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

        val = val.replace(/[^0-9.]*/g, "")

        if(isNg) {
          val = `-${val}`
        }

        if((+val === 0 || val === '-') && isNg) {
          this.widget.value.value1 = '-'
          return
        }

        if(this.widget.value.value2 !== null && this.widget.value.value2 !== '' && Big(this.widget.value.value2).gt(Big(val))) {
          val = this.widget.value.value2
        }

        this.widget.value.value1 = val
      },
      onValue1Blur() {
        if(this.readonly) return
        if(this.widget.value.value1 === '' || this.widget.value.value1 === null || isNaN(this.widget.value.value1)) {
          this.widget.value.value1 = null
          return
        }

        this.widget.value.value1 = Big(this.widget.value.value1).toPrecision()
      },
      onValue2Input(val) {
        if(this.readonly) return
        if(val === '') {
          this.widget.value.value2 = null
          return
        }

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

        val = val.replace(/[^0-9.]*/g, "")

        if(isNg) {
          val = `-${val}`
        }

        if((+val === 0 || val === '-') && isNg) {
          this.widget.value.value2 = '-'
          return
        }

        if(this.widget.value.value1 !== null && this.widget.value.value1 !== '' && Big(this.widget.value.value1).lt(Big(val))) {
          val = this.widget.value.value1
        }

        this.widget.value.value2 = val
      },
      onValue2Blur() {
        if(this.readonly) return
        if(this.widget.value.value2 === '' || this.widget.value.value2 === null || isNaN(this.widget.value.value2)) {
          this.widget.value.value2 = null
          return
        }

        this.widget.value.value2 = Big(this.widget.value.value2).toPrecision()
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
.form-render-numrange {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #000c25;

  .el-form-item {
    flex: 1;
  }

  > span {
    flex: none;
    transform: translateY(-12px);
  }
}
</style>
