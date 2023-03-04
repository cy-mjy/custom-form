<template>
  <div v-if="onlyView" class="form-render-common-view" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <div class="form-render-common-view-title">{{ widget.title }}</div>
    <div class="form-render-common-view-content">{{ widget.value.value1 ? `${formatTime(widget.value.value1, formatTimeMap[widget.dateFormat])} ~ ${formatTime(widget.value.value2, formatTimeMap[widget.dateFormat])}` : '-' }}</div>
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
        type="datetimerange"
        :picker-options="po"
        v-model="value"
        size="small"
        :start-placeholder="widget.tips"
        :end-placeholder="widget.tips2"
        value-format="timestamp"
        :format="formatMap[widget.dateFormat]"
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
        this.widget.value = this.widget.default
      }
    },
    data() {
      const validateValue = (rule, value, cb) => {
        const vHub = {
          required: this.widget.isRequired,
        }

        if(vHub.required && value.value1 === null && value.value2 === null) {
          cb(Error('请选择'))
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
    computed: {
      value: {
        get() {
          if(this.widget.value.value1 === null && this.widget.value.value2 === null) {
            return null
          } else {
            return [
              this.widget.value.value1,
              this.widget.value.value2,
            ]
          }
        },
        set(val) {
          if(val === null) {
            this.widget.value.value1 = null
            this.widget.value.value2 = null
          } else {
            this.widget.value.value1 = val[0]
            this.widget.value.value2 = val[1]
          }
        },
      },
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
