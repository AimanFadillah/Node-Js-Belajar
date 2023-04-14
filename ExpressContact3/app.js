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
      
    secret:'secret',
    resave:true,
    saveUninitialized:true,
}))
app.use(flash()) // untuk menggunakan pesan singkat 




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
        request.flash("msg","Data Berhasil Ditambahkan") // membuat pesan singkat
        response.redirect("/kontak"); // pindah ke kontak
    }
})

app.get("/kontak/add",(request,response) => {
    response.render("createKontak",{
        title:"Create Kontak",
        layout:"template/template",
    });
})

app.get("/kontak/edit/:nama",(req,res) => {
    const data = contact.findContact(req.params.nama)
    res.render("editKontak",{
        layout:"template/template",
        title:`Edit | ${req.params.nama}`,
        data,
    })
})

app.post("/kontak/update",[
    body("nama" ).custom((nama,{req}) => {  // pada parameter kedua untuk mendapatkan request
        const duplikat = contact.duplikatContact(nama) 
        if(nama !== req.body.oldNama && duplikat){
            throw new Error("Nama Sudah ada") 
        }
        return true
    }),
    body("email","Email Tidak Valid").isEmail(),
    body("nomor","Nomor Tidak Valid").isMobilePhone("id-ID"),
],(request,response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        response.render("editKontak",{
            title:`Edit | ${request.body.nama}`,
            layout:"template/template",
            errors:errors.array(),
            data:request.body,
        })
    }else {
        contact.updateContacts(request.body); // menambahkan nomor
        request.flash("msg","Data Berhasil diubah") // membuat pesan singkat
        response.redirect("/kontak"); // pindah ke kontak
        response.send("aman")
    }
})

app.get("/kontak/delete/:nama",(req,res,next) => {
    const data = contact.findContact(req.params.nama);
    if(!data){
        next()
    }else{
        contact.deleteContact(req.params.nama);
        req.flash("msg","Data Berhasil Dihapus")
        res.redirect("/kontak")
    }
})

app.get("/kontak/:nama",(request,response) => {
    const isi = contact.findContact(request.params.nama)
    response.render("isiKontak",{
        title:"kontak",
        layout:"template/template",
        data:isi,
    })
})

app.use("/",(request,response) => {
    response.status(404);
    response.send("not found")
})

app.listen(port,() => {
    console.log(`Server Aktif pada Port ${port}`)
})
