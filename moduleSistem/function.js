function cetakNama(nama){
    return `Halo ${nama}`
}

let pi = 3.14;


let mahasiswa = {
    nama:"aiman",
    kelas:"XI RPL 2",
    umur : "17",
    cetakSaya(){
        return `Halo Nama saya ${this.nama} Kelas ${this.kelas} berumur ${this.umur}`
    }
}

class orang {
    constructor(){
        console.log("saya adalah orang")
    }
}

// module.exports.cetakNama = cetakNama;
// module.exports.pi = pi;
// module.exports.mahasiswa = mahasiswa;
// module.exports.orang = orang;

module.exports = {cetakNama,pi,mahasiswa,orang}