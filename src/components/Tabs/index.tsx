/*
 * @Author: kim
 * @Date: 2022-08-16 17:42:53
 * @Description: 标签页
 */
import { FC, ReactNode, useCallback, useRef, useEffect, useState } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/components/config'

export interface TabItem {
  label: string // 标签名称
  key: string | number // tabKey
  children: ReactNode
  forceRender?: boolean // 被隐藏时是否渲染 DOM 结构
  disabled?: boolean // 是否禁用
}

export interface TabNavProps {
  prefixCls?: string
  className?: string
  items?: Array<TabItem>
  centered?: boolean // 标签居中展示
  activeKey?: number | string // 当前活动页
  onChange?: (tabKey: number | string) => any
}

export interface TabsProps extends TabNavProps {
  destroyInactiveTabPane?: boolean // 隐藏是否销毁
  children?: ReactNode
  onChange?: (tabKey: number | string) => any
}

let _prevActiveKey: number | string | undefined // 记录上一次的 activeKey
let scrollLeft = 0 // 用于记录滚动，因为 useState 更新是异步的
let _scrollLimit = {
  minScrollLeft: 0,
  maxScrollLeft: 0
}
let prevTouch = {
  pageX: 0,
  pageY: 0
}

// tab nav 标签页导航
const TabsNav: FC<TabNavProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    centered = false,
    items = [],
    activeKey,
    onChange
  } = props
  const navRef = useRef<HTMLDivElement>(null)
  const navListRef = useRef<HTMLDivElement>(null)
  const [touchLock, setTouchLock] = useState(false)
  const [scrollData, setScrollData] = useState({
    scrollLeft: 0,
    scrollTop: 0
  })

  const prefixCls = getPrefixCls('tabs', customizePrefixCls)

  // 滚动上下限
  useEffect(() => {
    if (!navRef.current || !navListRef.current || !navListRef.current.children.length) {
      _scrollLimit = {
        minScrollLeft: 0,
        maxScrollLeft: 0
      }
      return
    }

    const wrapW = navRef.current.clientWidth
    const width = navListRef.current.clientWidth

    if (!centered) {
      _scrollLimit = {
        minScrollLeft: wrapW - width,
        maxScrollLeft: 0
      }
      return
    }

    // 没有子节点，滚动个锤子
    const listChildren = navListRef.current.children
    // 计算上下限范围
    const halfW = wrapW / 2
    const firstChild = listChildren[0]
    const lastChild = listChildren[listChildren.length - 1]

    _scrollLimit = {
      minScrollLeft: wrapW - width - halfW + lastChild.clientWidth / 2,
      maxScrollLeft: halfW - firstChild.clientWidth / 2
    }
  }, [navRef, navListRef, items])

  /**
   * @description: 鼠标滚动
   * @param {any} e
   * @return {void}
   */
  const handleScroll = useCallback((e: any) => {
    const { deltaX } = e

    const distance = scrollLeft - deltaX * 0.6
    if (deltaX >= 0) {
      // 右滚动（手指右往左滑）
      scrollLeft = distance <= _scrollLimit.minScrollLeft ? _scrollLimit.minScrollLeft : distance
      setScrollData({
        ...scrollData,
        scrollLeft
      })
    } else {
      // 左滚动
      scrollLeft = distance >= _scrollLimit.maxScrollLeft ? _scrollLimit.maxScrollLeft : distance
      setScrollData({
        ...scrollData,
        scrollLeft
      })
    }
  }, [scrollData])

  /**
   * @description: 自动居中选中
   * @return {void}
   */
  const _handleCenterSelect = useCallback(() => {
    if (!navListRef.current) return

    const selectChild = Array.from(navListRef.current.children).find(child => {
      const key = child.getAttribute('data-key')
      return key == activeKey
    }) as HTMLElement

    if (!selectChild) return

    scrollLeft = _scrollLimit.maxScrollLeft - selectChild.offsetLeft
    setScrollData({
      ...scrollData,
      scrollLeft
    })
  }, [navListRef, activeKey, scrollData])

  /**
   * @description: 触摸开始（移动端）
   * @return {void}
   */
  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.stopPropagation()
    setTouchLock(true)
    const touch = e.targetTouches[0]
    prevTouch.pageX = touch.pageX
  }, [])

  /**
   * @description: 触摸移动（移动端）
   * @return {void}
   */
  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.stopPropagation()
    if (!touchLock) return

    const touch = e.targetTouches[0]
    let distance = touch.pageX - prevTouch.pageX
    if (distance > 0) {
      scrollLeft = scrollLeft + distance >= _scrollLimit.maxScrollLeft ? _scrollLimit.maxScrollLeft : scrollLeft + distance
    } else {
      scrollLeft = scrollLeft + distance <= _scrollLimit.minScrollLeft ? _scrollLimit.minScrollLeft : scrollLeft + distance
    }

    setScrollData({
      ...scrollData,
      scrollLeft
    })

    prevTouch.pageX = touch.pageX
  }, [scrollData, touchLock])

  /**
   * @description: 触摸结束（移动端）
   * @return {void}
   */
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    e.stopPropagation()
    setTouchLock(false)
  }, [])

  useEffect(() => {
    if (activeKey !== _prevActiveKey) {
      _prevActiveKey = activeKey
      // 更新选中      
      centered && _handleCenterSelect()
    }
  }, [activeKey, centered, _handleCenterSelect])

  useEffect(() => {
    if (navRef.current) {
      navRef.current.addEventListener('touchstart', handleTouchStart)
      navRef.current.addEventListener('touchmove', handleTouchMove)
      navRef.current.addEventListener('touchend', handleTouchEnd)
      navRef.current.addEventListener('mousewheel', handleScroll)
    }

    return () => {
      if (navRef.current) {
        navRef.current.removeEventListener('touchstart', handleTouchStart)
        navRef.current.removeEventListener('touchmove', handleTouchMove)
        navRef.current.removeEventListener('touchend', handleTouchEnd)
        navRef.current.removeEventListener('mousewheel', handleScroll)
      }
    }
  }, [centered, navRef, handleScroll, handleTouchStart, handleTouchMove, handleTouchEnd])

  /**
   * @description: tab 点击
   * @param {object} tab
   * @return {void}
   */
  const handleTabClick = useCallback((tab: TabItem) => {
    if (tab.disabled || tab.key === activeKey) return

    onChange && onChange(tab.key)
  }, [onChange, activeKey])


  return <div className={`${prefixCls}-nav-wrap`} ref={navRef}>
    <div
      className={`${prefixCls}-nav-list`}
      ref={navListRef}
      style={{
        transform: `translate(${scrollData.scrollLeft}px, ${scrollData.scrollTop}px)`,
        ...(touchLock ? { transition: 'none 0s ease 0s' } : {})
      }}>
      {items.map((tab) => {
        return <div
          className={`${prefixCls}-tab ${activeKey === tab.key ? `${prefixCls}-tab-active` : ''} ${tab.disabled ? `${prefixCls}-tab-disabled` : ''}`}
          key={tab.key}
          data-key={tab.key}
          onClick={() => handleTabClick(tab)}>
          {tab.label}
        </div>
      })}
    </div>
  </div>
}

// 标签页
const Tabs: FC<TabsProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    activeKey,
    destroyInactiveTabPane = false,
    centered = false,
    items = [],
    onChange
  } = props

  const prefixCls = getPrefixCls('tabs', customizePrefixCls)

  const classes = classNames(
    prefixCls,
    className,
  )

  return <div className={classes}>
    <TabsNav items={items} activeKey={activeKey} onChange={onChange} centered={centered} />

    <div className={`${prefixCls}-content-holder`}>
      <div className={`${prefixCls}-content`}>
        {
          items.map(item => {
            return <div className={`${prefixCls}-tabpane`} style={activeKey === item.key ? {} : { display: 'none' }} key={item.key}>
              {(activeKey === item.key || (item.forceRender || !destroyInactiveTabPane)) && item.children}
            </div>
          })
        }
      </div>
    </div>
  </div>
}

export default Tabs
