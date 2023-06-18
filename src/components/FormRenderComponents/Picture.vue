<template>
  <div v-if="onlyView" class="form-render-common-view" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <div class="form-render-common-view-title">{{ widget.title }}</div>
    <div class="form-render-common-view-content rcfile" style="padding:12px;" v-for="f of widget.value" :key="f.address">
      <img :src="f.address">
      <span style="flex:auto;">{{ f.fileName }}</span>
      <span class="dlbtn">下载</span>
    </div>
  </div>
  <el-form v-else :model="widget" :rules="rules" ref="Form">
    <el-form-item prop="value">
      <div class="form-render-common-title">
        <span class="required" v-show="widget.isRequired">*</span>
        <span>{{ widget.title }}</span>
        <i v-if="isType" class="type-icon"></i>
        <i v-else-if="widget.isSystem" class="system-icon"></i>
      </div>
      <el-button size="small" @click="applyUpload" style="border-color:#0b58d2;" :style="{'opacity': readonly ? 0.5 : 1 }" :disabled="readonly">
        <div style="color:#0b58d2;display:flex;align-items:center;">
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M13.333 1.333a2 2 0 0 1 2 2v9.334a2 2 0 0 1-2 2H2.667a2 2 0 0 1-2-2V3.333a2 2 0 0 1 2-2Zm-1.1 7.59-3.018 2.72-.02.017c-.545.44-1.33.38-1.804-.117l-.072-.083-1.2-1.485-3.95 3.135c.122.137.3.223.498.223h10.666a.667.667 0 0 0 .667-.666v-1.935l-1.767-1.808Zm1.1-6.256H2.667A.667.667 0 0 0 2 3.333v8.21L5.29 8.93a1.333 1.333 0 0 1 1.794.125l.072.082 1.2 1.486 2.984-2.69a1.333 1.333 0 0 1 1.765-.018l.081.077.814.833V3.333a.667.667 0 0 0-.568-.66l-.099-.006ZM5.333 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 1.333a.667.667 0 1 0 0 1.334.667.667 0 0 0 0-1.334Z" fill="currentColor"/></svg>
          <span style="margin-left:8px;">{{ widget.buttonText }}</span>
        </div>
      </el-button>
      <input type="file" multiple style="display:none;" ref="UPLOAD" @change="onChange" accept=".jpg,.png,.jpeg">
      <div class="form-render-attachment" v-for="(a, i) of widget.value" :key="i">
        <img :src="a.address">
        <span>{{ a.fileName }}</span>
        <svg @click="rm(i)" width="16" height="16" viewBox="0 0 32 32" style="cursor:pointer;"><path fill="#636a73" d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"/></svg>
      </div>
      <div class="form-render-common-desc" v-show="widget.desc !== ''">{{ widget.desc }}</div>
    </el-form-item>
  </el-form>
</template>

<script>

  export default {
    props: {
      widget: Object,
      auth: String,
      env: String,
      isType: Boolean,
      inContainer: Boolean,
      readonly: Boolean,
      onlyView: Boolean,
    },
    inheritAttrs: false,
    created() {
      if(typeof this.widget.default === 'string') {
        const value = this.widget.default
        if(value === '') {
          this.widget.default = []
        } else {
          this.widget.default = JSON.parse(value)
        }
      }
      if(typeof this.widget.value === 'string') {
        const value = this.widget.value
        if(value === '') {
          this.widget.value = []
        } else {
          this.widget.value = JSON.parse(value)
        }
      }
    },
    data() {
      const validateValue = (rule, value, cb) => {
        const vHub = {
          required: this.widget.isRequired,
        }

        if(vHub.required && value.length === 0) {
          cb(Error('请选择'))
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
      rm(index) {
        if(this.readonly) return

        this.widget.value.splice(index, 1)
        this.$refs.Form.validate()
      },
      applyUpload() {
        this.$refs.UPLOAD.click()
      },
      onChange(e) {
        /**
         * @type { File[] }
         */

        e.target.value = null
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
