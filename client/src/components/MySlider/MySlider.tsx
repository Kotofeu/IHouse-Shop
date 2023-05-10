import { FC, ReactNode } from 'react';

import Slider, { Settings } from "react-slick";
import './MySlider.scss'
interface IMySlider {
    settings?: Settings,
    children: ReactNode
}

const MySlider: FC<IMySlider> = (props) => {
    const { settings, children } = props

    return (
        <Slider {...settings}>
            {children}
        </Slider>
    );
}

export default MySlider;