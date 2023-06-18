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
      <span class="attr-board-common-title-required">*</span>
      <span>选项</span>
    </div>
    <div class="attr-board-cascadebox attr-board-common-edge">
      <el-input :disabled="true" :value="o" v-for="(o, i) of options" :key="i" size="small"></el-input>
    </div>
    <div class="attr-board-common-title">
      <span style="color:#0c58d2;cursor:pointer;" @click="openEdit" :class="{ disable: readonly }">编辑选项</span>
    </div>
    <div class="attr-board-common-edge attr-board-common-edge-inline">
      <span>必填</span>
      <el-switch :disabled="readonly || disableAttrs.includes('isRequired')" v-model="widget.isRequired"></el-switch>
    </div>

    <custom-dialog ref="OptionEditDialog" hbg="#FFFFFF" title="编辑选项" w="560px" t="10vh" v-if="optionTemp">
      <div class="attr-board-cascadebox-deitor attr-options-wrapper">
        <div class="attr-board-cascadebox-deitor-item" v-for="(o, i) of optionTemp" :key="i">
          <div class="attr-board-cascadebox-deitor-item-wrapper">
            <div class="attr-board-cascadebox-deitor-item-wrapper-f">
              <svg @click="o.open = !o.open" :style="{ transform: o.open ? 'translateY(-5px) rotate(0deg)' : 'translateY(-5px) rotate(-90deg)' }" width="10" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M4.693 7.582 1.057 3.615a.417.417 0 0 1 .307-.698h7.272a.417.417 0 0 1 .307.698L5.307 7.582a.417.417 0 0 1-.589.025l-.025-.025Z" fill="#646A73" fill-rule="evenodd"/></svg>
              <el-form :model="o" :rules="rules" ref="Forms">
                <el-form-item prop="content">
                  <el-input @blur="handleContentBlur(null, i, '部门')" size="small" style="width:272px;" v-model.trim="o.content" :maxlength="50"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="attr-board-cascadebox-deitor-item-wrapper-s" v-for="(co, ci) of o.subOptions" :key="ci" v-show="o.open">
              <el-form :model="co" :rules="rules" ref="Forms">
                <el-form-item prop="content">
                  <el-input class="attr-board-cascadebox-deitor-item-input" @blur="handleContentBlur(i, ci, o.content)" size="small" style="width:242px;" v-model.trim="co.content" :maxlength="50">
                    <template slot="suffix">
                      <span v-if="co.isDefault" style="cursor:pointer;color:#F54A45;" @click="cancelDefault(i, ci)">取消默认</span>
                      <span v-else style="cursor:pointer;color:#0b58d2;" @click="setDefault(i, ci)">设置默认</span>
                    </template>
                  </el-input>
                </el-form-item>
              </el-form>
              <svg style="transform:translateY(-10px);" @click="addCO(i, ci, o.content)" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 .75a8.25 8.25 0 1 1 0 16.5A8.25 8.25 0 0 1 9 .75Zm0 1.5a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM9 4.5a.75.75 0 0 1 .75.75v3h3a.75.75 0 1 1 0 1.5h-3v3a.75.75 0 1 1-1.5 0V9.749l-3 .001a.75.75 0 0 1 0-1.5l3-.001V5.25A.75.75 0 0 1 9 4.5Z" fill="#0B58D2" fill-rule="nonzero"/></svg>
              <svg style="transform:translateY(-10px);" @click="dlCO(i, ci)" v-if="o.subOptions.length > 1" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 .75a8.25 8.25 0 1 1 0 16.5A8.25 8.25 0 0 1 9 .75Zm0 1.5a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Zm3 6a.75.75 0 1 1 0 1.5H6a.75.75 0 0 1 0-1.5h6Z" fill="#F54A45" fill-rule="nonzero"/></svg>
              <svg style="cursor:default;transform:translateY(-10px);" v-else width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 .75a8.25 8.25 0 1 1 0 16.5A8.25 8.25 0 0 1 9 .75Zm0 1.5a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Zm3 6a.75.75 0 1 1 0 1.5H6a.75.75 0 0 1 0-1.5h6Z" fill="transparent" fill-rule="nonzero"/></svg>
            </div>
          </div>
          <svg style="transform:translateY(-10px);" @click="addFO(i)" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 .75a8.25 8.25 0 1 1 0 16.5A8.25 8.25 0 0 1 9 .75Zm0 1.5a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM9 4.5a.75.75 0 0 1 .75.75v3h3a.75.75 0 1 1 0 1.5h-3v3a.75.75 0 1 1-1.5 0V9.749l-3 .001a.75.75 0 0 1 0-1.5l3-.001V5.25A.75.75 0 0 1 9 4.5Z" fill="#0B58D2" fill-rule="nonzero"/></svg>
          <svg style="transform:translateY(-10px);" v-if="i !== 0" @click="dlFO(i)" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 .75a8.25 8.25 0 1 1 0 16.5A8.25 8.25 0 0 1 9 .75Zm0 1.5a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Zm3 6a.75.75 0 1 1 0 1.5H6a.75.75 0 0 1 0-1.5h6Z" fill="#F54A45" fill-rule="nonzero"/></svg>
          <svg style="cursor:default;transform:translateY(-10px);" v-else width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 .75a8.25 8.25 0 1 1 0 16.5A8.25 8.25 0 0 1 9 .75Zm0 1.5a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Zm3 6a.75.75 0 1 1 0 1.5H6a.75.75 0 0 1 0-1.5h6Z" fill="transparent" fill-rule="nonzero"/></svg>
        </div>
      </div>
      <div class="attr-board-option-deitor-footer">
        <el-button size="small" @click="closeEdit">取消</el-button>
        <el-button size="small" type="primary" @click="setOptions">保存</el-button>
      </div>
    </custom-dialog>
  </div>
