import { InferSchemaType, model, Schema } from "mongoose";


const boardSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String, required: true },
    columns: [
        { type: Schema.Types.ObjectId, ref: 'Note' }
    ],
}, {timestamps: true});

type Board =  InferSchemaType<typeof boardSchema>;

export default model<Board>("Board", boardSchema)