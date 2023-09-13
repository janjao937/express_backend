require("dotenv").config();
const express = require("express");
const fs = require('fs/promises');

const app = express();

const todoPath = "/todo"
const outputPath = "./output.json";


const logRequestMethod = (req, res) => {
    console.log(req.method);
    const outputObj = { msg: req.method };

    fs.readFile(outputPath, "utf-8").then((res) => {
        if (!res) return;
        const jsonObj = JSON.parse(res);
        console.log(jsonObj)
        return jsonObj;
    }).then((obj) => {



        obj.push(outputObj);
        return fs.writeFile("./output.json", JSON.stringify(obj), "utf-8");

    }).then(() => res.json(outputObj));
}

app.get(todoPath, (req, res) => {

    // res.json({msg:req})
    // console.log(req);
    // console.log(req.method);
    // res.json({msg:req.method});
    logRequestMethod(req, res);
})
app.delete(todoPath, (req, res) => {
    logRequestMethod(req, res);
})
app.put(todoPath, (req, res) => {
    logRequestMethod(req, res);
})

app.post(todoPath, (req, res) => {
    logRequestMethod(req, res);
})
app.use((req, res) => {
    res.json({ msg: "dont have" });
})


let port = process.env.PORT || 8000;
app.listen(port, () => console.log("Open server"));