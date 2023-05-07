import { FC, ReactNode } from 'react'
import classes from './Container.module.scss'
export enum ContainerType {
  containerFluid = classes.containerFluid
}
interface IContainerProps {
  children: ReactNode;
  containerType?: ContainerType;
}
const Container: FC<IContainerProps> = (props) => {
  const { children, containerType } = props
  return (
    <div className={
      [classes.container, containerType ? containerType : '']
        .join(' ')
    }>
      {children}
    </div>
  )
}

export default Container