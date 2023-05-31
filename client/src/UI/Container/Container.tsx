import { FC, ReactNode } from 'react'
import classes from './Container.module.scss'

interface IContainerProps {
  children: ReactNode;
}
const Container: FC<IContainerProps> = (props) => {
  const { children } = props
  return (
    <div className={
      classes.container
    }>
      {children}
    </div>
  )
}

export default Container