import './index-style'
import * as components from '@/components'

import React from 'react'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))
const App = (<components.Button>111</components.Button>)
root.render(App)

export default components
