const express=require('express')
const server=require('./server/dataservice')
const app=express()
const cors = require('cors');

// jsonwebtoken creation 
const jwt=require('jsonwebtoken')

const secretKey = 'your_secret_key';
function generateToken() {
    const token = jwt.sign({}, secretKey); // Token expires in 1 hour
    return token;
  }
  const token = generateToken();

  function verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded; // Returns the decoded payload
    } catch (error) {
      console.error('Token verification failed:', error);
      return null; // Or handle the error as needed
    }
  }

const mongoose=require('mongoose')
const corsOptions = {
    origin: 'http://localhost:5173', // Allow your React app's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials if needed
};

// Middleware
app.use(cors(corsOptions));

app.use(express.json())
mongoose.connect('mongodb://localhost:27017/Quick')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

    
app.get('/', (req, res) => {
    console.log(token);
    
    res.send('Welcome to the backend!');
});
app.post('/login', async (req, res) => {
    const { phoneNumber, password } = req.body;

  const result=await server.login(phoneNumber,password)
  res.status(result.statusCode).send(result)
  });

app.post('/useradding',async(req,res)=>{
    const { username, password } = req.body;

})

app.get('/dashboard',async(req,res)=>{
  
})
app.get('/patients',async(req,res)=>{
  const result = await server.patients()
  res.status(result.statusCode).send(result)
})
app.get('/doctors',async(req,res)=>{
  const result=await server.doctor()
  res.status(result.statusCode).send(result)
})
app.get('/appointmentDetails',async(req,res)=>{
  console.log('here');
  
  const result=await server.appointmentDetails()
  res.status(result.statusCode).send(result)
})
app.post('/appointment',async(req,res)=>{

  const  {A_ID,firstName,lastName,age,number,email,department,doctor,timestamp} =req.body
  const result = await server.appointment(A_ID,firstName,lastName,age,number,email,department,doctor,timestamp)
  res.status(result.statusCode).send(result)
})

app.post('/checkCurrentPassword',async(req,res)=>{
  const {currentPassword}=req.body 
  const result = await server.currentPassword(currentPassword)  
  res.status(result.statusCode).send(result)
  
})
app.post('/changePassword',async(req,res)=>{
  const {oldPassword,newPassword}=req.body 
  const result = await server.changePassword(oldPassword,newPassword)  
  res.status(result.statusCode).send(result)
  
})

app.listen(3004,()=>{    
})