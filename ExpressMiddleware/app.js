const express = require("express");
const expressLayouts = require("express-ejs-layouts")
const morgan = require("morgan");
const app = express();
const port = 3000;

app.set("view engine","ejs")

// third party middleware
app.use(expressLayouts)
// app.

// Build-it Middleware
app.use(express.static("public"))
app.use(morgan("dev"))

// Aplikasi level Middleware
app.use((request,response,next) => {
    console.log(`sekarang : ${Date.now()}`); // aksi
    next(); // Melanjutkan ke baris bawah
})



app.get("/",(request,response) => {
    const siswa = []
    response.render('index',{
        layout:"template/template",
        nama:"aiman fadillah",
        title:"Beranda",
        siswa,
    })
})

app.get("/about",(request,response) => {
    response.render("about",{
        layout:"template/template",
        title:"about",
    })
})

app.get("/kontak",(request,response) => {
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
    console.log(`Server Aktif pada Port ${port}`)
})
