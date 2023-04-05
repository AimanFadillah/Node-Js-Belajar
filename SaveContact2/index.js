const yargs = require("yargs");
const contacts = require("./contact") 

// kirim data lewat argumen 
// console.log(yargs.argv)

yargs.command({
    command:"add",
    describe:"menambahkan kontak baru",
    builder:{
        nama:{
            describe:"Nama Lengkap",
            demandOption:true,
            type:"string",
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
    handler(argv) {
        contacts.simpanContact(argv.nama,argv.nomor,argv.gmail);
    }
})

yargs.parse()





// const contact = require("./contact");

// const main = async () => {
//     let nama =  await contact.tulisPertanyaan("Masukkan Nama :")
//     let nomor = await contact.tulisPertanyaan("Masukkan Nomor :")
//     let gmail = await contact.tulisPertanyaan("Masukkan Gmail :")

//     contact.simpanContact(nama,nomor,gmail);
// }

// main()

