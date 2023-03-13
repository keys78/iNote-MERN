import mongoose, {  model, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import _ from "lodash"


interface User extends mongoose.Document {
    role: string;
    username: string;
    email: string;
    password: string;
    board:Types.ObjectId['_id'];
    matchPasswords: (password: string) => Promise<boolean>;
  }

const userSchema = new Schema({
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    username: { type: String, required: true },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        // eslint-disable-next-line no-useless-escape
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    boards: [
        { type: Schema.Types.ObjectId, ref: 'Board' }
    ],
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false
    },
}, { timestamps: true });

userSchema.pre('save', function (next) {
    this.username = _.capitalize(this.username)
    next();
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

userSchema.methods.matchPasswords = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

// type User = InferSchemaType<typeof userSchema>;


export default model<User>("User", userSchema)