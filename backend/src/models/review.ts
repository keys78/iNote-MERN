import { InferSchemaType, model, Schema } from "mongoose";


const reviewSchema = new Schema({
    title: { type: String, required: true },
    comment: { type: String, required: true },
    starRating: { type: String, required: true },
}, { timestamps: true });


type Review = InferSchemaType<typeof reviewSchema>;

export default model<Review>("Review", reviewSchema);
