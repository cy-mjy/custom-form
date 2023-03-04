<template>
  <div class="page">
    <div class="left">
      <div v-for="(ws, i) of widgetList" :key="i" style="margin-bottom: 10px">
        <span>{{ ws.desc }}</span>
        <widget-setup :widget="w" :disabled="w.disabled" style="margin-top: 10px" s v-for="w of ws.widgets" :key="w.type"></widget-setup>
      </div>
    </div>

    <div class="middle">
      <design-board
              @current-change="onCurrentChange"
              :widgets="widgetsTree"
              :currentWidget="currentWidget"
              ref="DesignBoard">
      </design-board>
    </div>

    <attr-board :widgets="widgetsTree" :widget="currentWidget" env="test" class="right" v-if="currentWidget" :disableAttrs="['isShowBorder']"></attr-board>
<!--    <div v-else style="width:344px;flex:none;"></div>-->
  </div>
</template>

<script>
  import { widgets } from './data/widgets'

  function flatWidgets(widgets, set = []) {
    widgets.forEach((w) => {
      if(w !== null) {
        set.push(w)
      }

      if(w && w.children) {
        flatWidgets(w.children, set)
      }
    })

    return set
  }

  export default {
    data() {
      return {
        widgets: Object.freeze(widgets),
        currentWidget: null,
        widgetsTree: [
          {
            "id": "4e4d1R3YaZd",
            "desc": "",
            "tips": "",
            "floor": 0,
            "tips2": "请输入",
            "title": "工作信息",
            "value": "",
            "default": "",
            "children": [
              {
                "id": "gdz1upnn5m96",
                "desc": "",
                "tips": "请输入",
                "floor": 0,
                "style": 0,
                "tips2": "请输入",
                "title": "布局容器",
                "value": "",
                "default": "",
                "children": [
                  {
                    "id": "g9aq691yrf31",
                    "desc": "",
                    "tips": "请输入",
                    "floor": 0,
                    "tips2": "请输入",
                    "title": "姓名",
                    "value": "",
                    "default": "",
                    "isSystem": true,
                    "scanMode": false,
                    "maxLength": 20,
                    "minLength": 1,
                    "isRequired": true,
                    "widgetType": 1,
                    "valueFormat": 0
                  },
                  {
                    "id": "g9aq691yrf1x",
                    "desc": "",
                    "tips": "请输入",
                    "floor": 1,
                    "tips2": "请输入",
                    "title": "手机号",
                    "value": "",
                    "default": "",
                    "isSystem": true,
                    "scanMode": false,
                    "maxLength": 20,
                    "minLength": 1,
                    "isRequired": true,
                    "widgetType": 1,
                    "valueFormat": 1
                  },
                ],
                "isSystem": false,
                "isRequired": false,
                "widgetType": 41,
                "isShowBorder": true
              }
            ],
            "isSystem": true,
            "isRequired": false,
            "widgetType": 40,
            "isShowBorder": true
          },
          {
            "id": "4e4d1R3v5PD",
            "desc": "",
            "tips": "",
            "floor": 0,
            "tips2": "请输入",
            "title": "基本信息",
            "value": "",
            "default": "",
            "children": [
              {
                "id": "gdz1upo4wjrp",
                "desc": "",
                "tips": "请输入",
                "floor": 0,
                "style": 0,
                "tips2": "请输入",
                "title": "布局容器(1)",
                "value": "",
                "default": "",
                "children": [
                  {
                    "id": "g9aq6922j9y6",
                    "desc": "",
                    "tips": "请输入",
                    "floor": 0,
                    "tips2": "请输入",
                    "title": "身份证号",
                    "value": "",
                    "default": "",
                    "isSystem": false,
                    "scanMode": false,
                    "maxLength": 20,
                    "minLength": 0,
                    "isRequired": false,
                    "widgetType": 1,
                    "valueFormat": 4
                  },
                  {
                    "id": "g9aq6922j9y8",
                    "desc": "",
                    "tips": "请选择",
                    "floor": 1,
                    "tips2": "请输入",
                    "title": "学历",
                    "value": "",
                    "layout": 1,
                    "default": "",
                    "options": [
                      {
                        "content": "博士",
                        "isDefault": false,
                        "subOptions": []
                      },
                      {
                        "content": "硕士",
                        "isDefault": false,
                        "subOptions": []
                      },
                      {
                        "content": "本科",
                        "isDefault": false,
                        "subOptions": []
                      },
                      {
                        "content": "大专",
                        "isDefault": false,
                        "subOptions": []
                      },
                      {
                        "content": "高中及以下",
                        "isDefault": false,
                        "subOptions": []
                      }
                    ],
                    "isSystem": false,
                    "isRequired": false,
                    "widgetType": 5
                  },
                  {
                    "id": "g9aq6922j9y9",
                    "desc": "",
                    "tips": "请输入",
                    "floor": 1,
                    "tips2": "请输入",
                    "title": "毕业院校",
                    "value": "",
                    "default": "",
                    "isSystem": false,
                    "scanMode": false,
                    "maxLength": 20,
                    "minLength": 0,
                    "isRequired": false,
                    "widgetType": 1,
                    "valueFormat": 0
                  },
                  {
                    "id": "g9aq6922j9y0",
                    "desc": "",
                    "tips": "请输入",
                    "floor": 0,
                    "tips2": "请输入",
                    "title": "专业",
                    "value": "",
                    "default": "",
                    "isSystem": false,
                    "scanMode": false,
                    "maxLength": 20,
                    "minLength": 0,
                    "isRequired": false,
                    "widgetType": 1,
                    "valueFormat": 0
                  },
                  {
                    "id": "g9aq6922j9y7",
                    "desc": "",
                    "tips": "请输入",
                    "floor": 0,
                    "tips2": "请输入",
                    "title": "邮箱",
                    "value": "",
                    "default": "",
                    "isSystem": false,
                    "scanMode": false,
                    "maxLength": 20,
                    "minLength": 0,
                    "isRequired": false,
                    "widgetType": 1,
                    "valueFormat": 2
                  },
                  {
                    "id": "g9aq6922j9y5",
                    "desc": "",
                    "tips": "请输入",
                    "floor": 1,
                    "tips2": "请输入",
                    "title": "民族",
                    "value": "",
                    "default": "",
                    "isSystem": false,
                    "scanMode": false,
                    "maxLength": 20,
                    "minLength": 0,
                    "isRequired": false,
                    "widgetType": 1,
                    "valueFormat": 0
                  },
                  {
                    "id": "g9aq6922j9y4",
                    "desc": "",
                    "tips": "请选择",
                    "floor": 0,
                    "tips2": "请输入",
                    "title": "出生日期",
                    "value": "",
                    "default": "1667145600000",
                    "isSystem": true,
                    "dateFormat": 3,
                    "isRequired": true,
                    "widgetType": 8,
                    "commitLimit": true
                  }
                ],
                "isSystem": false,
                "isRequired": false,
                "widgetType": 41,
                "isShowBorder": true
              }
            ],
            "isSystem": true,
            "isRequired": false,
            "widgetType": 40,
            "isShowBorder": true
          },
          {
            "id": "4e4d1R4HaCo",
            "desc": "",
            "tips": "",
            "floor": 0,
            "tips2": "请输入",
            "title": "其他",
            "value": "",
            "default": "",
            "children": [
              {
                "id": "g9aq6925c3vc",
                "desc": "",
                "tips": "请输入1",
                "floor": 0,
                "tips2": "请输入",
                "title": "备注1",
                "value": "",
                "default": "",
                "isSystem": true,
                "maxLength": 50,
                "minLength": 0,
                "isRequired": false,
                "widgetType": 2
              }
            ],
            "isSystem": true,
            "isRequired": false,
            "widgetType": 40,
            "isShowBorder": true
          }
        ],
        usePhoneView: false,
      }
    },
    methods: {
      onCurrentChange(widget) {
        console.log(widget)
        this.currentWidget = widget
      },
      changeCurrentWidgetAttr(key, value) {
        this.currentWidget[key] = value
      },
      getValue() {
        const value = this.$refs.FormRender.getValue()
        console.log(value)
      },
    },
    computed: {
      flatWidget() {
        return flatWidgets(this.widgetsTree)
      },
      widgetList() {
        return widgets.map((w) => {
          return {
            desc: w.desc,
            widgets: w.widgets.map((widget) => {
              let disabled = false

              const type = widget.type
              if([21,23,25,26].includes(type)) {
                if(this.flatWidget.find(({ widgetType }) => widgetType === type)) {
                  disabled = true
                }
              }

              return {
                ...widget,
                disabled,
              }
            })
          }
        })
      },
    },
  }
