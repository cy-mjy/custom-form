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
      <span>排列方式</span>
    </div>
    <div class="attr-board-common-edge attr-board-common-edge-inline" style="justify-content:flex-start;">
      <el-radio :disabled="readonly" v-model="widget.layout" :label="0">平铺</el-radio>
      <el-radio :disabled="readonly" v-model="widget.layout" :label="1">收起</el-radio>
    </div>
    <div class="attr-board-common-title">
      <span class="attr-board-common-title-required">*</span>
      <span>选项</span>
      <span class="attr-board-common-title-tip">最多200项，每项不超过50字符</span>
    </div>
    <div style="max-height:620px;overflow:auto;" class="attr-options-wrapper">
      <el-form v-for="(o, i) of widget.options" :key="i" :model="o" :rules="rules">
        <el-form-item prop="content">
          <div class="attr-board-option">
            <el-input :disabled="readonly || disableAttrs.includes('options')" v-model.trim="o.content" size="small" class="attr-board-option-input" :maxlength="50" @blur="onContentBlur(i)">
              <template slot="suffix">
                <span v-if="o.isDefault" style="cursor:pointer;color:#F54A45;" :class="{ disable: readonly || disableAttrs.includes('options') }" @click="cancelDefault(i)">取消默认</span>
                <span v-else style="cursor:pointer;color:#0b58d2;" :class="{ disable: readonly || disableAttrs.includes('options') }" @click="setDefault(i)">设置默认</span>
              </template>
            </el-input>
            <svg :class="{ disable: readonly || disableAttrs.includes('options') }" @click="onAddClick(i)" v-show="widget.options.length < 200" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 .75a8.25 8.25 0 1 1 0 16.5A8.25 8.25 0 0 1 9 .75Zm0 1.5a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM9 4.5a.75.75 0 0 1 .75.75v3h3a.75.75 0 1 1 0 1.5h-3v3a.75.75 0 1 1-1.5 0V9.749l-3 .001a.75.75 0 0 1 0-1.5l3-.001V5.25A.75.75 0 0 1 9 4.5Z" fill="#0B58D2" fill-rule="nonzero"/></svg>
            <svg :class="{ disable: readonly || disableAttrs.includes('options') }" @click="onMinsClick(i)" v-show="widget.options.length > 1" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 .75a8.25 8.25 0 1 1 0 16.5A8.25 8.25 0 0 1 9 .75Zm0 1.5a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Zm3 6a.75.75 0 1 1 0 1.5H6a.75.75 0 0 1 0-1.5h6Z" fill="#F54A45" fill-rule="nonzero"/></svg>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="attr-board-common-title">
      <span style="color:#0c58d2;cursor:pointer;" @click="applyEditOption" :class="{ disable: readonly || disableAttrs.includes('options') }">批量编辑</span>
    </div>
    <div class="attr-board-common-edge attr-board-common-edge-inline">
      <span>必填</span>
      <el-switch v-model="widget.isRequired" :disabled="readonly"></el-switch>
    </div>

    <custom-dialog ref="OptionEditDialog" hbg="#FFFFFF" title="批量编辑">
      <div class="attr-board-option-deitor">
        <el-form :model="editText" :rules="rules" ref="EditForm">
          <el-form-item prop="text">
            <el-input v-model="editText.text" size="small" :autosize="{ minRows: 4, maxRows: 10 }" :maxLength="100" placeholder="请输入" type="textarea" resize="none"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="attr-board-option-deitor-footer">
        <el-button size="small" @click="closeEdit">取消</el-button>
        <el-button size="small" type="primary" :disabled="editText.text.trim() === ''" @click="setOptions">保存</el-button>
      </div>
    </custom-dialog>
  </div>
</template>

<script>
  import CustomDialog from '../CustomDialog.vue'

  export default {
    components: {
      CustomDialog,
    },
    props: {
      widget: Object,
      widgetFlat: Array,
      readonly: Boolean,
      titleTip: String,
      disableAttrs: Array,
      getTitle: Function,
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

      const validateContent = (rule, value, cb) => {
        const contents = this.widget.options.map(({ content }) => content)

        if(contents.filter((c) => c === value).length > 1) {
          cb(Error('选项名重复'))
          return
        }

        cb()
      }

      const validateEdit = (rule, value, cb) => {
        const contents = value.trim().split('\n')

        if(contents.some((c) => c.length > 50)) {
          cb(Error('选项过长'))
        }

        const contentMap = {}

        contents.forEach((content) => {
          if(contentMap[content] !== undefined) {
            contentMap[content] += 1
          } else {
            contentMap[content] = 1
          }
        })

        if(Object.keys(contentMap).find((key) => contentMap[key] > 1)) {
          cb(Error('选项重复'))
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
          content: [
            { required: true, message: '请输入选项名称', trigger: 'change' },
            { validator: validateContent, trigger: 'change' },
          ],
          text: [
            { required: true, message: '请输入选项', trigger: 'change' },
            { validator: validateEdit, trigger: 'change' },
          ],
        }),
        editText: {
          text: '',
        },
      }
    },
    methods: {
      onTipsBlur() {
        if(this.widget.tips === '') {
          this.widget.tips = '请选择'
        }
      },
      cancelDefault(index) {
        if(this.readonly || this.disableAttrs.includes('options')) return
        this.widget.options[index].isDefault = false
      },
      setDefault(index) {
        if(this.readonly || this.disableAttrs.includes('options')) return
        const pindex = this.widget.options.findIndex(({ isDefault }) => isDefault)
        if(pindex !== -1) {
          this.widget.options[pindex].isDefault = false
        }

        this.widget.options[index].isDefault = true
      },
      onAddClick(index) {
        if(this.readonly || this.disableAttrs.includes('options')) return
        let content = '选项1'
        let sIndex = 2

        const contents = this.widget.options.map(({ content }) => content)

        while(contents.includes(content)) {
          content = `选项${sIndex}`
          sIndex++
        }

        this.widget.options.splice(index + 1, 0, {
          content,
          isDefault: false,
        })
      },
      onMinsClick(index) {
        if(this.readonly || this.disableAttrs.includes('options')) return
        this.widget.options.splice(index, 1)
      },
      onContentBlur(index) {
        let content = this.widget.options[index].content
        const contents = this.widget.options.map(({ content }) => content)

        if(content === '' || contents.filter((c) => c === content).length > 1) {
          let nContent = '选项1'
          let wIndex = 2

          while(contents.includes(nContent)) {
            nContent = `选项${wIndex}`
            wIndex++
          }

          this.widget.options[index].content = nContent
        }
      },
      applyEditOption() {
        if(this.readonly || this.disableAttrs.includes('options')) return
        this.editText.text = this.widget.options.map(({ content }) => content).join('\n')
        this.$refs.OptionEditDialog.open()
      },
      closeEdit() {
        this.$refs.OptionEditDialog.close()
      },
      async setOptions() {
        await this.$refs.EditForm.validate()

        const contents = this.editText.text.split('\n').filter((c) => c.trim() !== '')
        this.widget.options = this.widget.options.slice(0, contents.length)

        contents.forEach((content, index) => {
          if(this.widget.options[index]) {
            this.widget.options[index].content = content
          } else {
            this.widget.options.splice(index, 0, {
              content,
              isDefault: false,
            })
          }
        })

        this.closeEdit()
      },
    },
  }
</script>
