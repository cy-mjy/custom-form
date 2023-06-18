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
    <div class="attr-board-common-title">
      <span>日期类型</span>
    </div>
    <el-select :disabled="readonly || disableAttrs.includes('dateFormat')" v-model="widget.dateFormat" @change="onDateFormatChange" size="small" style="width:100%;" class="attr-board-common-edge">
      <el-option v-for="f of formats" :key="f.value" :value="f.value" :label="f.label"></el-option>
    </el-select>
    <div class="attr-board-common-edge attr-board-common-edge-inline">
      <span>日期限制<span class="attr-board-common-title-tip" style="margin-left:8px;">所选时间不得早于当前时间</span></span>
      <el-switch :disabled="readonly || disableAttrs.includes('commitLimit')" v-model="widget.commitLimit" @change="onLimitChange"></el-switch>
    </div>
    <div class="attr-board-common-edge attr-board-common-edge-inline">
      <span>必填</span>
      <el-switch :disabled="readonly || disableAttrs.includes('isRequired')" v-model="widget.isRequired"></el-switch>
    </div>
    <div class="attr-board-common-title">
      <span>默认值</span>
    </div>
    <el-date-picker
            v-model="widget.default"
            size="small"
            align="right"
            type="datetime"
            placeholder="请选择"
            class="attr-board-common-edge"
            style="width:100%;"
            :format="formatMap[widget.dateFormat]"
            value-format="timestamp"
            :pickerOptions="pickerOptions"
            :disabled="readonly || disableAttrs.includes('default')"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    widget: Object,
    widgetFlat: Array,
    readonly: Boolean,
    titleTip: String,
    disableAttrs: Array,
    getTitle: Function,
    widgetFlat: Array,
  },
  inheritAttrs: false,
  data() {
    const _vm = this

    const validateTitle = (rule, value, cb) => {
      const titles = this.widgetFlat.map(({ title }) => title)

      if(titles.filter((t) => t === value).length > 1) {
        cb(Error('标题不能重复'))
        return
      }

      cb()
    }

    return {
      formats: Object.freeze([
        {
          value: 1,
          label: '年',
        },
        {
          value: 2,
          label: '年-月',
        },
        {
          value: 3,
          label: '年-月-日',
        },
        {
          value: 4,
          label: '年-月-日 时',
        },
        {
          value: 5,
          label: '年-月-日 时:分',
        },
      ]),
      formatMap: Object.freeze({
        '1': 'yyyy',
        '2': 'yyyy-MM',
        '3': 'yyyy-MM-dd',
        '4': 'yyyy-MM-dd HH',
        '5': 'yyyy-MM-dd HH:mm',
      }),
      pickerOptions: {
        disabledDate(time) {
          if(_vm.widget.commitLimit) {
            return time.getTime() < Date.now()
          } else {
            return false
          }
        },
      },
      rules: Object.freeze({
        title: [
          { required: true, message: '请输入标题', trigger: 'change' },
          { validator: validateTitle, trigger: 'change' },
        ],
      }),
    }
  },
  methods: {
    onLimitChange(value) {
      if(value && this.widget.default && this.widget.default < +Date.now()) {
        this.widget.default = ''
      }
    },
    onDateFormatChange() {
      this.widget.default = ''
    },
    onTipsBlur() {
      if(this.widget.tips === '') {
        this.widget.tips = '请选择'
      }
    },
  },
}
</script>

