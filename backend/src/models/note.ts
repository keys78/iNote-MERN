import { InferSchemaType, model, Schema } from "mongoose";


const noteSchema = new Schema({
    columnId: {
        type: Schema.Types.ObjectId,
        ref: 'Column',
        required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
}, {timestamps: true});

type Note =  InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema)