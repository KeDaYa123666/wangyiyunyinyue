import React, { memo } from 'react'
import type { ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const AppFooter: React.FC<IProps> = () => {
  return <h2>App Footer界面的搭建</h2>
}

export default memo(AppFooter)
