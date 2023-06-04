import { ReactNode } from 'react'


import Title, { TitleType } from '../../UI/Title/Title';
import Loader from '../../UI/Loader/Loader';


import classes from './SectionList.module.scss'

interface ISectionList<T> {
    className?: string;
    title: string;
    error: any;
    emptySubtitle: string;
    isLoading: boolean;
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    footer?: ReactNode
}
export default function SectionList<T>(props: ISectionList<T>) {
    const {
        className,
        title,
        error,
        emptySubtitle,
        isLoading,
        items,
        renderItem,
        footer
    } = props
    const sectionClassName = [className, classes.sectionList].join(' ')
    return (
        <section className={sectionClassName}>
            <Title
                className={classes.sectionList_title}
                titleType={[TitleType.posCetner, TitleType.sectionTitle]}>
                {
                    error
                        ? error.message ? error.message : "Нередвиденная ошибка"
                        : title
                }
            </Title>
            {
                isLoading && !items?.length ? <Loader /> : null
            }
            {
                items && items.map(renderItem)}
            {
                !items?.length && !isLoading
                    ? <Title titleType={[TitleType.posCetner]}>{emptySubtitle}</Title>
                    : null
            }
            {
                footer ? footer : null
            }
        </section>
    )
}
