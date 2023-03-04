<template>
  <div v-if="onlyView" class="form-render-common-view" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <div class="form-render-common-view-title">{{ widget.title }}</div>
    <div class="form-render-common-view-content">{{ widget.value.join('、') || '-' }}</div>
  </div>
  <el-form v-else :model="widget" :rules="rules" ref="Form" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <el-form-item prop="value">
      <div class="form-render-common-title">
        <span class="required" v-show="widget.isRequired">*</span>
        <span>{{ widget.title }}</span>
        <i v-if="isType" class="type-icon"></i>
        <i v-else-if="widget.isSystem" class="system-icon"></i>
      </div>
      <el-checkbox-group v-if="widget.layout === 0" v-model="widget.value" :disabled="readonly">
        <el-checkbox v-for="(o, i) of widget.options" :key="i" :label="o.content">{{ o.content }}</el-checkbox>
      </el-checkbox-group>
      <el-select v-else v-model="widget.value" size="small" style="width:100%;" multiple :disabled="readonly">
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
          this.widget.value = []
        } else {
          this.widget.value = JSON.parse(value)
        }
      }

      const defaultVal = this.widget.options.filter((o) => o.isDefault)
      if(this.widget.value.length === 0 && defaultVal.length > 0) {
        this.widget.value = defaultVal.map((o) => o.content)
      }
    },
    data() {
      const validateValue = (rule, value, cb) => {
        const vHub = {
          required: this.widget.isRequired,
        }

        if(vHub.required && value.length === 0) {
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