</script>

<style>
  html,body {
    height: 100%;
    margin: 0;
  }
  .page {
    display: flex;
    height: 100%;
    flex-shrink: 0;
  }
  .left {
    width: 200px;
    padding: 16px;
    border-right: 1px solid #DFE3E9;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
  }
  .middle {
    flex: 1;
    height: 100%;
    overflow-y: auto;
  }
  .right {
    height: 100%;

    flex-shrink: 0;
    border-left: 1px solid #DFE3E9;
  }
  .system-icon {
    display: block;
    flex: none;
    margin-left: 6px;
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml;utf8,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230B58D2' fill-rule='evenodd'%3E%3Crect fill-opacity='.1' width='20' height='20' rx='2'/%3E%3Cpath d='M11.45 3.583c.554 0 .974.42.974.974v1.002l.18.096.894-.557a.984.984 0 0 1 1.236.28l.054.074.022.035 1.493 2.612c.123.24.148.506.066.747a.905.905 0 0 1-.503.537l-.829.487v.41a.611.611 0 0 1-1.222.002l.025-1.074 1.244-.778-1.214-2.128-1.238.775-.063-.001-.297-.199-.098-.062-.113-.065-.217-.116-.61-.307-.031-.052V4.803H8.797v1.634l-.043.057-.419.105c-.091.023-.191.075-.353.18l-.55.37h-.064l-1.268-.793L4.917 8.43l1.27.827-.026 1.533-1.244.777 1.214 2.128 1.238-.774h.063l.297.2.098.061.178.101.152.08.61.307.031.052v1.473h1.205c.314 0 .573.237.606.544l.003.066a.611.611 0 0 1-.61.612H8.548a.953.953 0 0 1-.973-.974v-1.005l-.18-.094-.895.557a.984.984 0 0 1-1.235-.28l-.054-.075-.022-.034-1.492-2.614a.956.956 0 0 1-.066-.747.909.909 0 0 1 .503-.536l.83-.487.027-.21-.849-.531a.913.913 0 0 1-.511-.54.96.96 0 0 1 .115-.834l1.437-2.515a.892.892 0 0 1 .56-.44c.276-.072.568-.018.821.15l.814.509.104-.063.092-.052V4.557a.95.95 0 0 1 .887-.97l.087-.004Zm4.333 11.626a.578.578 0 1 1 0 1.157h-3.469a.578.578 0 1 1 0-1.157h3.47Zm0-2.892a.578.578 0 1 1 0 1.157h-3.469a.578.578 0 1 1 0-1.157h3.47ZM10 7.787a2.212 2.212 0 1 1-.001 4.422 2.212 2.212 0 0 1 0-4.423Zm0 1.156a1.055 1.055 0 1 0 0 2.11 1.055 1.055 0 0 0 0-2.11Z' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E");
  }
  .type-icon {
    display: block;
    flex: none;
    margin-left: 6px;
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml;utf8,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Crect fill-opacity='.1' fill='%23F90' width='20' height='20' rx='2'/%3E%3Cpath d='M3 3h14v14H3z'/%3E%3Cpath d='M14.667 3.583a1.75 1.75 0 0 1 1.747 1.648l.003.102v9.334a1.75 1.75 0 0 1-1.648 1.747l-.102.003h-8.75a1.75 1.75 0 0 1-1.747-1.648l-.003-.102-.001-1.75h-.583a.583.583 0 0 1 0-1.167h.583v-3.5h-.583a.583.583 0 1 1 0-1.167h.583v-1.75a1.75 1.75 0 0 1 1.648-1.747l.103-.003h8.75Zm0 1.167h-8.75c-.3 0-.546.225-.58.515l-.004.068v1.75h.584a.583.583 0 0 1 0 1.167h-.584v3.5h.584a.583.583 0 0 1 0 1.167h-.584v1.75c0 .299.226.545.516.58l.068.003h8.75c.299 0 .545-.225.58-.515l.003-.068V5.333c0-.299-.225-.545-.515-.58l-.068-.003Zm-2.361 1.458a.275.275 0 0 1 .25.387l-.814 1.863a.277.277 0 0 0-.004.212l1.432 3.637a.552.552 0 0 1-.223.672l-2.124 1.314a.547.547 0 0 1-.585-.006l-2.029-1.318a.552.552 0 0 1-.222-.638L9.21 8.664a.277.277 0 0 0-.009-.197l-.809-1.873a.276.276 0 0 1 .252-.386h3.662Zm-1.45 3.222h-.745l-.95 2.845 1.382.897 1.437-.889-1.124-2.853Zm.189-2.12H9.898l.31.718c.033.075.058.152.077.23h.371c.011-.047.025-.094.04-.14l.04-.103.309-.704Z' fill='%23F90' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E");
  }
  .el-picker-panel .el-scrollbar__wrap {
    margin: 0 !important;
  }
</style>
