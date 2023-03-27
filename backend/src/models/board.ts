import { InferSchemaType, model, Schema } from "mongoose";


const boardSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String, required: true },
    notes: [
        { type: Schema.Types.ObjectId, ref: 'Note' }
    ],
}, );

type Board =  InferSchemaType<typeof boardSchema>;

export default model<Board>("Board", boardSchema)