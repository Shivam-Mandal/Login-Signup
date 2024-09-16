const m = require('mongoose')

const mongoUrl = "mongodb://localhost:27017/Employee";

const connectToMongo=()=>{
    
    m.connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true});

    const db = m.connection;

    db.on("error",(error)=>{
        console.log('Error connecting to mongo',error);
    })

    db.on('open',()=>{
        console.log('Connected to mongo');
        
    })
}

module.exports = connectToMongo;