import {v4 as uuidv4} from "uuid";

class WidgetBase {
    /**
     * 控件ID
     */
    id = ''
    /**
     * 控件标题[1,20]
     */
    title = ''
    /**
     * 控件提示（placeholder/tooltip??）[1,30]
     */
    tips = '请输入'
    /**
     * 控件提示（placeholder/tooltip??）[1,30]
     */
    tips2 = '请输入'
    /**
     * 控件描述[0,100]
     */
    desc = ''
    /**
     * 控件值是否必填
     */
    isRequired = false
    /**
     * 是否为内置字段（内置不可操作）
     */
    isSystem = false
    /**
     * 默认值
     * @type { { code: string, name: string }[] | { value1: string, value2: string } | string }
     */
    default = ''
    /**
     * 值
     */
    value = ''
    /**
     * 位于布局容器的第几块
     */
    floor = 0
    /**
     * 取代id的作用
     */
    flag = uuidv4()
    /**
     * 区别是否为新拖进去的组件
     */
    isNew = true

}

/**
 * 单行文本
 */
export class SingleLineText extends WidgetBase {
    /**
     * 值格式（手机号/邮箱/网址/身份证）
     * @type { 0 | 1 | 2 | 3 | 4 }
     */
    valueFormat = 0
    /**
     * 最小长度默认0
     */
    minLength = 0
    /**
     * 最大长度100默认20
     */
    maxLength = 20
    /**
     * 扫码模式？？
     */
    scanMode = false

    /**
     * 控件类型
     */
    widgetType = 1

    /**
     * @param { Record<string, any> } preset
     */
    static create(preset) {
        return Object.assign(new SingleLineText(), preset)
    }
}

/**
 * 多行文本
 */
export class MultipleLineText extends WidgetBase {
    /**
     * 最小长度默认0
     */
    minLength = 0
    /**
     * 最大长度500默认50
     */
    maxLength = 50

    /**
     * 控件类型
     */
    widgetType = 2

    /**
     * @param { Record<string, any> } preset
     */
    static create(preset) {
        return Object.assign(new MultipleLineText(), preset)
    }
}

/**
 * 数值
 */
export class Numeric extends WidgetBase {
    /**
     * 单位名称
     */
    unitName = null
    /**
     * 单位符号
     */
    unitSign = null
    /**
     * 最小限制默认0 -10^10
     */
    min = 0
    /**
     * 最大限制默认 1_0000_0000 10^16
     */
    max = 100000000
    /**
     * 小数位数 max:10
     */
    decimalPlace = 0
    /**
     * 显示step加减 edge +-0.001
     */
    valueAdjuster = false

    /**
     * 控件类型
     */
    widgetType = 3

    /**
     * @param { Record<string, any> } preset
     */
    static create(preset) {
        return Object.assign(new Numeric(), preset)
    }
}

/**
 * 数值区间
 */
export class NumericRange extends WidgetBase {
    /**
     * 单位名称
     */
    unitName = null
    /**
     * 单位符号
     */
    unitSign = null
    /**
     * 最小限制默认0 -10^10
     */
    min = 0
    /**
     * 最大限制默认 1_0000_0000 10^16
     */
    max = 100000000
    /**
     * 小数位数 max:10
     */
    decimalPlace = 0

    /**
     * 控件类型
     */
    widgetType = 4

    /**
     * @param { Record<string, any> } preset
     */
    static create(preset) {
        return Object.assign(new NumericRange(), {
            default: {
                value1: null,
                value2: null,
            },
            value: {
                value1: null,
                value2: null,
            },
        },preset)
    }
}

/**
 * 单选
 */
export class RadioBox extends WidgetBase {
    /**
     * 布局：平铺/收起
     */
    layout = 0

    /**
     * 选项
     * @type { { content: string, isDefault: boolean, subOptions: any[] }[] }
     */
    options = [
        {
            content: '选项1',
            isDefault: true,
        },
        {
            content: '选项2',
            isDefault: false,
        },
    ]

    /**
     * 控件类型
     */
    widgetType = 5

    /**
     * @param { Record<string, any> } preset
     */
    static create(preset) {
        return Object.assign(new RadioBox(), {
            tips: '请选择',
            default: null,
            value: null,
        }, preset)
    }
}

