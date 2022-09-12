/*
 * @Author: kim
 * @Date: 2022-08-17 16:54:17
 * @Description: 导航栏
 */
import { FC, ReactNode, useCallback } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/components/config'
import IconLeft from '@/assets/images/icon-left.png'

export interface NavBarProps {
  prefixCls?: string
  className?: string
  title?: string // 标题
  fixed?: boolean // 是否固定在顶部, 默认false
  ghost?: boolean // 是否是幽灵导航栏, 即透明底, 默认false
  extra?: ReactNode
  zIndex?: string | number // 导航栏 z-index
  onLeftClick?: () => void
}

const NavBar: FC<NavBarProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    title,
    fixed = false,
    ghost = false,
    zIndex = 1,
    extra,
    onLeftClick
  } = props

  const prefixCls = getPrefixCls('navbar', customizePrefixCls)

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-ghost`]: ghost,
      [`${prefixCls}-fixed`]: fixed,
    },
    className,
  )

  const handleBackClick = useCallback(() => {
    onLeftClick && onLeftClick()
  }, [onLeftClick])

  return <div className={classes} style={{ zIndex }}>
    <div className={`${prefixCls}-left`} onClick={handleBackClick}>
      <img className={`${prefixCls}-icon`} src={IconLeft} alt="" />
    </div>
    <div className={`${prefixCls}-title nano-ellipsis`}>
      {title}
    </div>
    {
      extra && <div className={`${prefixCls}-right`}>{extra}</div>
    }
  </div>
}

export default NavBar