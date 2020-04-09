const moment = require("moment");
const uuid = require("node-uuid");
const fs = require("fs");
const os = require("os");

const {
        NewConnect,
        mongoose
} = require("../lib/mongoose");

const Assert = require("../model/Asserts")(mongoose);
const Mongo = NewConnect();
const DISK_PATH = "/data/downloads/"

exports.GetList = async (req, res) => {
        let data = await Assert.find({});
        res.callback(data);
}

exports.Del = (req, res) => {
        let id = req.body.id;

        Assert.findByIdAndRemove(id,(err,ret) => {
            if(!!err) res.error("出了一点问题,请稍后再试");  

            err = fs.unlinkSync(ret.path)
            if(!!err) console.log("删除文件出错",err);

            !!err ? res.error("出了一点问题,请稍后再试") : res.callback();
            // TODO: 删除图片
        });
}

exports.Preview = (req, res) => {
        let id = req.body.id;
        Assert.findById(id,(err,ret) => {
            if(!!err || !ret) res.error("出了一点问题，请稍后再试");
            // TODO: 换成下载服务器地址
             let path = "http://eva7base.com:88/"
             let arr_str = ret.path.split("/");
             let uuid = arr_str[arr_str.length - 1];
             path += uuid;
            res.callback({name: ret.name,type: ret.type,path});
        });
}

exports.Upload = (req, res) => {

        let {
                name,
                file,
                size,
                type
        } = req.body;

        file = file.replace(/^data:image\/\w+;base64,/, "");
        let bytes = Buffer.from(file,"base64");

        let path = DISK_PATH + uuid.v4();

        let err = fs.writeFileSync(path, bytes);
        if (err) console.log(err);

        let assert = new Assert();
        assert.name = name;
        assert.size = size;
        assert.type = type;
        assert.modify = moment().format("YYYY-MM-DD hh:mm");
        assert.path = path;
        
        // TODO: 错误处理
        assert.save();

        res.callback();
}
