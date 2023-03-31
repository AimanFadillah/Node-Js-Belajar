let fs = require("fs")

// menulis string ke file (synchronous)

// try{
//     fs.writeFileSync("catatan/test.txt","Hello Worl ini secara synchrounus")
// }catch (e) {
//     console.log(e)
// }

// menulis string ke file (asynchronous)

// fs.writeFile("catatan/text2.txt","hello budi",(e) => {
//     console.log(e)
// })

// membaca file sychronous

// let bacaan = fs.readFileSync("catatan/text.txt","utf-8")

// console.log(bacaan)

// membaca file asychronous

// fs.readFile("catatan/text2.txt","utf-8",(e,d) => {
//     if (e) throw e ;
//     console.log(d);
// });

// readline

let readline = require("readline");
let rl  = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
});

rl.question("masukkan nama :",(nama) => {
    rl.question("masukkan nomor hp :",(nomor) => {
        let contact = {nama,nomor};
        let buffer =  fs.readFileSync("kontak/kontak.json","utf-8");
        let contacts = JSON.parse(buffer);

        contacts.push(contact);
        fs.writeFileSync("kontak/kontak.json",JSON.stringify(contacts));

        console.log("terima kasih sudah memasukkan data")

        rl.close()
    })
})