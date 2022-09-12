/*
 * @Author: kim
 * @Date: 2022-09-01 10:11:31
 * @Description: 空状态
 */
import { FC, ReactNode, CSSProperties } from 'react'
import classNames from 'classnames'
import { getPrefixCls } from '@/components/config'
import SmallEmpty from '@/assets/images/empty-small.png'

export interface EmptyProps {
  prefixCls?: string
  className?: string
  imageStyle?: CSSProperties // 图片样式
  image?: ReactNode // 图片
  description?: ReactNode // 描述
}

const PRESET_IMAGE_SIMPLE = SmallEmpty // 预设小图

const Empty: FC<EmptyProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    image = PRESET_IMAGE_SIMPLE,
    description,
    imageStyle } = props

  const prefixCls = getPrefixCls('empty', customizePrefixCls)

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-empty-normal`]: !!description
    },
    className,
  )

  return <div className={classes}>
    <div className={`${prefixCls}-image`} style={imageStyle}>
      {
        typeof image === 'string'
          ? <img src={image} alt="" />
          : image
      }
    </div>
    {description && <div className={`${prefixCls}-description`}>
      {description}
    </div>}
  </div>
}

export default Empty