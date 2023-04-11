const express = require("express");
const expressLayouts = require("express-ejs-layouts")
const app = express();
const port = 3000;


app.set("view engine","ejs") // untuk menggunakan ejs layout
app.use(expressLayouts) // memasang ejs layout

app.get("/",(request,response) => {
    const siswa = [
        // {
        //     nama:'aiman',
        //     kelas:'rpl2'
        // },
        // {
        //     nama:"budi",
        //     kelas:"rpl1"
        // },
        // {
        //     nama:"naruto",
        //     kelas:"rpl3"
        // }
    ]
    response.render('index',{
        layout:"template/template", // menggunakan ejs layout
        nama:"aiman fadillah",
        title:"Beranda",
        siswa,
    })
})

app.get("/about",(request,response) => {
    // response.sendFile("./view/about.html",{root:__dirname})\
    response.render("about",{
        layout:"template/template",
        title:"about",
    })
})

app.get("/kontak",(request,response) => {
    // response.sendFile("./view/kontak.html",{root:__dirname})
    response.render("kontak",{
        title:"kontak",
        layout:"template/template"
    })
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
