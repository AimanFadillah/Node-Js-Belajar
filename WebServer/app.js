const http = require("http");
const fs = require("fs");

const web = (path,response) => {
    // path merupakan alamat filenya dimana
    // respone dari createServe
    fs.readFile(path,(error,web) => {
        if(error){ // jika terjadi error
            response.writeHead(404); // kode web
            response.write("File Tidak Ditemukkan") // pesan yang akan dikeluarkan diweb
        }else{
            response.write(web) // membaca isi file
        }
        response.end(); // mengahiri response
    })
}

http.createServer((request,response) => { // membuat server
    response.writeHead(200,{ 
        'Content-Type' : 'text/html' // agar response yang ditampilkan berbentuk html
    })

    const url = request.url; // ambil url 
    
    // pake if juga bisa cuman switch lebih simpel
    switch(url){
        case "/about":
            web("./about.html",response);
            break;
        case "/contact":
            web("./contact.html",response)
            break;
        default :web("./index.html",response);
            break;
    }

})
.listen(3000,() => { // nama port yang akan dipake 
    console.log("Server Nyalan Pada Port 3000") // pesan ketika port berhasil dinyalakan
})
