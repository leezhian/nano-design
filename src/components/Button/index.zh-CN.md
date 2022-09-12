# Button 按钮

分为主按钮，默认按钮，虚线按钮，文本按钮和链接按钮。

## Props

|  属性   | 说明  | 类型  | 默认值  |
|  ----  | ----  |  ----  | ----  |
| block  | 将按钮宽度调整为其父宽度的选项 | boolean  | false |
| danger  | 设置危险按钮 | boolean  | false |
| disabled  | 按钮失效状态 | boolean  | false |
| ghost  | 幽灵属性，使按钮背景透明 | boolean  | false |
| loading  | 设置按钮载入状态 | boolean  | false |
| shape  | 设置按钮形状 | `default` \| `circle` \| `round` \| `mini`  | `default` |
| size  | 设置按钮大小 | `large` \| `normal` \| `small` \| `mini`  | `normal` |
| type  | 设置按钮类型 | `primary` \| `dashed` \| `link` \| `text` \| `default`  | `default` |
| onClick  | 点击按钮时的回调 | (event) => any  | - |
