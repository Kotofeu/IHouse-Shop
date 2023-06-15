import { memo, FC } from 'react'
import ServerImage from '../../../UI/ServerImage/ServerImage';
import { IGoodImage } from '../../../store/GoodStore';
import { Swiper, SwiperSlide } from 'swiper/react';
interface IGoodImages {
    className?: string;
    imageClass: string;
    images?: IGoodImage | IGoodImage[];
    alt: string;

}
const settings = {
    slidesPerView: 3,
    spaceBetween: 5,
    navigation: { enabled: true },
    scrollbar: { draggable: true },
    autoHeight: true,
    autoplay: true
    
}
const GoodImages: FC<IGoodImages> = memo((props) => {
    const { className, imageClass, images, alt } = props
    if (Array.isArray(images) && !images.length) {
        return (
            <ServerImage className={imageClass} src={undefined} alt={alt} />
        )
    }
    if (!Array.isArray(images)) {
        return (
            <ServerImage className={imageClass} src={images?.image || undefined} alt={alt} />
        )
    }
    if (images.length === 1){
        return (
            <ServerImage className={imageClass} src={images[0].image || undefined} alt={alt} />
        )
    }
    else {
        return (
            <Swiper
                className={className}
                {...settings}
                
            >
                {
                    images.length ? images.map((image, index) =>
                        <SwiperSlide
                            key={image.id}
                        >
                            <ServerImage className={imageClass} src={image.image} alt={alt + ": " + index} />
                        </SwiperSlide>
                    ) : null
                }
            </Swiper>
        )
    }
})

export default GoodImages