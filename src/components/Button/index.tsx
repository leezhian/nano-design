/*
 * @Author: kim
 * @Date: 2022-09-07 18:10:32
 * @Description: 按钮
 */
import { FC, ReactNode, MouseEvent, useCallback } from 'react'
import classNames from 'classnames'
import Icon from '@/components/Icon'
import { getPrefixCls } from '@/components/config'

export interface ButtonProps {
  prefixCls?: string
  className?: string
  loading?: boolean // 是否加载中
  block?: boolean // 将按钮宽度调整为其父宽度的选项
  disabled?: boolean // 按钮失效状态
  ghost?: boolean // 幽灵属性，使按钮背景透明
  danger?: boolean // 设置危险按钮
  shape?: 'default' | 'circle' | 'round' // 设置按钮形状
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default' // 设置按钮类型
  size?: 'large' | 'normal' | 'small' | 'mini' // 设置按钮大小
  onClick?: (e: MouseEvent<HTMLButtonElement>) => any
  children?: ReactNode
}

const Button: FC<ButtonProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    loading = false,
    block = false,
    disabled = false, 
    danger = false, 
    ghost = false, 
    size = 'normal', 
    shape = 'default', 
    type = 'default', 
    onClick, 
    children 
  } = props

  const prefixCls = getPrefixCls('button',customizePrefixCls)

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-${shape}`]: shape !== 'default' && shape,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-${size}`]: size && size !== 'normal',
      [`${prefixCls}-ghost`]: ghost,
      [`${prefixCls}-dangerous`]: !!danger,
    },
    className,
  )

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    onClick && onClick(e)
  }, [disabled, onClick])

  return <button
    className={classes}
    disabled={disabled}
    onClick={handleClick}>
    {loading && <span className={`${prefixCls}-loading-icon`}><Icon type='loading' /></span>}
    <span>{children}</span>
  </button>
}

export default Button