/**
 * 多选
 */
export class CheckBox extends WidgetBase {
    /**
     * 布局：平铺/收起
     */
    layout = 0

    /**
     * 选项
     * @type { { content: string, isDefault: boolean, subOptions: any[] }[] }
     */
    options = [
        {
            content: '选项1',
            isDefault: true,
        },
        {
            content: '选项2',
            isDefault: false,
        },
    ]

    /**
     * 控件类型
     */
    widgetType = 6

    /**
     * @param { Record<string, any> } preset
     */
    static create(preset) {
        return Object.assign(new CheckBox(), {
            tips: '请选择',
            default: null,
            value: [],
        }, preset)
    }
}

/**
 * 级联
 */
export class CascadeBox extends WidgetBase {
    /**
     * 级联 20子级 30项
     * @type { { content: string, isDefault: boolean, subOptions: { content: string, isDefault: boolean, }[] }[] }
     */
    options = [
        {
            content: '部门_1',
            isDefault: false,
            subOptions: [
                {
                    content: '部门_1_1',
                    isDefault: false,
                },
                {
                    content: '部门_1_2',
                    isDefault: false,
                },
            ],
        },
        {
            content: '部门_2',
            isDefault: false,
            subOptions: [
                {
                    content: '部门_2_1',
                    isDefault: false,
                },
                {
                    content: '部门_2_2',
                    isDefault: false,
                },
            ],
        },
    ]

    /**
     * 控件类型
     */
    widgetType = 7

    /**
     * @param { Record<string, any> } preset
     */
    static create(preset) {
        return Object.assign(new CascadeBox(), {
            tips: '请选择',
            default: null,
            value: {
                value1: null,
                value2: null,
            },
        }, preset)
    }
}

/**
 * 日期
 */
export class Dater extends WidgetBase {
    /**
     * 日期格式
     * @see https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi
     */
    dateFormat = 3

    /**
     * 选的时间不得小于当前时间
     */
    commitLimit = false

    /**
     * 控件类型
     */
    widgetType = 8

    /**
     * @param { Record<string, any> } preset
     */
    static create(preset) {
        return Object.assign(new Dater(), {
            tips: '请选择',
        }, preset)
    }
}

/**
 * 日期区间
 */
export class DateRange extends WidgetBase {
    /**
     * 日期格式
     * @see https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi
     */
    dateFormat = 3

    /**
     * 选的时间不得小于当前时间
     */
    commitLimit = false

    /**
     * 控件类型
     */
    widgetType = 9

    /**
     * @param { Record<string, any> } preset
     */
    static create(preset) {
        return Object.assign(new DateRange(), {
            tips: '开始时间',
            tips2: '结束时间',
            default: {
                value1: null,
                value2: null,
            },
            value: {
                value1: null,
                value2: null,
            },
        }, preset)
    }
}

/**
 * 附件 9个20M
 */
export class Attachment extends WidgetBase {
    /**
     * 控件类型
     */
    widgetType = 10

    buttonText = '上传附件'

    /**
     * @param { Record<string, any> } preset
     */
    static create(preset) {
        return Object.assign(new Attachment(), {
            default: [],
            value: [],
        }, preset)
    }
}

/**
 * 图片 9个20M jpg,jpeg,png
 */
export class Picture extends WidgetBase {
    /**
     * 控件类型
     */
    widgetType = 11

    buttonText = '上传图片'

    /**
     * @param { Record<string, any> } preset
     */
    static create(preset) {
        return Object.assign(new Picture(), {
            default: [],
            value: [],
        }, preset)
    }
}


/**
 * 可嵌套
 */
class Nested extends WidgetBase {
    /**
     * 子
     */
    children = []

    /**
     * 显示边框
     */
    isShowBorder = true
}

/**
 * 明细
 */
export class Detail extends Nested {
    /**
     * 显示序号
     */
    showIndex = true

    buttonText = '新增明细'

    /**
     * 序号名称
     */
    indexName = '明细内容'

    /**
     * 控件类型
     */
    widgetType = 13

