/* eslint-disable @next/next/no-img-element */
import { Heart, Star } from 'phosphor-react'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";


// import required modules
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper";

const ReviewCard = () => {

    const sampleData = [
        { username: 'Volcano', role: 'user', photo: 'https://source.unsplash.com/random/300x200', star: 3, comment: 'lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab praesentium minus quaerat cumque ut, repellat maxime enim a ipsa autem accusamus quos modi sunt?' },
        { username: 'Volcano', role: 'user', photo: 'https://source.unsplash.com/random/300x200', star: 3, comment: 'lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab praesentium minus quaerat cumque ut, repellat maxime enim a ipsa autem accusamus quos modi sunt?' },
    ]

    return (
        <div className='flex space-x-3'>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={1}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {sampleData.map((val: any, i: number) =>
                    <SwiperSlide key={i}>
                        <div className='review-card' key={i}>
                            <div>
                                <img src={val?.photo} alt='' />
                                <div className='user-details'>
                                    <h1>{val?.username}</h1>
                                    <h2>{val?.role}</h2>
                                    <span>
                                        <Star key={val} size={20} color="#4a4db0" weight="fill" />
                                        <Star key={val} size={20} color="#4a4db0" weight="fill" />
                                        <Star key={val} size={20} color="#4a4db0" weight="fill" />
                                    </span>
                                </div>
                            </div>
                            <article>{val?.comment}</article>
                        </div>
                    </SwiperSlide>
                )}
               
            </Swiper>

        </div>
    )
}

export default ReviewCard;



// {sampleData.map((val: any, i: number) =>
//     <div className='review-card' key={i}>
//         <div>
//             <img src={val?.photo} alt='' />
//             <div className='user-details'>
//                 <h1>{val?.username}</h1>
//                 <h2>{val?.role}</h2>
//                 <span>
//                     <Star key={val} size={20} color="#4a4db0" weight="fill" />
//                     <Star key={val} size={20} color="#4a4db0" weight="fill" />
//                     <Star key={val} size={20} color="#4a4db0" weight="fill" />
//                 </span>
//             </div>
//         </div>
//         <article>{val?.comment}</article>
//     </div>
// )}

