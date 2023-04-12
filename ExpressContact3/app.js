const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {body,validationResult} = require("express-validator")
const contact = require("./utilty/contact")
const app = express();
const port = 3000;

const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")

app.set("view engine","ejs") // pengaturan view engine diatur ke ejs
app.use(expressLayouts) // untuk mengatur tata letak tampilan
app.use(express.static("public")) // untuk membaca folder public
app.use(express.urlencoded({ extended:true })); // data form yang disubmit tersedian dalam bentuk request.body (body)

// konfigurasi flash
app.use(cookieParser("secret")) // untuk parsing cookie,(secret) untuk menandai dan diperiksa oleh middleware
app.use(session({ // konfigurasi session 
    cookie:{maxAge:6000},
    secret:'secret',
    resave:true,
    saveUninitialized:true,
}))
app.use(flash()) // untuk menggunakan pesan singkat 

app.post("/kontak",[
    body("nama" ).custom((value) => {  // Dibuat custom agar dapat ngecek dulpikat
        const duplikat = contact.duplikatContact(value) // cek dulpikat
        if(duplikat){
            throw new Error("Nama Sudah ada") // membuat pesan error
        }
        return true // menghasilkan true jika berhasil
    }),
    body("email","Email Tidak Valid").isEmail(), // parameter kedua untuk pesan
    body("nomor","Nomor Tidak Valid").isMobilePhone("id-ID"),// Cek nomor hp indonesia
],(request,response) => {
    const errors = validationResult(request); // hasil dari valindasi
    if(!errors.isEmpty()){
        response.render("createKontak",{
            title:"Create Kontak",
            layout:"template/template",
            errors:errors.array(), // mengirim pesan error
        })
    }else {
        contact.add(request.body); // menambahkan nomor
        request.flash("msg","Data Berhasil Ditambahkan") // mengirim pesan singkat
        response.redirect("/kontak"); // pindah ke kontak
    }
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
        layout:"template/template",
        data:contact.dataContact(),
        msg:request.flash("msg"), // menangkap pesan singkat dan mengirim data ke /kontak
    })
})

app.get("/kontak/add",(request,response) => {
    response.render("createKontak",{
        title:"Create Kontak",
        layout:"template/template",
    });
})

app.get("/kontak/:nama",(request,response) => {
    const isi = contact.findContact(request.params.nama)
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
