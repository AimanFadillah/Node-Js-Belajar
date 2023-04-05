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





// const contact = require("./contact");

// const main = async () => {
//     let nama =  await contact.tulisPertanyaan("Masukkan Nama :")
//     let nomor = await contact.tulisPertanyaan("Masukkan Nomor :")
//     let gmail = await contact.tulisPertanyaan("Masukkan Gmail :")

//     contact.simpanContact(nama,nomor,gmail);
// }

// main()

