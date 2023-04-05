const fs = require("fs")
const chalk = require("chalk")
const validator = require("validator")

if(!fs.existsSync("./kontak")){ // ada folder kontak apa tidak
    fs.mkdirSync("./kontak") // membuat folder
}

if(!fs.existsSync("./kontak/kontak.json")){ // cek ada file kontak.json
    fs.writeFileSync("./kontak/kontak.json","[]","utf-8"); // menambahkan file  kontak.json
}

const dataContact = () => {
    const buffer =  fs.readFileSync("kontak/kontak.json","utf-8"); // Membaca Isi File
    const contacts = JSON.parse(buffer); // Merubah String Menjadi Json
    return contacts;
}

const simpanContact = (nama,nomor,gmail) => {
    const contact = {nama,nomor,gmail};// Ambil Value Singkat
    // const buffer =  fs.readFileSync("kontak/kontak.json","utf-8");
    // const contacts = JSON.parse(buffer); 
    const contacts = dataContact();

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

const listContact = () => {
    let contacts = dataContact();
    contacts.forEach((contact,i) => { // looping Data
        console.log(`${i + 1}.${contact.nama} {${contact.nomor}}`)
    })
}

const detailContact = (nama) => {
    const contacts = dataContact();

    const contact = contacts.find(contact => contact.nama.toLowerCase() === nama.toLowerCase() ); // cari nama yang sama

    if(contact){
        console.log(chalk.green.bold(`nama:${contact.nama}`))
        console.log(`nomor:${contact.nomor}`)
        if(contact.gmail){
            console.log(`gmail:${contact.nama}`)
        }
    }else{
        console.log(chalk.red.bold("Nama tidak ditemukan"))
        return false;
    }

}

const removeContact = (nama) => {
    const contacts = dataContact(); // data json

    // jika dihilangkan seperti biasa itu data akan hilang tapi diganti jadi undefined maka yang dibawah diakalin
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase() ) // mencari nama yang tidak sama dengan argumen

    if(contacts.length === newContacts.length){ // dicek apakah lebar nya sama apa enggak jika sama maka nama tidak ditemukkan
        console.log(chalk.red.bold("Nama tidak ditemukan")) 
        return false;
    }
    
    fs.writeFileSync("kontak/kontak.json",JSON.stringify(newContacts)); // ini tidak menghapus hanya mengisi ulang dengan nama yang tidak sama dengan argumen
    console.log(chalk.green.bold(`${nama} berhasil dihapus`))

}

module.exports = {simpanContact,listContact,detailContact,removeContact}