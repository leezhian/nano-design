/*
 * @Author: kim
 * @Date: 2022-09-01 11:11:21
 * @Description: 加载中
 */
import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/components/config'
import Icon from '@/components/Icon'

export interface SpinProps {
  prefixCls?: string
  className?: string
  indicator?: ReactNode // 加载指示符
  spinning?: boolean // 是否为加载中状态，默认true
  tip?: ReactNode // 自定义描述文案
  wrapperClassName?: string // 包装器的类属性
  children?: ReactNode
}

// 加载指示器
const SpinIndicator: FC<SpinProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    indicator,
    tip,
    spinning = true
  } = props

  const prefixCls = getPrefixCls('spin', customizePrefixCls)

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-spinning`]: spinning,
      [`${prefixCls}-show-text`]: !!tip,
    },
    className,
  )

  return <div className={classes}>
    {indicator
      ? indicator
      : <div className={`${prefixCls}-indicator`}>
        <Icon type='loading' />
      </div>}
    {tip && <div className={`${prefixCls}-text`}>{tip}</div>}
  </div>
}

const Spin: FC<SpinProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    wrapperClassName,
    children,
    spinning = true
  } = props

  const prefixCls = getPrefixCls('spin', customizePrefixCls)

  const classes = classNames(
    `${prefixCls}-nested-loading`,
    wrapperClassName,
    className,
  )

  return <>
    {
      children
        ? <div className={classes}>
          {spinning && <div>
            <SpinIndicator {...props} />
          </div>}
          <div className={`${prefixCls}-container ${spinning ? `${prefixCls}-blur` : ''}`}>
            {children}
          </div>
        </div>
        : <SpinIndicator {...props} />
    }
  </>
}

export default Spin
