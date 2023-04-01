/* eslint-disable @next/next/no-img-element */
import { Star } from 'phosphor-react'
import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
import '@splidejs/react-splide/css/core';
import '@splidejs/react-splide/css';



const ReviewCard = () => {
    const sampleData = [
        { username: 'Volcano', role: 'user', photo: 'https://source.unsplash.com/random/300x200', star: 3, comment: 'lorem, ipsum dolor sit amet consectetur ' },
        { username: 'Volcano', role: 'user', photo: 'https://source.unsplash.com/random/300x200', star: 3, comment: 'lorem, ipsum dolor sit amet consectetur ' },
        { username: 'Volcano', role: 'user', photo: 'https://source.unsplash.com/random/300x200', star: 3, comment: 'lorem, ipsum dolor sit amet consectetur ' },
        { username: 'Volcano', role: 'user', photo: 'https://source.unsplash.com/random/300x200', star: 3, comment: 'lorem, ipsum dolor sit amet consectetur ' },
        { username: 'Volcano', role: 'user', photo: 'https://source.unsplash.com/random/300x200', star: 3, comment: 'lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab praesentium minus quaerat cumque ut, repellat maxime enim a ipsa autem accusamus quos modi sunt?' },
        { username: 'Volcano', role: 'user', photo: 'https://source.unsplash.com/random/300x200', star: 3, comment: 'lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab praesentium minus quaerat cumque ut, repellat maxime enim a ipsa autem accusamus quos modi sunt?' },
        { username: 'Volcano', role: 'user', photo: 'https://source.unsplash.com/random/300x200', star: 3, comment: 'lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab praesentium minus quaerat cumque ut, repellat maxime enim a ipsa autem accusamus quos modi sunt?' },
    ]

    return (
        <Splide
            options={{
                rewind: true,
                gap: '2px',
                autoplay: true,
                pauseOnHover: true,
                autoplay: true,
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

            {sampleData.map((val: any, i: number) =>
                <SplideSlide key={i}>
                    <div className='review-card my-3' key={i}>
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
                </SplideSlide>
            )}

        </Splide>
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