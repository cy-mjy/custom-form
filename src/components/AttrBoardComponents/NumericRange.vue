<template>
  <div class="attr-board-container">
    <div class="attr-board-common-title">
      <span class="attr-board-common-title-required">*</span>
      <span>标题</span>
      <span class="attr-board-common-title-tip">不超过20字符</span>
      <el-popover trigger="hover" v-if="titleTip" :content="`系统将该属性作为${titleTip}的${widget.title}，请谨慎修改“标题”`">
        <svg slot="reference" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M8 .667a7.333 7.333 0 1 1 0 14.666A7.333 7.333 0 0 1 8 .667ZM8 10.2a.867.867 0 1 0 0 1.733.867.867 0 0 0 0-1.733ZM8 4a.667.667 0 0 0-.667.667v4a.667.667 0 0 0 1.334 0v-4A.667.667 0 0 0 8 4Z" fill="#F90" fill-rule="nonzero"/></svg>
      </el-popover>
    </div>
    <el-form :model="widget" :rules="rules">
      <el-form-item prop="title">
        <el-input :disabled="readonly || disableAttrs.includes('title')" v-model.trim="widget.title" size="small" :maxLength="20" placeholder="请输入标题" @blur="getTitle(widget)"></el-input>
      </el-form-item>
    </el-form>
    <div class="attr-board-common-title">
      <span class="attr-board-common-title-required">*</span>
      <span>提示文字</span>
      <span class="attr-board-common-title-tip">不超过30字符</span>
    </div>
    <el-form :model="widget">
      <el-form-item
        prop="tips">
        <el-input :disabled="readonly || disableAttrs.includes('tips')" v-model.trim="widget.tips" size="small" :maxLength="30" placeholder="请输入提示文字" @blur="onTipsBlur"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="widget">
      <el-form-item
        prop="tips2">
        <el-input :disabled="readonly || disableAttrs.includes('tips2')" v-model.trim="widget.tips2" size="small" :maxLength="30" placeholder="请输入提示文字" @blur="onTips2Blur"></el-input>
      </el-form-item>
    </el-form>
    <div class="attr-board-common-title">
      <span>描述</span>
      <span class="attr-board-common-title-tip">不超过100字符</span>
    </div>
    <el-input :disabled="readonly || disableAttrs.includes('desc')" v-model="widget.desc" size="small" class="attr-board-common-edge" :autosize="{ minRows: 4, maxRows: 6 }" :maxLength="100" placeholder="请输入" type="textarea" resize="none"></el-input>
    <div class="attr-board-common-edge attr-board-common-edge-inline">
      <span>必填</span>
      <el-switch :disabled="readonly || disableAttrs.includes('isRequired')" v-model="widget.isRequired"></el-switch>
    </div>
    <div class="attr-board-common-edge attr-board-common-edge-inline">
      <span>最大值</span>
      <el-input :disabled="readonly || disableAttrs.includes('max')" @input="onMaxInput" :value="widget.max" size="small" style="width:210px;"></el-input>
    </div>
    <div class="attr-board-common-edge attr-board-common-edge-inline">
      <span>最小值</span>
      <el-input :disabled="readonly || disableAttrs.includes('min')" @input="onMinInput" :value="widget.min" size="small" style="width:210px;"></el-input>
    </div>
    <div class="attr-board-common-edge attr-board-common-edge-inline">
      <span>小数位数</span>
      <el-input :disabled="readonly || disableAttrs.includes('decimalPlace')" @input="onDecimalPlaceInput" :value="widget.decimalPlace" size="small" style="width:210px;"></el-input>
    </div>
    <div class="attr-board-common-title">
      <span>默认值</span>
    </div>
    <div class="attr-board-common-edge attr-board-common-edge-inline">
      <el-input :disabled="readonly || disableAttrs.includes('default')" :value="widget.default.value2" @input="onValue2Input" size="small" style="width:130px;" placeholder="请输入下限"></el-input>
    <span>-</span>
      <el-input :disabled="readonly || disableAttrs.includes('default')" :value="widget.default.value1" @input="onValue1Input" size="small" style="width:130px;" placeholder="请输入上限"></el-input>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      widget: Object,
      widgetFlat: Array,
      titleTip: String,
      readonly: Boolean,
      disableAttrs: Array,
      env: String,
      auth: String,
      getTitle: Function,
    },
    inheritAttrs: false,
    data() {
      const validateTitle = (rule, value, cb) => {
        const titles = this.widgetFlat.map(({ title }) => title)

        if(titles.filter((t) => t === value).length > 1) {
          cb(Error('标题不能重复'))
          return
        }

        cb()
      }


      return {
        unitPlaceholder: this.widget.unitName,
        rules: Object.freeze({
          title: [
            { required: true, message: '请输入标题', trigger: 'change' },
            { validator: validateTitle, trigger: 'change' },
          ],
        }),
      }
    },
    methods: {
      onTipsBlur() {
        if(this.widget.tips === '') {
          this.widget.tips = '请输入'
        }
      },
      onTips2Blur() {
        if(this.widget.tips2 === '') {
          this.widget.tips2 = '请输入'
        }
      },
      onMaxInput(val) {
        if(val === '') {
          this.widget.max = null
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
        let max = val.replace(/[^0-9.]*/g, '')

        if(isNg) {
          max = `-${max}`
        }

        if((+max === 0 || max === '-') && isNg) {
          this.widget.max = '-'
          return
        }

        this.widget.max = max
      },
      onMinInput(val) {
        if(val === '') {
          this.widget.min = null
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

        let min = val.replace(/[^0-9.]*/g, "")

        if(isNg) {
          min = `-${min}`
        }

        if((+min === 0 || min === '-') && isNg) {
          this.widget.min = '-'
          return
        }

        this.widget.min = min
      },
      onDecimalPlaceInput(val) {
        let decimalPlace = +val.replace(/\D/g, '')

        if(decimalPlace > 10) {
          decimalPlace = 10
        }

        this.widget.decimalPlace = decimalPlace

        const maxArr = this.widget.max.toString().split('.')
        if(maxArr[1] && maxArr[1].length > decimalPlace) {
          maxArr[1] = maxArr[1].slice(0, decimalPlace)
          this.widget.max = +maxArr.join('.')
        }

        const minArr = this.widget.min.toString().split('.')
        if(minArr[1] && minArr[1].length > decimalPlace) {
          minArr[1] = minArr[1].slice(0, decimalPlace)
          this.widget.min = +minArr.join('.')
        }
      },
      onValue1Input(val) {
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
        val = val.replace(/[^0-9.]*/g, '')

        if(isNg) {
          val = `-${val}`
        }

        if((+val === 0 || val === '-') && isNg) {
          this.widget.default.value1 = '-'
          return
        }



        this.widget.default.value1 = val
      },
      onValue2Input(val) {
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
        val = val.replace(/[^0-9.]*/g, '')

        if(isNg) {
          val = `-${val}`
        }

        if((+val === 0 || val === '-') && isNg) {
          this.widget.default.value2 = '-'
          return
        }

        this.widget.default.value2 = val
      },
    },
  }
</script>
