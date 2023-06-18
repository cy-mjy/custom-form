<template>
  <div v-if="onlyView" class="form-render-common-view" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <div class="form-render-common-view-title">{{ widget.title }}</div>
    <div class="form-render-common-view-content">{{ widget.value ? formatTime(widget.value, formatTimeMap[widget.dateFormat]) : '-' }}</div>
  </div>
  <el-form v-else :model="widget" :rules="rules" ref="Form" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <el-form-item prop="value">
      <div class="form-render-common-title">
        <span class="required" v-show="widget.isRequired">*</span>
        <span>{{ widget.title }}</span>
        <i v-if="isType" class="type-icon"></i>
        <i v-else-if="widget.isSystem" class="system-icon"></i>
      </div>
      <el-date-picker
        :disabled="readonly"
        type="datetime"
        size="small"
        value-format="timestamp"
        v-model="widget.value"
        :placeholder="widget.tips"
        :format="formatMap[widget.dateFormat]"
        :picker-options="po"
        style="width:100%;"
      ></el-date-picker>
      <div class="form-render-common-desc" v-show="widget.desc !== ''">{{ widget.desc }}</div>
    </el-form-item>
  </el-form>
</template>

<script>
  import { formatTime } from '../../utils'

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
      if(this.widget.value !== '') {
        this.widget.value = +this.widget.value
      }
      if(this.widget.default !== '') {
        this.widget.default = +this.widget.default
      }
      if(!this.widget.value && this.widget.default) {
        this.widget.value = this.widget.default
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

      const _vm = this

      return {
        rules: Object.freeze({
          value: [
            {
              validator: validateValue,
              triggor: 'change',
            },
          ],
        }),
        formatMap: Object.freeze({
          '1': 'yyyy',
          '2': 'yyyy-MM',
          '3': 'yyyy-MM-dd',
          '4': 'yyyy-MM-dd HH',
          '5': 'yyyy-MM-dd HH:mm',
        }),
        formatTimeMap: Object.freeze({
          '1': 'YYYY',
          '2': 'YYYY-MM',
          '3': 'YYYY-MM-DD',
          '4': 'YYYY-MM-DD HH',
          '5': 'YYYY-MM-DD HH:mm',
        }),
        po: {
          disabledDate(time) {
            if(_vm.widget.commitLimit) {
              return time.getTime() < Date.now()
            } else {
              return false
            }
          },
        },
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
      formatTime,
    },
  }
</script>
