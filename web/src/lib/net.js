const HOST = "http://127.0.0.1:7001";

// TODO: 放入 localstroage 或 cookie
let TOKEN = "";

exports.Post = async (path,params) => {
    return fetch(path,{
        method: "POST",
        body: params,
        headers: {
            "Content-Type": "application/json",
            "x-token": TOKEN,
        }
    }).then(res => res.json());
}

exports.Get = (path,params) => {
    return fetch(path,{
        method: "GET",
    }).then(res => res.json());
}

exports.LPost = (path,params) => {
    console.log(HOST + path);
    return exports.Post(HOST + path,params);
}
