// 导出所有style/index
const req = import.meta.glob('./src/components/**/style/index.ts?(x)', { eager: true })
const mods = {}

Object.keys(req).forEach((mod) => {
  const match = mod.match(/^\.\/src\/components\/([^_][\w-]+)\/style\/index\.tsx?$/)
  const modName = match && match[1] ? match[1] : 'style'
  // const [modName] = req[mod]
  mods[modName] = req[mod]
})

export default mods
