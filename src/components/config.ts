export const defaultPrefixCls = 'nano'

/**
 * @description: 获取类名前缀
 * @param {string} suffixCls 自定义后缀
 * @param {string} customizePrefixCls 自定义前缀
 * @return {string}
 */
export const getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if(customizePrefixCls) return customizePrefixCls

  return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls
}