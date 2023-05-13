import { ReactNode, memo } from 'react';
import { Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore,{ SwiperOptions, Pagination, Navigation, Scrollbar, A11y} from 'swiper';

import 'swiper/swiper-bundle.min.css'
SwiperCore.use([ Pagination, Navigation, Scrollbar, A11y])
interface IMySlider<T> {
    settings?: SwiperOptions,
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    className?: string,
    slideClass?: string,
    addArrows?: boolean,
    addDots?: boolean,
    addScrollBar?: boolean
}

export default function MySlider<T>(props: IMySlider<T>) {
    const {
        settings,
        items,
        renderItem,
        className,
        slideClass,
    } = props

    return (
        <Swiper
            {...settings}
            className={className}
        >
            {
                items.length && items.map((item, index) =>
                    <SwiperSlide
                        key={index}
                        className={slideClass}
                    >
                        {renderItem(item, index)}
                    </SwiperSlide>
                )
            }
        </Swiper>
    );
}