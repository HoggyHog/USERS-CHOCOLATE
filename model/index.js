const mongoose=require('mongoose');

const url='mongodb+srv://hoggy:hoggy@cluster0.swzi0.mongodb.net/Chocolate'

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    }) 

const users=require('./users.model')