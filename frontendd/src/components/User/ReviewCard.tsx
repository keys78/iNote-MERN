/* eslint-disable @next/next/no-img-element */
import { Star } from 'phosphor-react'
import React, { useEffect } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
import '@splidejs/react-splide/css/core';
import '@splidejs/react-splide/css';
import { useAppDispatch, useAppSelector } from '@/network/hooks';
import { getAllReviews } from '@/features/private/review/reviewSlice';



const ReviewCard = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllReviews())
    }, [dispatch])


    const { reviews } = useAppSelector((state) => state.reviews)

    return (
        <Splide
            options={{
                rewind: true,
                gap: '2px',
                autoplay: true,
                pauseOnHover: true,
                interval: 5000,
                speed: 5000,
                perPage: 1,
                autoHeight: true,
                autoWidth: true,
                arrows: false,
                isNavigation: false,
            }}

            aria-label="iNote reviews"
            className='max-w-[510px]'
        >
            {reviews?.map((val: any, i: number) =>
                <SplideSlide key={i}>
                    <div className='review-card my-3' key={i}>
                        <div>
                            <img src={'https://source.unsplash.com/random/300x200'} alt='' />
                            <div className='user-details'>
                                <h1>{val?.username}</h1>
                                <h2>{val?.role}</h2>
                                <span>
                                    {Array.from({ length: val?.starRating }, (_, i) => (
                                        <Star key={i} size={20} color="#4a4db0" weight="fill" />
                                    ))}
                                </span>
                            </div>
                        </div>
                        <article>{val?.comment}</article>
                    </div>
                </SplideSlide>
            )}

        </Splide>
    )
}

export default ReviewCard;