    /**
     * @param { Record<string, any> } preset
     */
    static create(preset) {
        return Object.assign(new Detail(), preset)
    }
}

/**
 * 分组
 */
export class Group extends Nested {
    /**
     * 控件类型
     */
    widgetType = 40

    /**
     * @param { Record<string, any> } preset
     */
    static create(preset) {
        return Object.assign(new Group(), {
            tips: '用户提示',
        }, preset)
    }
}

/**
 * 容器
 */
export class Container extends Nested {
    /**
     * 布局类型
     */
    style = 0

    /**
     * 控件类型
     */
    widgetType = 41

    /**
     * @param { Record<string, any> } preset
     */
    static create(preset) {
        return Object.assign(new Container(), {
            children: [],
        }, preset)
    }
}


export const widgetTypeMap = {
    1: SingleLineText,
    2: MultipleLineText,
    3: Numeric,
    4: NumericRange,
    5: RadioBox,
    6: CheckBox,
    7: CascadeBox,
    8: Dater,
    9: DateRange,
    10: Attachment,
    11: Picture,
    12: Detail,
    40: Group,
    41: Container,
}

const widgetTypes = Object.keys(widgetTypeMap).map((t) => Number(t))

/**
 * @param { number } type
 * @param { Record<string, any> } preset
 * @returns { SingleLineText | MultipleLineText | Numeric | NumericRange | RadioBox | CheckBox | CascadeBox | Dater | DateRange | Attachment | Picture | Detail | Group | Container }
 */
export function createWidget(type, preset = null) {
    if(!widgetTypes.includes(type)) {
        throw Error('没有这个类型的控件')
    }

    return widgetTypeMap[type].create(preset)
}

