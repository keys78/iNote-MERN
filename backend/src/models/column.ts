import { InferSchemaType, model, Schema } from "mongoose";


const columnSchema = new Schema({
    boardId: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
    title: { type: String, required: true },
    notes: [
        { type: Schema.Types.ObjectId, ref: 'Note' }
    ],
});

type Column =  InferSchemaType<typeof columnSchema>;

export default model<Column>("Column", columnSchema)