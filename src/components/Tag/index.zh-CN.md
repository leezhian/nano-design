# Tag 标签

标记和分类的小标签

## Props

|  属性   | 说明  | 类型  | 默认值  |
|  ----  | ----  |  ----  | ----  |
| closable  | 标签是否可以关闭（点击默认关闭）暂未实现 | boolean  | false |
| onClose  | 关闭时的回调 | event => any  | - |

### Tag.CheckableTag

|  属性   | 说明  | 类型  | 默认值  |
|  ----  | ----  |  ----  | ----  |
| checked  | 设置标签的选中状态 | boolean  | false |
| onChange  | 点击标签时触发的回调 | (checked) => any  | - |
