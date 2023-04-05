const fs = require("fs")
const chalk = require("chalk")
const validator = require("validator")
// let readline = require("readline");

// let rl  = readline.createInterface({ // membuat interface   
//     input : process.stdin,
//     output : process.stdout,
// });

if(!fs.existsSync("./kontak")){ // ada folder kontak apa tidak
    fs.mkdirSync("./kontak") // membuat folder
}

if(!fs.existsSync("./kontak/kontak.json")){ // cek ada file kontak.json
    fs.writeFileSync("./kontak/kontak.json","[]","utf-8"); // menambahkan file  kontak.json
}

// const tulisPertanyaan = (pertanyaan) => { 
//     return new Promise ((success,error) => { // menggunakan Promise
//         rl.question(pertanyaan,(hasil) => { 
//             success(hasil) // menghasilkan 
//         })
//     }); 
// }

const simpanContact = (nama,nomor,gmail) => {
    const contact = {nama,nomor,gmail};// Ambil Value Singkat
    const buffer =  fs.readFileSync("kontak/kontak.json","utf-8"); // Membaca Isi File
    const contacts = JSON.parse(buffer); // Merubah String Menjadi Json

    const dulpikat = contacts.find(contact => contact.nama === nama) // cek dulpikat

    if(dulpikat){ // kondisi ketika ada dulpikat
        console.log(chalk.red.bold("Kontak sudah ada coba pake nama lain"))
        return false ;
    }

    if(!validator.isMobilePhone(nomor,"id-ID")){ // cek NomorHP
        console.log(chalk.red.bold("Nomor tidak valid"))
        return false ;
    }
 
    if(gmail){
        if(!validator.isEmail(gmail)){ // cek gmail
            console.log(chalk.red.bold("Email Tidak valid"))
            return false ;
        }
    }



    contacts.push(contact); // Menambahkan isi contant ke dalam contacts
    fs.writeFileSync("kontak/kontak.json",JSON.stringify(contacts)); // Menulis ulang 

    console.log( chalk.green.bold( "Terima kasih sudah memasukkan data"))

}

module.exports = {simpanContact}