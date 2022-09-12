# Tabs 标签页

选项卡切换组件

## Props

|  属性   | 说明  | 类型  | 默认值  |
|  ----  | ----  |  ----  | ----  |
| items  | 配置选项卡内容 | TabItem  | [] |
| centered  | 标签居中展示（选中项始终保持在中间） | boolean  | false |
| activeKey  | 当前激活 tab 面板的 key | string \| number  | - |
| destroyInactiveTabPane  | 被隐藏时是否销毁 DOM 结构 | boolean  | false |
| onChange  | 切换面板的回调 | (tabKey) => any  | - |

### TabItem

|  属性   | 说明  | 类型  | 默认值  |
|  ----  | ----  |  ----  | ----  |
| label  | 选项卡头显示文字 | string  | - |
| key  | 对应 activeKey | string \| number  | - |
| children  | 选项卡头显示内容 | ReactNode  | - |
| forceRender  | 被隐藏时是否渲染 DOM 结构 | boolean  | false |
| disabled  | 禁用某一项 | boolean  | false |
