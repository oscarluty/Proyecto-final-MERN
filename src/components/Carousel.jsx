// src/components/Carousel.jsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchCarrusel } from '../fetch/fetchCarrusel';
const Carousel = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadImages = async () => {
            try {
                const carruselData = await fetchCarrusel();
                setImages(carruselData);
                setLoading(false);
            } catch (err) {
                console.error('Error loading carrusel images:', err);
                setError('Failed to load images. Please try again later.');
                setLoading(false);
            }
        };

        loadImages();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex justify-center items-center py-8">
            <div className="w-full sm:w-3/4 lg:w-1/2">
                <Slider {...settings}>
                    {images.map((item, index) => (
                        <div key={item._id}>
                            <img src={item.imagen} alt={`Slide ${index}`} className="w-full h-auto object-cover" />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Carousel;