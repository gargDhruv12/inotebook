const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/database1"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Exit the application if the connection fails
    }
};

module.exports = connectToMongo;



// const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/"
// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("Connected to mongo succesfully")
//     })
// }
// module.exports = connectToMongo;