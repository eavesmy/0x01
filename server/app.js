/*
 *  TODO: 
 *  1. 处理下上传文件存储
 *  2. 删除本地文件
 * */
const Express = require("express");

const app = new Express();
const router = Express.Router();
const bodyParser = require('body-parser');

const AssertsHandler = require("./handler/assert");

app.use(bodyParser.json({limit: '10mb'}));

app.use((req, res, next) => {
    var path = req.path;
    var st = Date.now();

    if(req.method !== "OPTIONS") console.log(" -> ", path);

    res.set("Access-Control-Allow-Origin","*");
    res.set("Access-Control-Allow-Headers","Content-Type,x-token");

    let _res = {
        errno: 0,
        data: ""
    };

    res.callback = data => {
        var et = Date.now();
        console.log((et - st) + "ms <- ", path);

        _res.data = data;
        res.json(_res);
    }

    res.error = error => {
        console.trace(error);
        var et = Date.now();
        console.log((et - st) + "ms <- ", path);

        _res.errno = 1;
        _res.data = error.toString();
        res.json(_res);
    }

    res.paramLake = param => {
        var et = Date.now();
        console.log((et - st) + "ms <- ", path);

        _res.errno = 1;
        _res.data = "param lake :" + param;
        res.json(_res);
    }

    next();
});

router.post("/list",AssertsHandler.GetList);
router.post("/del",AssertsHandler.Del);
router.post("/upload",AssertsHandler.Upload);
router.post("/preview",AssertsHandler.Preview);

app.use(router);

const PORT = 7001;
console.log("service start at  " + 7001)
app.listen(PORT);
