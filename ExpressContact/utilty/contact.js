const fs = require("fs")

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

const find = (nama) => {
    const contacts = dataContact();
    const contact = contacts.find(contact => {
        return contact.nama.toLowerCase() === nama.toLowerCase();
    })
    return contact;
}

module.exports = {dataContact,find}