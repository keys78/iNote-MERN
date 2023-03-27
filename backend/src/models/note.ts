import { InferSchemaType, model, Schema } from "mongoose";


const noteSchema = new Schema({
    boardId: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
}, {timestamps: true});

type Note =  InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema)