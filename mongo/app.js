const {MongoClient,ObjectId} = require('mongodb');
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url, { useUnifiedTopology: true });

// Database Name
const dbName = 'sekolah';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    const db = client.db(dbName);

    // // Create One
    // db.collection("siswa").insertOne(
    //     {
    //         nama:"naruto",
    //         kelas:"geming",
    //     }
    // )

    // Create Many
    // db.collection("siswa").insertMany([
    //     {
    //         nama:"kopi",
    //         kelas:"rpl100"
    //     },
    //     {
    //         nama:"kosi",
    //         kelas:"rpl6"
    //     },
    //     {
    //         nama:"kosi",
    //         kelas:"rpl6"
    //     },
    // ])

    // Read ALL data
        // db.collection('siswa')
        // .find()
        // .toArray()
        // .then(hasil => console.log(hasil))


    // Read Id 
    // db.collection('siswa')
    //     .find({ _id:new ObjectId("6437815cd8a27bb10df4e419"), })
    //     .toArray()
    //     .then(hasil => console.log(hasil))


    // Update One
    // db.collection("siswa").updateOne({
    //     _id:new ObjectId("6437815cd8a27bb10df4e419"),
    // },
    // {
    //     $set:{
    //         nama:"narumon"
    //     },
    // },
    // ).then(hasil => console.log(hasil))

    // Update Many
    // db.collection("siswa").updateMany(
    //     {
    //         nama:"narumon",
    //     },
    //     {
    //         $set:{
    //             nama:"geming",
    //         }
    //     },
    // )

    // Delete One
    // db.collection("siswa").deleteOne(
    //     {
    //         _id:new ObjectId("6437a0e671eeb9cf52bd8161"),
    //     },
    // )

    // Delete Many
    // db.collection("siswa").deleteMany({
    //     nama:"kosi",
    // })

}

main()

