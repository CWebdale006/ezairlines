import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

export default function Carousel() {
    const handleOnDragStart = (e) => e.preventDefault();
    return (
        <AliceCarousel mouseTrackingEnabled>
            <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg' onDragStart={handleOnDragStart} className='' alt='img' />
            <img src='https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-260nw-407021107.jpg' onDragStart={handleOnDragStart} className='' alt='img' />
            <img src='https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg' onDragStart={handleOnDragStart} className='' alt='img' />
        </AliceCarousel>
    )
}
