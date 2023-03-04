<template>
  <div v-if="onlyView" class="form-render-common-view" :style="{ 'max-width': inContainer ? 'none' : '500px' }">
    <div class="form-render-common-view-title">{{ widget.title }}</div>
    <div class="form-render-common-view-content rcfile" style="padding:12px;" v-for="f of files" :key="f.address">
      <img v-if="f.ext === 'image'" :src="f.address">
      <svg v-else-if="f.ext === 'audio'" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h64v64H0z"/><g fill-rule="nonzero"><path d="M10 0h32l16 16v44a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Z" fill="#2F97FE"/><path d="m42 0 16 16H46a4 4 0 0 1-4-4V0Z" fill="#97C6FF"/><path d="M34.691 19h-2.91v24.746c-4.527-2.059-9.828.695-10.707 4.785-.285 1.332.309 2.77.855 3.43 3.098 3.695 9.852 1.973 12.954-2.004.916-1.177 1.337-2.871 1.261-5.082V27.73c1.907 1.418 4.059 2.739 4.832 5.274.477 1.574-.16 4.191-.664 5.527-.152.403-.379 1.14-.379 1.14 1.336.993 1.996-1.116 2.38-2 .413-.956.812-2.136.952-2.952 1.496-8.735-7.789-9.067-8.574-15.719Z" fill="#FFF"/></g></g></svg>
      <svg v-else-if="f.ext === 'csv'" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h64v64H0z"/><g fill-rule="nonzero"><path d="M10 0h32l16 16v44a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Z" fill="#45B058"/><path fill="#FFF" d="M20.76 23.8H48l-4.814 23.994L28.633 52.6 16 47.794l1.285-6.408h5.376l-.525 2.646 7.638 2.898 8.796-2.898 1.23-6.102H17.938l1.05-5.346h21.882l.688-3.438H19.692z"/><path d="m42 0 16 16H46a4 4 0 0 1-4-4V0Z" fill="#7FDA98"/></g></g></svg>
      <svg v-else-if="f.ext === 'doc'" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h64v64H0z"/><g fill-rule="nonzero"><path d="M10 0h32l16 16v44a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Z" fill="#2F97FE"/><path d="m42 0 16 16H46a4 4 0 0 1-4-4V0Z" fill="#97C6FF"/><path fill="#FFF" d="M15.13 26.063h5.539l4.53 16.799 4.485-16.8h4.617l4.487 16.8 4.53-16.8h5.538l-7.653 22.736h-4.664l-4.53-16.62-4.573 16.62h-4.66z"/></g></g></svg>
      <svg v-else-if="f.ext === 'pdf'" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h64v64H0z"/><g fill-rule="nonzero"><path d="M10 0h32l16 16v44a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Z" fill="#FF5562"/><path d="m42 0 16 16H46a4 4 0 0 1-4-4V0Z" fill="#FFBBC0"/><path d="M35.468 20.558c6.889-.917 7.946 7.807 2.427 13.386l-1.794 1.74-.584.557c.177.675.37 1.368.577 2.08l.297 1.002c.24.798.527 1.604.85 2.401l.07.166.748.271.723.272.697.273.338.136.657.275.63.276c.206.092.407.184.603.277l.576.278.548.28c4.455 2.335 6.026 4.818 4.111 7.598-1.68 2.44-4.33 2.104-6.792-.12-1.807-1.632-3.63-4.323-5.053-7.389l-1.803-.424-1.009-.232-1.007-.228-2.007-.444-1.17-.25-.612.472-.302.228-.596.44c-.295.216-.586.423-.873.622l-.568.387-.28.185-.55.352c-.182.114-.362.224-.54.33l-.528.307c-3.917 2.211-6.856 2.415-8.665-.172-2.222-3.177-.908-5.778 2.554-6.71 2.23-.6 5.452-.58 8.286-.061l.449.087 1.462.305.57-.47.5-.418.499-.426a109.51 109.51 0 0 0 3.082-2.758l.188-.178c-.83-3.497-1.224-6.433-1.081-8.757.207-3.352 1.594-5.576 4.372-5.946Zm4.079 25.416-.221-.095.03.05c.908 1.477 1.881 2.717 2.805 3.551 1.295 1.17 1.896 1.246 2.31.644.46-.666-.157-1.62-2.155-2.786l-.418-.236a19.8 19.8 0 0 0-.223-.12l-.474-.245-.513-.249-.55-.255-.591-.26ZM24.12 41.946l-.071-.01c-2.21-.308-4.578-.276-6.13.141-1.61.434-1.789.787-.874 2.094.522.746 1.813.666 3.724-.234l.452-.222c.462-.237.958-.517 1.483-.841l.536-.338.276-.18.604-.41Zm8.917-3.4-.297.27c-.424.383-.843.755-1.26 1.12l-.416.359.074.015-.019.015.814.181 1.652.377-.145-.332.215.073-.138-.436-.307-1.036-.173-.606Zm2.578-6.567c4.037-3.922 3.48-8.878.248-8.447-1.277.17-1.885 1.73-1.787 4.492l.026.532c.03.455.076.94.14 1.452l.085.628.101.656.119.682.135.71.034.166.899-.87Z" fill="#FFF"/></g></g></svg>
      <svg v-else-if="f.ext === 'ppt'" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h64v64H0z"/><g fill-rule="nonzero"><path d="M10 0h32l16 16v44a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Z" fill="#FF774B"/><path d="m42 0 16 16H46a4 4 0 0 1-4-4V0Z" fill="#FCB7A0"/><path d="M21 22h12.893C41.298 22 45 25.136 45 31.452c0 6.36-3.746 9.539-11.194 9.539h-8.058V53.1H21V22Zm4.748 4.05v10.89H33.5c2.352 0 4.05-.435 5.14-1.307 1.045-.87 1.611-2.265 1.611-4.181 0-1.917-.566-3.31-1.655-4.095-1.089-.87-2.787-1.306-5.096-1.306h-7.753Z" fill="#FFF"/></g></g></svg>
      <svg v-else-if="f.ext === 'txt'" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h64v64H0z"/><g fill-rule="nonzero"><path d="M10 0h32l16 16v44a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Z" fill="#0B58D2"/><path d="m42 0 16 16H46a4 4 0 0 1-4-4V0Z" fill="#6BA4FF"/><path fill="#FFF" d="M46 24v4.512H34.404v24.205h-4.808V28.512H18V24z"/></g></g></svg>
      <svg v-else-if="f.ext === 'video'" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h64v64H0z"/><g fill-rule="nonzero"><path d="M10 0h32l16 16v44a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Z" fill="#7165E3"/><path d="m42 0 16 16H46a4 4 0 0 1-4-4V0Z" fill="#ABA2FF"/></g><path d="M37 28a2 2 0 0 1 2 2v2.322c-.402.58-.767 1.165-1.096 1.757-.603 1.087-.904 2.053-.904 2.9 0 .846.28 1.778.842 2.793.351.635.737 1.258 1.157 1.87L39 44a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2V30a2 2 0 0 1 2-2h18Zm8.822 1c.493 0 .813.141.959.423.146.282.219.63.219 1.044V43.42c0 .414-.105.78-.315 1.1-.21.32-.525.48-.945.48-.146 0-.334-.056-.562-.17a6.398 6.398 0 0 1-.685-.394 13.1 13.1 0 0 1-.644-.452c-.2-.15-.347-.273-.438-.367a18.528 18.528 0 0 1-1.082-1.072 21.714 21.714 0 0 1-1.466-1.721 15.584 15.584 0 0 1-1.301-1.976c-.375-.677-.562-1.298-.562-1.862 0-.564.2-1.209.603-1.933.402-.724.886-1.435 1.452-2.13.566-.697 1.16-1.341 1.78-1.934.622-.592 1.142-1.039 1.562-1.34.165-.113.388-.25.671-.41.284-.159.535-.239.754-.239Z" fill="#FFF"/></g></svg>
      <svg v-else-if="f.ext === 'xls'" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h64v64H0z"/><g fill-rule="nonzero"><path d="M10 0h32l16 16v44a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Z" fill="#00B632"/><path d="m42 0 16 16H46a4 4 0 0 1-4-4V0Z" fill="#7FDA98"/></g><path d="m25 23 7 9.8 7-9.8h6L35 37l10 14h-6l-7-9.8-7 9.8h-6l10-14-10-14h6Z" fill="#FFF"/></g></svg>
      <svg v-else-if="f.ext === 'zip'" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h64v64H0z"/><g fill-rule="nonzero"><path d="M10 0h32l16 16v44a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Z" fill="#576A95"/><path d="M36.4 39.328v8.692a2.18 2.18 0 0 1-2.177 2.173h-4.446A2.17 2.17 0 0 1 27.6 48.02v-8.692h8.8Zm-2.177 4.98h-4.446v4.364h4.446v-4.364Zm2.104-13.67V35h-4.372v-4.364h4.372ZM32.01 0v4.4H36.4v4.4h-4.391v4.074H36.4v4.4h-4.39v4.346h4.39v4.346h-4.39v4.346H27.6v-4.346h4.39V21.62H27.6v-4.346h4.39v-4.4H27.6v-4.4h4.39V4.4H27.6V0h4.41Z" fill="#FFF"/><path d="m42 0 16 16H46a4 4 0 0 1-4-4V0Z" fill="#BBC3D4"/></g></g></svg>
      <svg v-else viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h64v64H0z"/><path d="M10 0h32l16 16v44a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Z" fill="#8F959E" fill-rule="nonzero"/><g fill="#FFF"><path d="M31.966 51.68a3.344 3.344 0 1 1 0-6.688 3.344 3.344 0 0 1 0 6.689ZM36.781 36.866a8.16 8.16 0 0 0-2.14 2.308 7.692 7.692 0 0 0-.378 1.9c-.02.268-.016.671.01 1.21h-4.916v-1.305a8.594 8.594 0 0 1 .803-3.912 11.972 11.972 0 0 1 3.143-3.344 23.91 23.91 0 0 0 2.843-2.508c.46-.593.707-1.324.702-2.074a3.511 3.511 0 0 0-1.27-2.709 4.95 4.95 0 0 0-3.345-1.137 5.183 5.183 0 0 0-3.344 1.17 7.09 7.09 0 0 0-1.906 3.58L22 29.441a8.394 8.394 0 0 1 2.943-5.852 10.434 10.434 0 0 1 7.023-2.575c2.692-.142 5.34.73 7.424 2.441a7.357 7.357 0 0 1 2.608 5.685 6.187 6.187 0 0 1-.903 3.378 22.339 22.339 0 0 1-4.314 4.347Z"/></g><path d="m42 0 16 16H46a4 4 0 0 1-4-4V0Z" fill="#B3B9C1" fill-rule="nonzero"/></g></svg>
      <div style="flex:auto;">
        <div>{{ f.fileName }}</div>
        <div style="font-size:12px;color:#8F959E;line-height:14px;margin-top:8px;">{{ formatFileSize(f.size) }}</div>
      </div>
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
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M14.264 2.3c.361.365.63.773.806 1.225a3.807 3.807 0 0 1 0 2.785c-.176.451-.445.86-.806 1.225l-5.77 5.782c-.36.366-.805.67-1.333.913a4.732 4.732 0 0 1-1.672.427 4.665 4.665 0 0 1-1.8-.244c-.612-.203-1.18-.568-1.702-1.096-.512-.517-.868-1.078-1.07-1.681a4.675 4.675 0 0 1-.24-1.804c.04-.598.178-1.161.414-1.689a4.48 4.48 0 0 1 .896-1.339L7.11 1.676c.09-.092.223-.114.399-.069a.851.851 0 0 1 .4.206c.08.091.145.225.195.403.05.178.03.312-.06.403L2.936 7.732a3.655 3.655 0 0 0-.678.96 3.09 3.09 0 0 0-.136 2.435c.151.425.423.836.814 1.232.352.355.74.606 1.168.753.426.147.85.208 1.272.183a3.64 3.64 0 0 0 1.206-.282c.381-.162.708-.38.979-.654l5.754-5.768a2.56 2.56 0 0 0 .58-.852 2.28 2.28 0 0 0 .165-.875 2.026 2.026 0 0 0-.203-.845 2.781 2.781 0 0 0-.542-.76c-.432-.427-.917-.627-1.454-.602-.537.026-1.077.312-1.62.86l-5.196 5.22c-.23.233-.344.492-.339.776a.98.98 0 0 0 .279.7c.22.223.474.314.76.274.287-.04.52-.152.701-.335l4.715-4.733c.09-.091.223-.114.399-.068a.851.851 0 0 1 .4.205.92.92 0 0 1 .21.404c.05.177.03.312-.06.403l-4.73 4.733c-.362.365-.708.618-1.04.76a2.094 2.094 0 0 1-.933.19 1.823 1.823 0 0 1-.814-.235 3.437 3.437 0 0 1-.693-.518 2.437 2.437 0 0 1-.46-.624 2.039 2.039 0 0 1-.233-.837c-.02-.304.033-.629.159-.973.125-.345.369-.695.73-1.05.18-.183.342-.35.482-.503a7.82 7.82 0 0 1 .339-.35l.173-.167 4.203-4.23a4.333 4.333 0 0 1 1.182-.86 3.505 3.505 0 0 1 1.303-.358c.442-.03.877.03 1.303.183.427.152.821.41 1.183.776Z" fill="currentColor"/></svg>
          <span style="margin-left:8px;">{{ widget.buttonText }}</span>
        </div>
      </el-button>
      <input type="file" multiple style="display:none;" ref="UPLOAD" @change="onChange">
      <div class="form-render-attachment" v-for="(a, i) of widget.value" :key="i">
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M14.264 2.3c.361.365.63.773.806 1.225a3.807 3.807 0 0 1 0 2.785c-.176.451-.445.86-.806 1.225l-5.77 5.782c-.36.366-.805.67-1.333.913a4.732 4.732 0 0 1-1.672.427 4.665 4.665 0 0 1-1.8-.244c-.612-.203-1.18-.568-1.702-1.096-.512-.517-.868-1.078-1.07-1.681a4.675 4.675 0 0 1-.24-1.804c.04-.598.178-1.161.414-1.689a4.48 4.48 0 0 1 .896-1.339L7.11 1.676c.09-.092.223-.114.399-.069a.851.851 0 0 1 .4.206c.08.091.145.225.195.403.05.178.03.312-.06.403L2.936 7.732a3.655 3.655 0 0 0-.678.96 3.09 3.09 0 0 0-.136 2.435c.151.425.423.836.814 1.232.352.355.74.606 1.168.753.426.147.85.208 1.272.183a3.64 3.64 0 0 0 1.206-.282c.381-.162.708-.38.979-.654l5.754-5.768a2.56 2.56 0 0 0 .58-.852 2.28 2.28 0 0 0 .165-.875 2.026 2.026 0 0 0-.203-.845 2.781 2.781 0 0 0-.542-.76c-.432-.427-.917-.627-1.454-.602-.537.026-1.077.312-1.62.86l-5.196 5.22c-.23.233-.344.492-.339.776a.98.98 0 0 0 .279.7c.22.223.474.314.76.274.287-.04.52-.152.701-.335l4.715-4.733c.09-.091.223-.114.399-.068a.851.851 0 0 1 .4.205.92.92 0 0 1 .21.404c.05.177.03.312-.06.403l-4.73 4.733c-.362.365-.708.618-1.04.76a2.094 2.094 0 0 1-.933.19 1.823 1.823 0 0 1-.814-.235 3.437 3.437 0 0 1-.693-.518 2.437 2.437 0 0 1-.46-.624 2.039 2.039 0 0 1-.233-.837c-.02-.304.033-.629.159-.973.125-.345.369-.695.73-1.05.18-.183.342-.35.482-.503a7.82 7.82 0 0 1 .339-.35l.173-.167 4.203-4.23a4.333 4.333 0 0 1 1.182-.86 3.505 3.505 0 0 1 1.303-.358c.442-.03.877.03 1.303.183.427.152.821.41 1.183.776Z" fill="#636a73"/></svg>
        <span>{{ a.fileName }}</span>
        <svg @click="rm(i)" width="16" height="16" viewBox="0 0 32 32" style="cursor:pointer;"><path fill="#636a73" d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"/></svg>
      </div>
      <div class="form-render-common-desc" v-show="widget.desc !== ''">{{ widget.desc }}</div>
    </el-form-item>
  </el-form>
</template>

<script>
  import {formatFileSize, getExt } from '../../utils'

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
      formatFileSize,
    },
    computed: {
      files() {
        return this.widget.value.map((f) => {
          return {
            ...f,
            ext: getExt(f.address),
          }
        })
      }
    },
  }
</script>
