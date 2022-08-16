const express=require('express')
const connection=require('./model')
const path=require('path')
const mongoose=require('mongoose')
const multer=require('multer')

const Grid=require('gridfs-stream')
const methodOverride=require('method-override')
//  const bodyParser=require('body-parser')

const UserModel=mongoose.model('Users')


const app=express()
const uploads =multer()
/* app.use(bodyParser.urlencoded({
    extended:true
}))
 */
//app middleware
/* app.use(bodyParser.json()) */
app.use(methodOverride('_method')) 

//mongo URI
const mongoURI = 'mongodb+srv://hoggy:hoggy@cluster0.swzi0.mongodb.net/Chocolate'

//mongo connection
const con = mongoose.createConnection(mongoURI);

//init gfs
let gfs;
con.once('open', ()=> {
    var gfs = Grid(con.db, mongoose.mongo);
    gfs.collection('Users')
})

//create storage object
const crypto = require('crypto');

const {GridFsStorage} = require('multer-gridfs-storage');

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'user'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

//@route GET/
//loads file
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('index')
})

//@route POAT /upload
//uploads file to DB
app.post('/upload',upload.single('File'),(req,res)=>{
    
    let newUser= new UserModel({
        Name:req.body.name,
        DOB:req.body.DOB,
        Gender:req.body.Gender,
        Email:req.body.Email,
        Number:req.body.Number,
        Address:req.body.Address,
        Terms:req.body.Terms
    })
    newUser.save()
    
    res.json({file:req.file})
})

// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
  });


const port=3000

app.listen(port,()=>{
    console.log(`connected to port ${port}`)
})