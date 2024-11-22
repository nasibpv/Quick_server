const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User",userSchema);// User Model


// Post Model
const patientSchema = new mongoose.Schema({
  P_Id: { type: Number, required: true ,unique:true },
  name: { type: String, required: true },
  age: { type: String},
  city: { type: String},
  country: { type: String },
  occupation: { type: String},
  phone: { type: String, required: true },
  email: { type: String, required: true },
  joined: { type: String, required: true },
  // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
const Patients = mongoose.model('Patient', patientSchema);

// Comment Model
const doctorSchema = new mongoose.Schema({
  D_Id: { type: Number, required: true ,unique:true},
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  phone: { type: String, required: true },
  // post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
const Doctors = mongoose.model('Doctor', doctorSchema);

// Appointment Model
const appointmentSchema= new mongoose.Schema({
  A_ID:{ type: Number, required: true ,unique:true},
  firstName:{ type: String},
  lastName:{type:String},
  age:{ type: Number},
  number:{ type: Number, required: true },
  email:{ type: String},
  department:{type:String,required:true},
  doctor:{type:String,required:true},
  timestamp:{type:String,required:true}
})
const Appointment = mongoose.model('Appointment', appointmentSchema);

// ------------------------
const departmentSchema = new mongoose.Schema({
  key: { type: Number, required: true ,unique:true},
  name: { type: String, required: true },
  minimumDoctor: { type: Number, required: true },
}, { timestamps: true });
const Department = mongoose.model('Department', departmentSchema);
// User Type
const usertypeSchema = new mongoose.Schema({
  key: { type: Number, required: true ,unique:true},
  name: { type: String, required: true }
  // post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
const Usertypes = mongoose.model('Usertype', usertypeSchema);


module.exports={
  User,
  Patients,
  Doctors,
  Appointment,
  Department,
  Usertypes
}
