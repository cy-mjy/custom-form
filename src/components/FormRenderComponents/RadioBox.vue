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
      <el-radio-group v-if="widget.layout === 0" :value="widget.value" :disabled="readonly">
        <el-radio v-for="(o, i) of widget.options" :key="i" :label="o.content">{{ o.content }}</el-radio>
      </el-radio-group>
      <el-select v-else :value="widget.value" size="small" style="width:100%;" :disabled="readonly">
        <el-option v-for="(o, i) of widget.options" :key="i" :label="o.content" :value="o.content">{{ o.content }}</el-option>
      </el-select>
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
      if(typeof this.widget.value === 'string') {
        const value = this.widget.value
        if(value === '' || value === '{}') {
          this.widget.value = null
        }
      }

      const defaultVal = this.widget.options.find((o) => o.isDefault)
      if(this.widget.value === null && defaultVal) {
        this.widget.value = defaultVal.content
      }
    },
    data() {
      const validateValue = (rule, value, cb) => {
        const vHub = {
          required: this.widget.isRequired,
        }

        if(vHub.required && value === null) {
          cb(Error(this.widget.tips))
          return
        }

        cb()
      }

      return {
        rules: Object.freeze({
          value: [
            {
              validator: validateValue,
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
