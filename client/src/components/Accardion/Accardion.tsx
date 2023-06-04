import { ReactNode, Dispatch } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import arrowImage from '../../assets/icons/Arrow.svg'

import classes from './Accardion.module.scss'

interface IAccardion<T> {
    className?: string;
    listClassName?: string;
    titleElement: ReactNode;
    items: T[];
    isOpen: boolean;
    isMouseReact?: boolean;
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
    renderItem: (item: T, index: number) => ReactNode;
}
function Accardion<T>(props: IAccardion<T>) {
    const {
        className = '',
        listClassName = '',
        titleElement,
        items,
        isOpen,
        isMouseReact = true,
        setIsOpen,
        renderItem
    } = props
    const actionHandler = (state?: boolean) => {
        state ? setIsOpen(state) : setIsOpen(prev => !prev)
    }
    return (
        <div
            className={[classes.accardion, className].join(' ')}
            onMouseEnter={isMouseReact ? () => actionHandler(true) : undefined}
            onMouseLeave={isMouseReact ? () => actionHandler(false) : undefined}
        >
            <div className={classes.accardion_title}>
                {titleElement}
                {
                    items.length
                        ? <button
                            className={
                                [
                                    classes.accardion_openButton,
                                    isOpen ? classes.accardion_openButton___active : ""
                                ]
                                    .join(' ')
                            }
                            onClick={() => actionHandler()}
                            type='button'>
                            <img src={arrowImage} alt='arrow'></img>
                        </button> : null
                }
            </div>
            <AnimatePresence initial={false}>
                {
                    items.length && isOpen
                        ? <motion.div
                            className={[classes.accardion_typeList, listClassName].join(' ')}
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1, height: "auto" },
                                collapsed: { opacity: 0, height: 0 }
                            }}
                        >
                            {items.map(renderItem)}
                        </motion.div>
                        : null
                }
            </AnimatePresence>
        </div>
    )
}

export default Accardion