</template>

<script>
import CustomDialog from '../CustomDialog.vue'

export default {
  components: { CustomDialog },
  props: {
    widget: Object,
    readonly: Boolean,
    titleTip: String,
    disableAttrs: Array,
    getTitle: Function,
    widgetFlat: Array,
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

    /**
     * @param { string } value
    */
    const validateContent = (rule, value, cb) => {
      if(!value[0].match(/[a-z]|_/i) && !value[0].match(/\p{Script=Han}/u)) {
        cb(Error('开头需为字母或下划线(_)'))
        return
      }

      if(value.split('').find((char) => {
        if(char.match(/\s/i) || (!char.match(/[a-z]|_|\d/i) && !char.match(/\p{Script=Han}/u))) return true
      })) {
        cb(Error('内容包括空格或不允许的字符'))
        return
      }

      if(this.optionsFlat.filter((t) => t === value).length > 1) {
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
          { required: true, message: '请输入选项内容', trigger: 'change' },
          { validator: validateContent, trigger: 'change' },
        ],
      }),
      optionTemp: null,
    }
  },
  methods: {
    onTipsBlur() {
      if(this.widget.tips === '') {
        this.widget.tips = '请选择'
      }
    },
    async openEdit() {
      if(this.readonly) return
      this.optionTemp = JSON.parse(JSON.stringify(this.widget.options.map((o) => {
        return {
          open: true,
          ...o,
        }
      })))

      await this.$nextTick()
      this.$refs.OptionEditDialog.open()
    },
    closeEdit() {
      this.$refs.OptionEditDialog.close()
    },
    async setOptions() {
      let isValid = true
      this.$refs.Forms.forEach((form) => {
        form.validate((valid) => {
          if(!valid) {
            isValid = false
          }
        })
      })

      if(!isValid) return

      this.widget.options = this.optionTemp
      this.closeEdit()
    },
    getUniqueContent(preset) {
      let index = 2

      let content = `${preset}_1`

      while(this.optionsFlat.includes(content)) {
        content = `${preset}_${index}`
        index++
      }

      return content
    },
    dlFO(index) {
      this.optionTemp.splice(index, 1)
    },
    addFO(index) {
      if(this.optionTemp.length >= 20) return

      const content = this.getUniqueContent('部门')

      const newFO = {
        content,
        isDefault: false,
        open: true,
        subOptions: [
          {
            content: this.getUniqueContent(content),
            isDefault: false,
          },
        ],
      }

      this.optionTemp.splice(index + 1, 0, newFO)
    },
    dlCO(fi, ci) {
      this.optionTemp[fi].subOptions.splice(ci, 1)
    },
    addCO(fi, ci, preset) {
      if(this.optionTemp[fi].subOptions.length >= 30) return
      const newCo = {
        content: this.getUniqueContent(preset),
        isDefault: false,
      }

      this.optionTemp[fi].subOptions.splice(ci + 1, 0, newCo)
    },
    handleContentBlur(fi, ci, preset) {
      if(fi === null) {
        const content = this.optionTemp[ci].content
        if(content === '' || this.optionsFlat.filter((c) => c === content).length > 1) {
          this.optionTemp[ci].content = this.getUniqueContent(preset)
        }
      } else {
        const content = this.optionTemp[fi].subOptions[ci].content
        if(content === '' || this.optionsFlat.filter((c) => c === content).length > 1) {
          this.optionTemp[fi].subOptions[ci].content = this.getUniqueContent(preset)
        }
      }
    },
    cancelDefault(i, ci) {
      this.optionTemp[i].subOptions[ci].isDefault = false
    },
    setDefault(i, ci) {
      this.optionTemp.forEach((o) => {
        o.subOptions.forEach((co) => {
          co.isDefault = false
        })
      })
      this.optionTemp[i].subOptions[ci].isDefault = true
    },
  },
  computed: {
    options() {
      return this.widget.options.map((o) => {
        let content = o.content

        const fsb = o.subOptions[0]

        if(fsb) {
          content += `/${fsb.content}`
        }

        return content
      })
    },
    optionsFlat() {
      if(this.optionTemp === null) return []

      const contents = []
      this.optionTemp.forEach((o) => {
        contents.push(o.content)

        o.subOptions.forEach((co) => {
          contents.push(co.content)
        })
      })

      return contents
    },
  },
}
</script>


<style lang="scss">
.attr-board-cascadebox {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 392px;
  overflow: auto;

  &-deitor {
    padding: 16px;
    margin: 20px;
    border: 1px solid #DFE3E9;
    border-radius: 4px;
    max-height: 454px;
    overflow: auto;

    &-item {
      display: flex;
      gap: 20px;
      justify-content: space-between;
      align-items: center;

      &-wrapper {
        flex: auto;
        background-color: #F6F6F6;
        padding: 10px;
        border-radius: 4px;

        &-f {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        &-s {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 20px;
          padding: 0 14px;
        }
      }

      svg {
        cursor: pointer;
      }

      &:not(:last-child) {
        margin-bottom: 10px;
      }

      &-input {
        input {
          padding-right: 60px !important;
        }
      }
    }
  }
}
</style>
