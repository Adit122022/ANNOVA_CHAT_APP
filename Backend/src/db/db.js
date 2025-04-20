import mongoose from "mongoose";

const connect = () => {
    mongoose.connect(process.env.MONGODB_URI) 
        .then(() => console.log('🐰🐼🐼MongoDB Connected...✅✅✅ ... 🐼🐼🐰'))
        .catch(err => console.log(err));
}

export default connect;