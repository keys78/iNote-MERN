import app from "./app";
import mongoose from "mongoose";


const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/noter', {
    });

    console.log('MongoDB connected')
};

connectDB();


const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));