export const widgets = [
    {
        "name": "单行文本",
        "type": 1,
        "icon": "<svg width=\"16\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8.814.903c.355.155.647.423.833.76l.073.148 5.156 11.896a.75.75 0 0 1-1.33.688l-.046-.091-1.568-3.616H4.268l-1.58 3.618a.75.75 0 0 1-1.41-.505l.035-.096L6.509 1.807A1.75 1.75 0 0 1 8.814.903ZM7.919 2.35l-.035.057-2.961 6.781h6.359l-2.94-6.78a.25.25 0 0 0-.423-.058Z\" fill=\"#646A73\"/></svg>"
    },
    {
        "name": "多行文本",
        "type": 2,
        "icon": "<svg width=\"16\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15.333 13.333a.667.667 0 0 1 0 1.334H.667a.667.667 0 0 1 0-1.334h14.666ZM5.076 1.25a1 1 0 0 1 .467.42l.048.096 3.703 8.467a.667.667 0 0 1-1.186.604l-.036-.07-1.501-3.433H2.778l-1.5 3.433a.667.667 0 0 1-.805.371L.4 11.11a.667.667 0 0 1-.371-.805l.027-.073 3.703-8.467a1 1 0 0 1 1.317-.516Zm10.257 8.084a.667.667 0 0 1 0 1.334h-4a.667.667 0 0 1 0-1.334h4Zm0-4a.667.667 0 0 1 0 1.334h-4a.667.667 0 1 1 0-1.334h4ZM4.675 2.997 3.36 5.999h2.626L4.675 2.997Zm10.658-1.664a.667.667 0 0 1 0 1.334h-4a.667.667 0 1 1 0-1.334h4Z\" fill=\"#646A73\" fill-rule=\"evenodd\"/></svg>"
    },
    {
        "name": "数值",
        "type": 3,
        "icon": "<svg width=\"16\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1.5 3.005H3v9.6H1.5v-8.17L0 5.465v-1.46l1.5-1Zm8.25 2.38c.09.71-.1 1.428-.53 2L7 11.235h2.75v1.35H5.32v-1.29l2.75-4.62c.191-.376.27-.8.23-1.22 0-.45 0-1-.77-1a.68.68 0 0 0-.76.71v.77H5.25v-.87a2.14 2.14 0 0 1 2.29-2.06 2.1 2.1 0 0 1 2.21 2.38Zm5.35 2.25c.9.52.9.84.9 2.19s-.08 1.54-.37 1.93a2 2 0 0 1-1.8.83 2 2 0 0 1-2.18-2v-.77h1.5v.71a.68.68 0 0 0 .75.7.72.72 0 0 0 .75-.77v-1.34c0-.7-.23-.9-1.2-.9v-1.16h-.15c.9 0 1.2-.13 1.2-.84v-1.21a.67.67 0 0 0-.75-.64.69.69 0 0 0-.75.64v.77h-1.5v-.77a2.16 2.16 0 0 1 2.25-2c.61 0 1.199.229 1.65.64.45.45.6.83.6 2s-.08 1.54-.9 1.99Z\" fill=\"#646A73\"/></svg>"
    },
    {
        "name": "数值区间",
        "type": 4,
        "icon": "<svg width=\"16\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"#646A73\" fill-rule=\"evenodd\"><path d=\"M1.5 3.005H3v9.6H1.5v-8.17L0 5.465v-1.46l1.5-1Zm13.6 4.63c.9.52.9.84.9 2.19s-.08 1.54-.37 1.93a2 2 0 0 1-1.8.83 2 2 0 0 1-2.18-2v-.77h1.5v.71a.68.68 0 0 0 .75.7.72.72 0 0 0 .75-.77v-1.34c0-.7-.23-.9-1.2-.9v-1.16h-.15c.9 0 1.2-.13 1.2-.84v-1.21a.67.67 0 0 0-.75-.64.69.69 0 0 0-.75.64v.77h-1.5v-.77a2.16 2.16 0 0 1 2.25-2c.61 0 1.199.229 1.65.64.45.45.6.83.6 2s-.08 1.54-.9 1.99Z\" fill-rule=\"nonzero\"/><path d=\"M5.333 7.333h5.333v1.333H5.333z\"/></g></svg>"
    },
    {
        "name": "单选框",
        "type": 5,
        "icon": "<svg width=\"16\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8 0c4.416 0 8 3.584 8 8s-3.584 8-8 8-8-3.584-8-8 3.584-8 8-8Zm0 1.333A6.67 6.67 0 0 0 1.333 8 6.67 6.67 0 0 0 8 14.667 6.67 6.67 0 0 0 14.667 8 6.67 6.67 0 0 0 8 1.333ZM8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z\" fill=\"#646A73\"/></svg>"
    },
    {
        "name": "多选框",
        "type": 6,
        "icon": "<svg width=\"16\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14.667 0C15.403 0 16 .597 16 1.333v10c0 .737-.597 1.334-1.333 1.334l-2-.001v2c0 .737-.597 1.334-1.334 1.334h-10A1.333 1.333 0 0 1 0 14.667v-10c0-.737.597-1.334 1.333-1.334h2v-2C3.333.597 3.93 0 4.667 0h10Zm-3.334 4.667h-10v10h10v-10ZM10.22 7.039c.24.24.26.619.056.88l-.056.063-3.764 3.764a1 1 0 0 1-1.338.069l-.076-.069L2.535 9.24a.667.667 0 0 1 .88-.998l.062.055 2.272 2.271L9.277 7.04c.26-.26.683-.26.943 0Zm4.447-5.706h-10v2h6.666c.737 0 1.334.597 1.334 1.334v6.666h2v-10Z\" fill=\"#646A73\"/></svg>"
    },
    {
        "name": "级联选择",
        "type": 7,
        "icon": "<svg width=\"16\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.377 5.667a.667.667 0 0 1 .078 1.329L9.377 7h-2.71a2.667 2.667 0 0 0-.133 5.33l.133.003H12a2.667 2.667 0 0 0 2.223-4.14.667.667 0 1 1 1.11-.738 4 4 0 0 1-3.183 6.21l-.15.002H6.667a4 4 0 0 1-.15-7.998l.15-.002h2.71Zm-.044-3.334a4 4 0 0 1 .15 7.998l-.15.002h-2.71a.667.667 0 0 1-.078-1.329L6.623 9h2.71a2.667 2.667 0 0 0 .133-5.33l-.133-.003H4a2.667 2.667 0 0 0-2.223 4.14.667.667 0 1 1-1.11.738 4 4 0 0 1 3.183-6.21L4 2.334h5.333Z\" fill=\"#646A73\"/></svg>"
    },
    {
        "name": "日期",
        "type": 8,
        "icon": "<svg width=\"16\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10.667.667c.368 0 .666.298.666.666V2H14c.736 0 1.333.597 1.333 1.333V14c0 .736-.597 1.333-1.333 1.333H2A1.333 1.333 0 0 1 .667 14V3.333C.667 2.597 1.264 2 2 2h2.666v-.667a.667.667 0 1 1 1.334 0V2h4v-.667c0-.368.298-.666.667-.666ZM14 3.333H2V14h12V3.333Zm-3.333 6a.667.667 0 0 1 0 1.334H5.333a.667.667 0 0 1 0-1.334h5.334ZM8 6.667A.667.667 0 1 1 8 8H5.333a.667.667 0 0 1 0-1.333H8Z\" fill=\"#646A73\"/></svg>"
    },
    {
        "name": "日期区间",
        "type": 9,
        "icon": "<svg width=\"16\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10.667.667c.368 0 .666.298.666.666V2H14c.736 0 1.333.597 1.333 1.333V14c0 .736-.597 1.333-1.333 1.333H2A1.333 1.333 0 0 1 .667 14V3.333C.667 2.597 1.264 2 2 2h2.666v-.667a.667.667 0 1 1 1.334 0V2h4v-.667c0-.368.298-.666.667-.666Zm3.333 6H2V14h12V6.667ZM11.775 9.77a.667.667 0 1 1-.883 1c-.44-.39-.907-.514-1.468-.392-.27.059-.473.158-.792.378l-.272.193c-.64.456-1.093.654-1.78.654-.956 0-1.756-.279-2.366-.844a.667.667 0 1 1 .906-.978c.349.323.824.489 1.46.489.318 0 .53-.08.892-.328l.258-.182c.532-.38.887-.571 1.411-.685.978-.212 1.878.026 2.634.695ZM14 3.333H2v2h12v-2Z\" fill=\"#646A73\"/></svg>"
    },
    {
        "name": "附件",
        "type": 10,
        "icon": "<svg width=\"16\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14.264 2.3c.361.365.63.773.806 1.225a3.807 3.807 0 0 1 0 2.785c-.176.451-.445.86-.806 1.225l-5.77 5.782c-.36.366-.805.67-1.333.913a4.732 4.732 0 0 1-1.672.427 4.665 4.665 0 0 1-1.8-.244c-.612-.203-1.18-.568-1.702-1.096-.512-.517-.868-1.078-1.07-1.681a4.675 4.675 0 0 1-.24-1.804c.04-.598.178-1.161.414-1.689a4.48 4.48 0 0 1 .896-1.339L7.11 1.676c.09-.092.223-.114.399-.069a.851.851 0 0 1 .4.206c.08.091.145.225.195.403.05.178.03.312-.06.403L2.936 7.732a3.655 3.655 0 0 0-.678.96 3.09 3.09 0 0 0-.136 2.435c.151.425.423.836.814 1.232.352.355.74.606 1.168.753.426.147.85.208 1.272.183a3.64 3.64 0 0 0 1.206-.282c.381-.162.708-.38.979-.654l5.754-5.768a2.56 2.56 0 0 0 .58-.852 2.28 2.28 0 0 0 .165-.875 2.026 2.026 0 0 0-.203-.845 2.781 2.781 0 0 0-.542-.76c-.432-.427-.917-.627-1.454-.602-.537.026-1.077.312-1.62.86l-5.196 5.22c-.23.233-.344.492-.339.776a.98.98 0 0 0 .279.7c.22.223.474.314.76.274.287-.04.52-.152.701-.335l4.715-4.733c.09-.091.223-.114.399-.068a.851.851 0 0 1 .4.205.92.92 0 0 1 .21.404c.05.177.03.312-.06.403l-4.73 4.733c-.362.365-.708.618-1.04.76a2.094 2.094 0 0 1-.933.19 1.823 1.823 0 0 1-.814-.235 3.437 3.437 0 0 1-.693-.518 2.437 2.437 0 0 1-.46-.624 2.039 2.039 0 0 1-.233-.837c-.02-.304.033-.629.159-.973.125-.345.369-.695.73-1.05.18-.183.342-.35.482-.503a7.82 7.82 0 0 1 .339-.35l.173-.167 4.203-4.23a4.333 4.333 0 0 1 1.182-.86 3.505 3.505 0 0 1 1.303-.358c.442-.03.877.03 1.303.183.427.152.821.41 1.183.776Z\" fill=\"#646A73\"/></svg>"
    },
    {
        "name": "图片",
        "type": 11,
        "icon": "<svg width=\"16\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13.333 1.333a2 2 0 0 1 2 2v9.334a2 2 0 0 1-2 2H2.667a2 2 0 0 1-2-2V3.333a2 2 0 0 1 2-2Zm-1.1 7.59-3.018 2.72-.02.017c-.545.44-1.33.38-1.804-.117l-.072-.083-1.2-1.485-3.95 3.135c.122.137.3.223.498.223h10.666a.667.667 0 0 0 .667-.666v-1.935l-1.767-1.808Zm1.1-6.256H2.667A.667.667 0 0 0 2 3.333v8.21L5.29 8.93a1.333 1.333 0 0 1 1.794.125l.072.082 1.2 1.486 2.984-2.69a1.333 1.333 0 0 1 1.765-.018l.081.077.814.833V3.333a.667.667 0 0 0-.568-.66l-.099-.006ZM5.333 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 1.333a.667.667 0 1 0 0 1.334.667.667 0 0 0 0-1.334Z\" fill=\"#646A73\"/></svg>"
    },
    {
        "name": "明细",
        "type": 12,
        "icon": "<svg width=\"16\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13.333 0c.737 0 1.334.597 1.334 1.333v13.334c0 .736-.597 1.333-1.334 1.333H2.667a1.333 1.333 0 0 1-1.334-1.333V1.333C1.333.597 1.93 0 2.667 0h10.666Zm0 1.333H2.667v13.334h10.666V1.333Zm-3.333 10a.667.667 0 0 1 0 1.334H4.667a.667.667 0 0 1 0-1.334H10ZM8.667 8a.667.667 0 0 1 0 1.333h-4a.667.667 0 1 1 0-1.333h4ZM5 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm3.333 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z\" fill=\"#646A73\"/></svg>"
    },
    {
        "name": "分组",
        "type": 40,
        "icon": "<svg width=\"16\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6 10c.736 0 1.333.597 1.333 1.333V14c0 .736-.597 1.333-1.333 1.333H2A1.333 1.333 0 0 1 .667 14v-2.667C.667 10.597 1.264 10 2 10h4Zm8-2.667c.736 0 1.333.597 1.333 1.334V14c0 .736-.597 1.333-1.333 1.333h-4A1.333 1.333 0 0 1 8.667 14V8.667c0-.737.597-1.334 1.333-1.334h4Zm-8 4H2V14h4v-2.667Zm8-2.666h-4V14h4V8.667Zm-8-8c.736 0 1.333.597 1.333 1.333v5.333c0 .737-.597 1.334-1.333 1.334H2A1.333 1.333 0 0 1 .667 7.333V2C.667 1.264 1.264.667 2 .667h4ZM6 2H2v5.333h4V2Zm8-1.333c.736 0 1.333.597 1.333 1.333v2.667C15.333 5.403 14.736 6 14 6h-4a1.333 1.333 0 0 1-1.333-1.333V2c0-.736.597-1.333 1.333-1.333h4ZM14 2h-4v2.667h4V2Z\" fill=\"#646A73\"/></svg>"
    },
    {
        "name": "布局容器",
        "type": 41,
        "icon": "<svg width=\"16\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6 .667c.736 0 1.333.597 1.333 1.333v12c0 .736-.597 1.333-1.333 1.333H2A1.333 1.333 0 0 1 .667 14V2C.667 1.264 1.264.667 2 .667h4Zm8 0c.736 0 1.333.597 1.333 1.333v12c0 .736-.597 1.333-1.333 1.333h-4A1.333 1.333 0 0 1 8.667 14V2c0-.736.597-1.333 1.333-1.333h4ZM6 2H2v12h4V2Zm8 0h-4v12h4V2Z\" fill=\"#646A73\"/></svg>"
    },
]
