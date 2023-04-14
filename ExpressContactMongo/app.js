const express = require("express")
const expressLayout = require("express-ejs-layouts")
const app = express();
const port = 3000;

const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")

const {body,validationResult} = require("express-validator")
const methodOverridde = require("method-override");

// Konfigurasi
app.set("view engine","ejs");

// Middleware
app.use(expressLayout);
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser("secret")) 
app.use(methodOverridde("_method"))
app.use(session({ 
      
    secret:'secret',
    resave:true,
    saveUninitialized:true,
}))
app.use(flash())

// Model
require("./utilty/db")
const Nomor = require("./model/nomor");

// Halaman Home 
app.get("/",(request,response) => {
    const siswa = []
    response.render('index',{
        layout:"template/template",
        nama:"aiman fadillah",
        title:"Beranda",
        siswa,
    })
})

// Halaman About
app.get("/about",(request,response) => {
    response.render("about",{
        layout:"template/template",
        title:"about",
    })
})

// Halaman Kontak
app.get("/kontak",async (request,response) => {
    
    const data = await Nomor.find({nama : {$regex:`${request.query.searching || ""}`,$options:"i"}})

    response.render("kontak",{
        title:"kontak",
        layout:"template/template",
        data,
        msg:request.flash("msg"), // menangkap pesan singkat dan mengirim data ke /kontak
    })
})

// Halaman Add
app.get("/kontak/add",(request,response) => {
    response.render("createKontak",{
        title:"Create Kontak",
        layout:"template/template",
        data:''
    });
})

// Halaman Post add
app.post("/kontak",[
    body("nama" ).custom( async (value) => { 
        const duplikat = await Nomor.findOne({nama:value})
        if(duplikat){
            throw new Error("Nama Sudah ada")
        }
        return true
    }),
    body("email","Email Tidak Valid").isEmail(),
    body("nomor","Nomor Tidak Valid").isMobilePhone("id-ID"),
],(request,response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        response.render("createKontak",{
            title:"Create Kontak",
            layout:"template/template",
            errors:errors.array(),
            data:request.body,
        })
    }else {
        Nomor.insertMany(request.body)
        .then(() => {
            request.flash("msg","Data Berhasil Ditambahkan") 
            response.redirect("/kontak");
        })
    }
})

// Halaman Delete
app.delete("/kontak",async (req,res) => {
    Nomor.deleteOne({nama : req.body.nama})
        .then(() => {
            req.flash("msg","Data Berhasil Dihapus")
            res.redirect("/kontak")
        })
    }
)

// Halaman Update
app.get("/kontak/edit/:nama",async (req,res) => {
    const data = await Nomor.findOne({nama:req.params.nama})
    res.render("editKontak",{
        layout:"template/template",
        title:`Edit | ${req.params.nama}`,
        data,
    })
})

app.put("/kontak",[
    body("nama" ).custom( async (nama,{req}) => {  // pada parameter kedua untuk mendapatkan request
        const duplikat = await Nomor.findOne({nama:nama});
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
        Nomor.updateOne(
            {_id:request.body._id},
            {
                $set:{
                    nama:request.body.nama,
                    nomor:request.body.nomor,
                    email:request.body.email,
                },
            },
        )
        .then(() => {
            request.flash("msg","Data Berhasil diubah")
            response.redirect("/kontak");
        })
    }
})

// Halaman Detail
app.get("/kontak/:nama",async (request,response) => {
    const data = await Nomor.findOne({ nama:request.params.nama });
    response.render("isiKontak",{
        title:"kontak",
        layout:"template/template",
        data,
    })
})




app.listen(port,() => {
    console.log(`Server nyala pada Port ${port}`)
})  