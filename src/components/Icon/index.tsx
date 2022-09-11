/*
 * @Author: kim
 * @Date: 2022-09-09 09:36:37
 * @Description: 图标
 */
import { CSSProperties, FC, useMemo } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/components/config'
import { ReactComponent as LoadingIcon } from '@/assets/images/loading.svg'

export interface IconProps {
  prefixCls?: string
  className?: string
  type?: string, // 内置图标
  spin?: boolean // 是否旋转
  style?: CSSProperties
  component?: any // 自定义图标
}

const IconMap: { [key: string]: any } = {
  loading: LoadingIcon
}

const Icon: FC<IconProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    spin = false,
    component,
    type
  } = props

  const prefixCls = getPrefixCls('icon', customizePrefixCls)

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-spin`]: spin,
    },
    className,
  )

  const icon = useMemo(() => {
    if (type) {
      return IconMap[type]()
    }

    if (component) {
      return component()
    }

    return
  }, [type, component])

  return <span className={classes} style={style}>
    {icon}
  </span>
}

export default Icon
