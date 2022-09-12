/*
 * @Author: kim
 * @Date: 2022-09-08 14:34:58
 * @Description: 标签
 */
import { FC, MouseEvent, ReactNode, useCallback } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/components/config'

export interface TagProps {
  prefixCls?: string
  className?: string
  children?: ReactNode
  closable?: boolean // 标签是否可以关闭（点击默认关闭）
  onClose?: (event: MouseEvent<HTMLButtonElement>) => any // 关闭时的回调
  onClick?: (event: MouseEvent<HTMLButtonElement>) => any
}

export interface CheckableTagProps {
  prefixCls?: string
  className?: string
  children?: ReactNode
  checked?: boolean // 设置标签的选中状态
  onChange?: (checked: boolean) => any // 点击标签时触发的回调
}

// check 标签
const CheckableTag: FC<CheckableTagProps> = (props) => {
  const { prefixCls: customizePrefixCls, children, className, checked = false, onChange } = props

  const prefixCls = getPrefixCls('tag',customizePrefixCls)

  const classes = classNames(
    `${prefixCls}-checkable`,
    {
      [`${prefixCls}-checkable-checked`]: checked
    },
    className,
  )

  const handleChange = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    
    onChange && onChange(!checked)
  }, [checked])

  return <Tag className={classes} onClick={handleChange}>
    {children}
  </Tag>
}

// 标签
const Tag = (props: TagProps) => {
  // TODO closbale 暂未实现 , closable = false
  const { prefixCls: customizePrefixCls, className, children,  onClick } = props

  const prefixCls = getPrefixCls('tag',customizePrefixCls)

  const classes = classNames(
    prefixCls,
    className,
  )

  const handleTagClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e)
  }

  return <span
    className={classes}
    onClick={handleTagClick}>
    <span>{children}</span>
  </span>
}

Tag.CheckableTag = CheckableTag

export default Tag