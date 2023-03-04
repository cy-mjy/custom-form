<template>
  <div v-if="onlyView" class="form-render-common-view" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <div class="form-render-common-view-title">{{ widget.title }}</div>
    <div class="form-render-common-view-content">{{ widget.value || '-' }}</div>
  </div>
  <el-form v-else :model="widget" :rules="rules" ref="Form" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <el-form-item prop="value">
      <div class="form-render-common-title">
        <span class="required" v-show="widget.isRequired">*</span>
        <span>{{ widget.title }}</span>
        <i v-if="isType" class="type-icon"></i>
        <i v-else-if="widget.isSystem" class="system-icon"></i>
      </div>
      <el-input v-model.trim="widget.value" size="small" clearable :placeholder="widget.tips" style="width:100%;" :disabled="(isBatch && widget.widgetType === 14) || readonly"></el-input>
      <div class="form-render-common-desc" v-show="widget.desc !== ''">{{ widget.desc }}</div>
    </el-form-item>
  </el-form>
</template>

<script>
  const regexps = {
    /**
     * 手机号
     */
    '1': /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
    /**
     * 邮箱
     */
    '2': /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    /**
     * 网址
     */
    '3': /(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/,
    /**
     * 身份证
     */
    '4': /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  }

  export default {
    props: {
      widget: Object,
      isType: Boolean,
      isBatch: Boolean,
      inContainer: Boolean,
      readonly: Boolean,
      onlyView: Boolean,
    },
    inheritAttrs: false,
    created() {
      if(!this.widget.isRequired) {
        this.widget.minLength = 0
      } else if(this.widget.maxLength < 1) {
        this.widget.maxLength = 1
      }
      if(!this.widget.value && this.widget.default) {
        this.widget.value = this.widget.default
      }
    },
    data() {
      const validateValue = (rule, value, cb) => {
        if(this.readonly) {
          cb()
          return
        }

        if(this.isBatch && this.widget.widgetType === 14) {
          cb()
          return
        }

        const vHub = {
          max: this.widget.maxLength,
          min: this.widget.minLength,
          type: this.widget.valueFormat,
          required: this.widget.isRequired,
        }

        if(vHub.required === false) {
          cb()
          return
        }

        if(vHub.required && value === '') {
          cb(Error(this.widget.tips))
          return
        }

        if(vHub.type !== 0) {
          if(!regexps[vHub.type].test(value)) {
            cb(Error('格式不正确'))
            return
          }
        }

        if(![1,4].includes(vHub.type)) {
          const len = value.length
          if(len > vHub.max || len < vHub.min) {
            cb(Error('长度不正确'))
            return
          }
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
