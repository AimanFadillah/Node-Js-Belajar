const mongoose = require("mongoose");

// Membuat Schema
const Nomors = mongoose.model("nomor",{
    nama:{
        type:String,
        required:true,
    },
    nomor:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    }
})


module.exports = Nomors;