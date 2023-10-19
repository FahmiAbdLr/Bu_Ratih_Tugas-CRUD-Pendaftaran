const mysql = require("mysql"); // Memanggil MySQL

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pendaftaran"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        // Jika koneksi berhasil, maka akan menampilkan pesan ini di terminal
        console.log('Koneksi ke Database Berhasil')
    }
})

module.exports = db