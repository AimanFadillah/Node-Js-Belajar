const express = require("express");
const expressLayouts = require("express-ejs-layouts")
const contact = require("./utilty/contact")
const app = express();
const port = 3000;

app.set("view engine","ejs")
app.use(expressLayouts)
app.use(express.static("public"))

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
        layout:"template/template",
        data:contact.dataContact()
    })
})

app.get("/kontak/:nama",(request,response) => {
    const isi = contact.find(request.params.nama)
    response.render("isiKontak",{
        title:"kontak",
        layout:"template/template",
        data:isi,
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
