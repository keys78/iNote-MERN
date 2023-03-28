import { InferSchemaType, model, Schema } from "mongoose";
import _ from 'lodash'

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
},);

boardSchema.pre('save', function (next) {
    this.title = _.capitalize(this.title)
    next();
});

type Board = InferSchemaType<typeof boardSchema>;

export default model<Board>("Board", boardSchema)