import React from 'react'
import { Formik, Form } from 'formik'
import Image from 'next/image'
import TextArea from '../shared/TextArea'
import Button from '../shared/Button'
import StarRatings from 'react-star-ratings';
import * as Yup from 'yup';


const Ratings = () => {
    const validationSchema = Yup.object().shape({
        starRating: Yup.number()
            .required('Please select a star rating')
            .min(1, 'Please select a star rating'),
        review: Yup.string()
            .required('Please enter a review description')
            .min(10, 'Description must be at least 10 characters')
            .max(500, 'Description must be less than 500 characters'),
    });
    return (
        <div>
            <h1 className='font-bold text-[24px]'>i-Rate</h1>
            <div>
                <Image src={'/assets/emotico.webp'} width={400} height={10} alt={''} />
            </div>
            <h2 className='text-center text-[18px] font-semibold'>Your opinion matters to us!</h2>
            <p className='text-center text-sm pt-2 pb-4'>We work super hard to make iNote <br /> better for your, and we would love to know: <br />how would you rate our app?</p>


            <Formik
                initialValues={{
                    starRating: 0,
                    review: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    console.log(values)
                    setSubmitting(false);
                    resetForm();

                }}
            >
                {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                        <div className='flex items-center justify-center'>
                            <StarRatings
                                rating={props.values.starRating}
                                starRatedColor="#635FC7"
                                changeRating={(newRating: any) =>
                                    props.setFieldValue('starRating', newRating)
                                }
                                numberOfStars={5}
                                starDimension="30px"
                                starSpacing="5px"
                                name="rating"
                            />
                        </div>
                        <span className={"flex items-center justify-center text-xs text-[#E25353] my-2"}>
                            {props.touched.starRating && props.errors.starRating}
                        </span>

                        <TextArea
                            label="Review"
                            name="review"
                            type="text"
                            placeholder="Write your review here!"
                        />
                        <Button
                            text="Submit Review"
                            type="submit"
                            width="w-full"
                            padding="py-[7px]"
                            color="text-white"
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}


export default Ratings;