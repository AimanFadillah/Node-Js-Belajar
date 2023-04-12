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


const findContact = (nama) => {
    const contacts = dataContact();
    const contact = contacts.find(contact => {
        return contact.nama.toLowerCase() === nama.toLowerCase();
    })
    return contact;
}

// menulis ulang file kontak.json
const writeData = (contacts) => {
    fs.writeFileSync("kontak/kontak.json",JSON.stringify(contacts))
}

// cek dulpikat
const duplikatContact = (nama) => {
    const contacts = dataContact();
    return contacts.find((contacts) => contacts.nama === nama)
}
 
// add
const add = (contact) => {
    const contacts = dataContact();
    contacts.push(contact);
    writeData(contacts)
}

// update
const updateContacts = (contactBaru) => {
    const contacts = dataContact();
    const filterContacts = contacts.filter(contact => contact.nama !== contactBaru.oldNama)
    delete contactBaru.oldNama;
    filterContacts.push(contactBaru);
    writeData(filterContacts);
}

// delete
const deleteContact = (nama) => {
    const contacts = dataContact();
    const filter = contacts.filter(contact => contact.nama !== nama)
    writeData(filter)
}

module.exports = {dataContact,duplikatContact,findContact,add,deleteContact,updateContacts}