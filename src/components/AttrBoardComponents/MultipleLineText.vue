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
        prop="tips"
        :rules="{
          required: true, message: '请输入提示文字', trigger: 'change'
        }"
      >
        <el-input :disabled="readonly || disableAttrs.includes('tips')" v-model.trim="widget.tips" size="small" :maxLength="30" placeholder="请输入提示文字" @blur="onTipsBlur"></el-input>
      </el-form-item>
    </el-form>
    <div class="attr-board-common-title">
      <span>描述</span>
      <span class="attr-board-common-title-tip">不超过100字符</span>
    </div>
    <el-input :disabled="readonly || disableAttrs.includes('desc')" v-model="widget.desc" size="small" class="attr-board-common-edge" :autosize="{ minRows: 4, maxRows: 6 }" :maxLength="100" placeholder="请输入" type="textarea" resize="none"></el-input>
    <div class="attr-board-common-edge attr-board-common-edge-inline">
      <span>必填</span>
      <el-switch :disabled="readonly || disableAttrs.includes('isRequired')" v-model="widget.isRequired" @change="onRequiredChange"></el-switch>
    </div>
    <div class="attr-board-common-edge attr-board-common-edge-inline">
      <span>最大长度</span>
      <el-input :disabled="readonly || disableAttrs.includes('maxLength')" @input="onMaxLengthInput" @blur="onMaxLengthBlur" :value="widget.maxLength" size="small" style="width:210px;"></el-input>
    </div>
    <div class="attr-board-common-edge attr-board-common-edge-inline">
      <span>最小长度</span>
      <el-input :disabled="readonly || !widget.isRequired || disableAttrs.includes('minLength')" @input="onMinLengthInput" @blur="onMinLengthBlur" :value="widget.minLength" size="small" style="width:210px;"></el-input>
    </div>
    <div class="attr-board-common-title">
      <span>默认值</span>
    </div>
    <el-form :model="widget" :rules="rules" ref="form">
      <el-form-item prop="default">
        <el-input :disabled="readonly || disableAttrs.includes('default')" @blur="onDefaultBlur" v-model="widget.default" size="small" placeholder="请输入" type="textarea" :rows="4" resize="none"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      widget: Object,
      readonly: Boolean,
      titleTip: String,
      disableAttrs: Array,
      getTitle: Function,
      widgetFlat: Array,
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

      const validateDefault = (rule, value, cb) => {
        const length = this.widget.default.length
        if(length > this.widget.maxLength || length < this.widget.minLength) {
          cb(Error('长度不符'))
          return
        }

        cb()
      }

      return {
        rules: Object.freeze({
          title: [
            { required: true, message: '请输入标题', trigger: 'change' },
            { validator: validateTitle, trigger: 'change' },
          ],
          default: [
            { validator: validateDefault, trigger: 'change' },
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
      onMaxLengthInput(val) {
        let maxLength = val.replace(/\D/g, '')

        this.widget.maxLength = maxLength
      },
      onMaxLengthBlur() {
        let maxLength = +this.widget.maxLength

        if(maxLength > 500) {
          maxLength = 500
        }

        if(maxLength < this.widget.minLength) {
          maxLength = this.widget.minLength
        }

        if(this.widget.default.length > maxLength) {
          this.widget.default = ''
        }

        this.widget.maxLength = maxLength
      },
      onMinLengthInput(val) {
        let minLength = +val.replace(/\D/g, '')

        if(minLength > this.widget.maxLength) {
          minLength = this.widget.maxLength
        }

        if(this.widget.default.length < minLength) {
          this.widget.default = ''
        }

        this.widget.minLength = minLength
      },
      onMinLengthBlur() {
        if(this.widget.isRequired && this.widget.minLength === 0) {
          this.widget.minLength = 1
        }
      },
      async onDefaultBlur() {
        const length = this.widget.default.length

        if(length > this.widget.maxLength || length < this.widget.minLength) {
          this.widget.default = ''
        }

        await this.$nextTick()
        this.$refs.form.clearValidate()
      },
      onRequiredChange(val) {
        if(!val) {
          this.widget.minLength = 0
        } else {
          if(this.widget.minLength < 1) {
            this.widget.minLength = 1
          }

          if(this.widget.maxLength < this.widget.minLength) {
            this.widget.maxLength = this.widget.minLength
          }
        }
      },
    },
  }
</script>
