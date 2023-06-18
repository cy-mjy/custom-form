<template>
  <div v-if="onlyView" class="form-render-common-view" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <div class="form-render-common-view-title">{{ widget.title }}</div>
    <div class="form-render-common-view-content" style="min-height:80px;">{{ widget.value || '-' }}</div>
  </div>
  <el-form v-else :model="widget" :rules="rules" ref="Form" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <el-form-item prop="value">
      <div class="form-render-common-title">
        <span class="required" v-show="widget.isRequired">*</span>
        <span>{{ widget.title }}</span>
        <i v-if="isType" class="type-icon"></i>
        <i v-else-if="widget.isSystem" class="system-icon"></i>
      </div>
      <el-input :disabled="readonly" v-model="widget.value" size="small" :placeholder="widget.tips" type="textarea" resize="none" :rows="4" style="width:100%;"></el-input>
      <div class="form-render-common-desc" v-show="widget.desc !== ''">{{ widget.desc }}</div>
    </el-form-item>
  </el-form>
</template>

<script>
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

        const vHub = {
          max: this.widget.maxLength,
          min: this.widget.minLength,
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

        const len = value.length
        if(len > vHub.max || len < vHub.min) {
          cb(Error('长度不正确'))
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
