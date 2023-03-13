import { InferSchemaType, model, Schema } from "mongoose";


const boardSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String, required: true },
    notes: [
        { type: Schema.Types.ObjectId, ref: 'Note' }
    ],
    // columns: { type: Array }
}, {timestamps: true});

type Board =  InferSchemaType<typeof boardSchema>;

export default model<Board>("Board", boardSchema)