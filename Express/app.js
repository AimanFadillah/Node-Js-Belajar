const express = require("express");
const app = express();
const port = 3000;

app.get("/",(request,response) => {
    // response.send("hello word")
    response.sendFile("./index.html",{root:__dirname})
})

app.get("/about",(request,response) => {
    response.sendFile("./about.html",{root:__dirname})
})

app.get("/kontak",(request,response) => {
    response.sendFile("./kontak.html",{root:__dirname})
})

app.get("/user/:user",(request,response) => {
    response.send(`hai ${request.params.user} kelas ${request.query.kelas}`)
})

app.use("/",(request,response) => {
    response.status(404);
    response.send("not found")
})

app.listen(port,() => {
    console.log("nyala cuy pake nanya")
})
