const contact = require("./contact");

const main = async () => {
    let nama =  await contact.tulisPertanyaan("Masukkan Nama :")
    let nomor = await contact.tulisPertanyaan("Masukkan Nomor :")
    let gmail = await contact.tulisPertanyaan("Masukkan Gmail :")

    contact.simpanContact(nama,nomor,gmail);
}


main()

