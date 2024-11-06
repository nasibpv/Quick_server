const db=require('./db')

    login=async(number,password)=>{
 
          try {
            const user = await db.User.findOne({ phoneNumber:number });
            console.log('hi',user);
            
            if (!user) {
              return {
                statusCode:400,
                message:'invalid Username'
              }
            }
            else{
              const pwd = await db.User.findOne({ password });
              if(!pwd){
                  return {
                    statusCode:400,
                    message:'invalid password'
                  }
              }
              else{
                  return {
                      statusCode:200,
                      message:"login successfully"      
              }
              }
            }  
          } catch (error) {
            return{
              message:'Error',
              statusCode:400,
              result:error
            }
          }
      }
        // -----------------------------------------------------------------------------
      adduser=async(username,password)=>{
        try{
          const result=await User.findOne({username})
          if(!result){
              const add=await new User({username, password })
              add.save()
              return {
                statusCode:202,
                message:'Added User'
              }
          }
          else{
            return {
              statusCode:400,
              message:'already User add'
            }
          }
      }
      catch(error){
        return error
      }
      }
// ------------------------------------------------------------------------------
    dashboard=async()=>{
      try{
        return {
          statusCode:202,
          message:'invalid Username',
          
        }
      }
      catch(error){
        return error

      }
    }
// ------------------------------
    patients=async()=>{
      const result=await db.Patients.find()
      if(result){
        return{
          message:"Patient",
          statusCode:200,
          status:true,
          data:result
        }
      }
      else{
          console.log('error pa');
      }
    }
  // ---------------------------
    doctor = async()=>{
      const result= await db.Doctors.find()
      if(result){
        return{
          status:true,
          statusCode:200,
          message:"Success",
          data:result
        }
      }
      else{
        console.log('error');
        
      }
    }
    // -----------------------------------
     appointment = async (A_ID, firstName, lastName, age, number, email, department, doctor, timestamp) => {
      console.log('2nd');
  
      try {
          // Check if user exists by phone number
          // const user = await db.Patients.findOne({ phone: number });
          // console.log(user);
          
          // // Create a new user if it doesn't exist
          // if (!user) {
          //     console.log('3rd');
              
          //     // const newUser = new db.Patients({
          //     //     P_Id: A_ID,
          //     //     name: `${firstName} ${lastName}`, // Concatenating names properly
          //     //     age: age,
          //     //     city: '',
          //     //     country: '',
          //     //     occupation: '',
          //     //     phone: number,
          //     //     email: email,
          //     //     joined: timestamp
          //     // });
          //      // Create a new appointment regardless
          //   const newAppointment = new db.Appointment({
          //     A_ID,
          //     firstNames:firstName,
          //     lastName:lastName,
          //     age,
          //     number,
          //     email,
          //     department,
          //     doctor,
          //     timestamp
          // });
          // // await newUser.save();
          // await newAppointment.save();
  
          // return {
          //     status: true,
          //     statusCode: 200,
          //     message: 'Create New Appointment'
          // };
             
          // }
          // else{
            
          // // Create a new appointment regardless
          
          // }
          const newAppointment = new db.Appointment({
            A_ID,
            firstName:firstName,
            lastName:lastName,
            age,
            number,
            email,
            department,
            doctor,
            timestamp
        });
        await newAppointment.save();

        return {
            status: true,
            statusCode: 200,
            message: 'Create New Appointment'
        };
          
          
      } catch (error) {
          console.error('Error creating appointment:', error); // Log the error for debugging
          return {
              statusCode: 400,
              status: false,
              message: 'Error creating user or appointment'
          };
      }
  };
  // -----------------------------------------------
  appointmentDetails=async()=>{

    const result= await db.Doctors.find()
    const appointments = await db.Appointment.find(); // Fetch all appointments
    const Department = await db.Department.find(); // Fetch all appointments
const lastAppointment = appointments[appointments.length - 1]; // Get the last appointment

// Check if there is a last appointment and get the A_ID
const lastA_ID = lastAppointment ? lastAppointment.A_ID : null; 
    console.log(lastA_ID);
    
      if(result){
        return{
          status:true,
          statusCode:200,
          message:"Success",
          doctor:result,
          department:Department,
          A_ID:lastA_ID,
        }
      }
      else{
        console.log('error');
        
      }
  }
  currentPassword=async(password)=>{
    console.log(password,'2nd');
    
 
    try {
     
        const pwd = await db.User.findOne({ password });
        console.log(pwd,'3rd');
        
        if(!pwd){
            return {
              statusCode:400,
              status:false,
              message:'invalid password'
            }
        }
        else{
            return {
                statusCode:200,
                status:true,
                message:"Password correct"      
        }
        }
        
    } catch (error) {
      return{
        message:'Error',
        statusCode:400,
        result:error
      }
    }
}
// ------------------------------------------------------
  changePassword=async(oldPassword,newPassword)=>{
    console.log(oldPassword,newPassword,'2nd');
    
 
    try {
     
        const pwd = await db.User.findOne({ password:oldPassword });
        console.log(pwd);
        
        
        if(!pwd){
            return {
              statusCode:400,
              status:false,
              message:'invalid password'
            }
        }
        // Check if the new password is the same as the old password
    if (oldPassword === newPassword) {
      return {
        statusCode: 400,
        status: false,
        message: 'New password cannot be the same as the old password'
      };
    }
       
    pwd.password = newPassword;

    // Save the updated user
    await pwd.save();

    return {
      statusCode: 200,
      status: true,
      message: 'Password changed successfully'
    }; 
        
    } catch (error) {
      return{
        message:'Error',
        statusCode:400,
        result:error
      }
    }
}

module.exports={
    login,
    patients,
    doctor,
    appointmentDetails,
    appointment,
    currentPassword,
    changePassword
}
// User.js

