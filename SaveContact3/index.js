const yargs = require("yargs");
const contacts = require("./contact") 

// Command Menambahkan Data
yargs.command({
    command:"add", // Komen Pertaman
    describe:"menambahkan kontak baru", // Penjelasaan Komen
    builder:{ // Membuat Argumen
        nama:{ // nama Argumen
            describe:"Nama Lengkap", //descripsi argumen
            demandOption:true, // wajib di isi atau tidak
            type:"string", // type argumen
        },
        gmail:{
            describe:"Gmail",
            demandOption:false,
            type:"string",
        },
        nomor:{
            describe:"Nomor",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv) { // ketika argumen berhasil di isi 
        contacts.simpanContact(argv.nama,argv.nomor,argv.gmail); // tindakan
    }
}).demandCommand();

// Command Menapilkan data
yargs.command({
    command:"list",
    describe:"Menapilkan Kontak",
    // list tidak perlu builder kerena tidak ada argumen yang akan dimasukkan
    handler() {
        contacts.listContact()
    }
})

// Command Detail 
yargs.command({
    command:"detail",
    describe:"Detail kontak berdasarkan nama",
    builder:{
        nama:{ // nama Argumen
            describe:"Nama Lengkap", //descripsi argumen
            demandOption:true, // wajib di isi atau tidak
            type:"string", // type argumen
        },
    },
    handler(argv){
        contacts.detailContact(argv.nama)
    }
})

// Commad hapus
yargs.command({
    command:"remove",
    describe:"Detail kontak berdasarkan nama",
    builder:{
        nama:{ // nama Argumen
            describe:"Nama Lengkap", //descripsi argumen
            demandOption:true, // wajib di isi atau tidak
            type:"string", // type argumen
        },
    },
    handler(argv){
        contacts.removeContact(argv.nama)
    }
})

yargs.parse() // untuk menjalankan yargs



