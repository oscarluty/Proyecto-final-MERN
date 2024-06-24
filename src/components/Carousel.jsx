// src/components/Carousel.jsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image1 from '../assets/img/carrusel5.png';
import image2 from '../assets/img/carrusel2.png';
import image3 from '../assets/img/ideogram2.jpg';
import image4 from '../assets/img/carrusel4.png';

const images = [image1, image2, image3, image4];

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, // Cambia de imagen cada 3 segundos
    };

    return (
        <div className="flex justify-center items-center py-8">
            <div className="w-full sm:w-3/4 lg:w-1/2">
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`Slide ${index}`} className="w-full h-auto " />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Carousel;
