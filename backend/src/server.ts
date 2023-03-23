import "dotenv/config";
import app from "./app";
import mongoose from "mongoose";
// import cronjob from './utils/cronjob'

const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/noter', {
    });

    console.log('MongoDB connected')
};

connectDB();
// cronjob()



const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));