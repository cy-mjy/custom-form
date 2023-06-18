import single_line_text from '../assets/images/single_line_text.svg?raw'
import multiple_line_text from '../assets/images/multiple_line_text.svg'
import number from '../assets/images/number.svg'
import number_range from '../assets/images/number_range.svg'
import radio_box from '../assets/images/radio_box.svg'
import check_box from '../assets/images/check_box.svg'
import date from '../assets/images/date.svg'
import date_range from '../assets/images/date_range.svg'
import cascade_box from '../assets/images/cascade_box.svg'
import attachement from '../assets/images/attachement.svg'
import picture from '../assets/images/picture.svg'
import detail from '../assets/images/detail.svg'
import group from '../assets/images/group.svg'
import layout from '../assets/images/layout.svg'

export const widgets = [
  {
    desc: '常用控件',
    widgets: [
      {
        name: '单行文本',
        type: 1,
        icon: single_line_text,
      },
      {
        name: '多行文本',
        type: 2,
        icon: multiple_line_text,
      },
      {
        name: '数值',
        type: 3,
        icon: number,
      },
      {
        name: '数值区间',
        type: 4,
        icon: number_range,
      },
      {
        name: '单选框',
        type: 5,
        icon: radio_box,
      },
      {
        name: '多选框',
        type: 6,
        icon: check_box,
      },
      {
        name: '级联选择',
        type: 7,
        icon: cascade_box,
      },
      {
        name: '日期',
        type: 8,
        icon: date,
      },
      {
        name: '日期区间',
        type: 9,
        icon: date_range,
      },
      {
        name: '附件',
        type: 10,
        icon: attachement,
      },
      {
        name: '图片',
        type: 11,
        icon: picture,
      },
      {
        name: '明细',
        type: 12,
        icon: detail,
      },
    ],
  },
  {
    desc: '布局组件',
    widgets: [
      {
        name: '分组',
        type: 40,
        icon: group,
      },
      {
        name: '布局容器',
        type: 41,
        icon: layout,
      },
    ],
  },
]
