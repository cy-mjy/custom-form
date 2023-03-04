<template>
  <div v-if="onlyView" class="form-render-common-view" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <div class="form-render-common-view-title">{{ widget.title }}</div>
    <div class="form-render-common-view-content">{{ value.join('/') || '-' }}</div>
  </div>
  <el-form v-else :model="widget" :rules="rules" ref="Form" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <el-form-item prop="value">
      <div class="form-render-common-title">
        <span class="required" v-show="widget.isRequired">*</span>
        <span>{{ widget.title }}</span>
        <i v-if="isType" class="type-icon"></i>
        <i v-else-if="widget.isSystem" class="system-icon"></i>
      </div>
      <el-cascader :value="value" @change="onChange" :disabled="readonly" size="small" style="width:100%;" :options="options" :placeholder="widget.tips" clearable></el-cascader>
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
          this.widget.value = {
            value1: null,
            value2: null,
          }
        } else {
          this.widget.value = JSON.parse(value)
        }
      }

      const options = this.widget.options.map((o) => o.subOptions).flat()
      const defaultVal = options.find((o) => o.isDefault)
      if((this.widget.value.value1 === null && this.widget.value.value2 === null) && defaultVal) {
        this.widget.value = {
          value1: this.widget.options.find((o) => o.subOptions.includes(defaultVal)).content,
          value2: defaultVal.content,
        }
      }
    },
    data() {
      const validateValue = (rule, value, cb) => {
        const vHub = {
          required: this.widget.isRequired,
        }

        if(vHub.required && value.value1 === null && value.value2 === null) {
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
    inheritAttrs: false,
    methods: {
      onChange(val) {
        this.widget.value.value1 = val[0] || null
        this.widget.value.value2 = val[1] || null
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
    computed: {
      options() {
        return this.widget.options.map((o) => {
          return {
            label: o.content,
            value: o.content,
            children: o.subOptions.map((so) => {
              return {
                label: so.content,
                value: so.content,
              }
            })
          }
        })
      },
      value() {
        if(this.widget.value.value1 === null && this.widget.value.value2 === null) {
          return []
        } else {
          return [
            this.widget.value.value1,
            this.widget.value.value2,
          ]
        }
      },
    },
  }
</script>
