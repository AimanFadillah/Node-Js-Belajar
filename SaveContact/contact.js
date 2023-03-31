let fs = require("fs")
let readline = require("readline");

let rl  = readline.createInterface({ // membuat interface   
    input : process.stdin,
    output : process.stdout,
});

if(!fs.existsSync("./kontak")){ // ada folder kontak apa tidak
    fs.mkdirSync("./kontak") // membuat folder
}

if(!fs.existsSync("./kontak/kontak.json")){ // cek ada file kontak.json
    fs.writeFileSync("./kontak/kontak.json","[]","utf-8"); // menambahkan file  kontak.json
}

const tulisPertanyaan = (pertanyaan) => { 
    return new Promise ((success,error) => { // menggunakan Promise
        rl.question(pertanyaan,(hasil) => { 
            success(hasil) // menghasilkan 
        })
    }); 
}

const simpanContact = (nama,nomor,gmail) => {
    let contact = {nama,nomor,gmail};// Ambil Value Singkat

    // versi Panjang 
    // let contact = {
    //      nama:nama,
    //      nomor:nomor,
    //      gmail:gmail,
    // }

    let buffer =  fs.readFileSync("kontak/kontak.json","utf-8"); // Membaca Isi File
    let contacts = JSON.parse(buffer); // Merubah String Menjadi Json

    contacts.push(contact); // Menambahkan isi contant ke dalam contacts
    fs.writeFileSync("kontak/kontak.json",JSON.stringify(contacts)); // Menulis ulang 

    console.log("terima kasih sudah memasukkan data")

    rl.close() // Tutup
}

module.exports = {tulisPertanyaan,simpanContact}