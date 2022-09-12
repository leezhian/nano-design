/*
 * @Author: kim
 * @Date: 2022-09-07 15:48:57
 * @Description: 开关
 */

import { FC, MouseEvent, useCallback, useEffect, useState, useMemo } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/components/config'
import Icon from '@/components/Icon'

export interface SwitchProps {
  prefixCls?: string
  className?: string
  disabled?: boolean // 是否禁用
  loading?: boolean // 加载中的开关
  checked?: boolean // 指定当前是否选中
  size?: number | string // 开关尺寸，默认单位为 px
  onChange?: (checked: boolean, e: MouseEvent<HTMLButtonElement>) => any
}

const Switch: FC<SwitchProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    loading = false,
    disabled = false,
    checked = false,
    size,
    onChange
  } = props
  const [switchChecked, setSwitchChecked] = useState(false)

  useEffect(() => {
    if (checked !== switchChecked) {
      setSwitchChecked(checked)
    }
  }, [checked])

  const prefixCls = getPrefixCls('switch', customizePrefixCls)

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-checked`]: switchChecked,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-loading`]: loading
    },
    className,
  )

  // 样式计算
  const styles = useMemo(() => {
    if (size !== undefined && size !== null) {
      return {
        fontSize: `${size}px`
      }
    }

    return {}
  }, [size])

  /**
   * @description: 选择状态切换
   * @return {void}
   */
  const handleChangeCheck = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const nextChecked = !switchChecked
    setSwitchChecked(nextChecked)
    onChange && onChange(nextChecked, e)
  }, [switchChecked, onChange])

  return <button
    className={classes}
    style={styles}
    disabled={disabled || loading}
    onClick={handleChangeCheck}>
    <div className={`${prefixCls}-handle`}>
      { loading && <Icon className={`${prefixCls}-loading-icon`} type='loading' /> }
    </div>
  </button>
}

export default Switch