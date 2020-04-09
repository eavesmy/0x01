const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false);

const MONGO_URL = "mongodb://root:23216340mongoDL@eva7base.com:82/admin";

exports.NewConnect = async () => {
    console.log("Create new mongo connect");
    return await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

exports.mongoose = mongoose;
