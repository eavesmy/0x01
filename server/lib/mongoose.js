const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false);

const MONGO_URL = "";

exports.NewConnect = async () => {
    console.log("Create new mongo connect");
    return await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

exports.mongoose = mongoose;
