console.log("Halo! Nama saya Fahmi Abdulsalaam Luhtari");

const express = require("express"); //Memanggil library express
const bodyParser = require("body-parser"); //Memanggil library body parser
const cors = require("cors"); //Memanggil library cors
const db = require("./koneksi")
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


// MENAMPILKAN DATA SISWA
app.get("/tampil", (req, res) => {
    let sql = "SELECT * FROM identitas";
    
    db.query(sql, (error, result) => {
        let response = null;
        if (error) {
            // Menampilkan error jika terjadi
            response = {
                message: error.message
            }
        } else {
            response = {
                JumlahDataSiswa: result.length,
                DataSiswa: result
            }
        }
        res.json(response)
    })
})


// MENAMPILKAN DATA SISWA BERDASARKAN ID
app.get("/tampil/:id", (req, res) => {
    let data = {
        Id_siswa : req.params.id
    }
    let sql = `SELECT * FROM identitas WHERE ?`;
    db.query(sql, data , (error, result) => {
        let nilai = null
        if (error) {
            nilai = {
                message: error.message
            }
        } else {
            nilai = {
                JumlahDataSiswa: result.length,
                DataSiswa: result
            }
        }
        res.json(nilai)
    })
})


// MENAMBAHKAN DATA MENGGUNAKAN METHOD POST
app.post("/tampil" , (req, res) => {
    let nilai = {
        Id_siswa: req.body.Id_siswa,
        NISN: req.body.NISN,
        nama: req.body.nama,
        alamat: req.body.alamat
    }
    let sql = `INSERT INTO identitas SET ?`;
    db.query(sql, nilai, (error, result) => {
        let nilai = null;
        if (error) {
            nilai = {
                Message: error.message
            }
        } else {
            nilai = {
                message: "Berhasil menambahkan " + result.affectedRows + " data siswa",
                data: "Id_siswa: " + req.body.Id_siswa
            }
        }
        res.json(nilai)
    })
})


// MENGUPDATE DATA MENGGUNAKAN METHOD PUT
app.put("/tampil" , (req, res) => {
    let nilai = [
        {
            NISN: req.body.NISN,
            nama: req.body.nama,
            alamat: req.body.alamat
        },
        {
            Id_siswa: req.body.Id_siswa
        }
    ]
    let sql = `UPDATE identitas SET ? WHERE ?`
    db.query(sql, nilai, (error, result) => {
        let nilai = null;
        if (error) {
            nilai = {
                message: error.message
            }
        } else {
            nilai = {
                message: "Berhasil mengupdate " + result.affectedRows + " data siswa",
                update: "Data Id_siswa: " + req.body.Id_siswa + " berhasil diupdate"
            }
        }
        res.json(nilai)
    })
})


// MENGHAPUS DATA BERDASARKAN ID, MENGGUNAKAN METHOD POST
app.delete("/tampil/:id", (req, res) => {
    let siswa = {
        Id_siswa: req.params.id
    }
    let sql = `DELETE FROM identitas WHERE ?`;
    db.query(sql, siswa, (error, result) => {
        let nilai = null;
        if (error) {
            nilai = {
                message: error.message
            }
        } else {
            nilai = {
                message: "Berhasil menghapus " + result.affectedRows + " data siswa",
                delete: "Data Id_siswa: " + req.params.id + " berhasil dihapus"
            }
        }
        res.json(nilai)
    })
})


app.listen(8000, ()=> {
    console.log(`Server berjalan pada port 8000`)
})





// app.get("/hai", (req,res)=>{
//     let halo = {
//         message: "selamat pagi"
//     }
//     res.json(halo)
// })

// app.get("/Node1" , (req,res) => {
//     let response = {
//         Pesan : "Fahmi Abdulsalaam Luhtari",
//         Method : req.method,
//         code : res.statusCode
//     }
//     res.json(response)
// })

// app.get("/Profil/:nama/:umur/:agama", (req,res) => {
//     let nama = req.params.nama;
//     let umur = req.params.umur;
//     let agama = req.params.agama;

//     let response = {
//         Nama : nama,
//         Umur : umur,
//         Agama : agama
//     }
//     res.json(response)
// })

// app.post("/DataDiri" , (req, res) => {
//     let nama = req.body.nama;
//     let umur = Number(req.body.umur);
//     let alamat = req.body.alamat;
//     let ttl = req.body.ttl;
//     let jk = req.body.jk;
        
//     let response = {
//         message: "BIODATA DIRI",
//         Nama: nama,
//         Umur: umur,
//         Alamat: alamat,
//         TTL: ttl,
//         JK: jk

//     }
//     res.json(response)
// })

// app.get("/SelamatSore" , (req, res) => {
//     let response = {
//         Pesan : "Selamat Sore!"
//     }
//     res.json(response)
// })

// app.get("/SelamatSiang" , (req, res) => {
//     let response = {
//         Pesan : "Selamat Siang!"
//     }
//     res.json(response)
// })

// // PROGRAM MENGHITUNG LUAS & KELILING BANGUN DATAR
// app.get("/PERSEGI" , (req , res) => {
//     let response = {
//         Rumus : "LUAS DAN KELILING PERSEGI",
//         LuasPersegi : "sisi * sisi",
//         KelilingPersegi : "4 * sisi"
//     }
//     res.json(response)
// })

// app.post("/PERSEGI" , (req , res) => {
//     let sisi = Number(req.body.sisi);
//     let luas = sisi * sisi;
//     let keliling = 4 * sisi;
//     let response = {
//         Message : "MENGHITUNG LUAS DAN KELILING PERSEGI",
//         Luas : luas,
//         Keliling : keliling
//     }
//     res.json(response)
// })

// app.get("/PERSEGIPANJANG" , (req , res) => {
//     let response = {
//         Rumus : "LUAS DAN KELILING PERSEGI PANJANG",
//         LuasPersegiPanjang : "panjang * lebar",
//         KelilingPersegiPanjang : "2 * (panjang + lebar)"
//     }
//     res.json(response)
// })

// app.post("/PERSEGIPANJANG" , (req , res) => {
//     let panjang = Number(req.body.panjang);
//     let lebar = Number(req.body.lebar);
//     let Luas = panjang * lebar;
//     let keliling =  2 * (panjang + lebar);
//     let response = {
//         Message : "MENGHITUNG LUAS DAN KELILING PERSEGI PANJANG",
//         Luas : Luas,
//         Keliling : keliling
//     }
//     res.json(response)
// })

// app.get("/LINGKARAN" , (req , res) => {
//     let response = {
//         Rumus : "LUAS DAN KELILING LINGKARAN",
//         LuasLingkaran : "phi * r * r",
//         KelilingLingkaran : "phi * diameter"
//     }
//     res.json(response)
// })

// app.post("/LINGKARAN" , (req , res) => {
//     let r = Number(req.body.r);
//     let phi = Math.PI ;
//     let diameter = r + r;
//     let luas = phi * r * r;
//     let keliling = phi * diameter;
//     let response = {
//         Message : "MENGHITUNG LUAS DAN KELILING LINGKARAN",
//         Luas : luas,
//         Keliling : keliling
//     }
//     res.json(response)
// })