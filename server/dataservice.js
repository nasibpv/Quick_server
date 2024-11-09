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
    dashboard=async(currentDate)=>{
      console.log(currentDate);
      

      try{
        // const formattedCurrentDate = currentDate.slice(0, 10); // Get the first 10 characters (MM/DD/YYYY)

    // Fetch appointments where the first 10 characters of timestamp match the currentDate
    const result = await db.Appointment.distinct('timestamp'); 
    const filteredDates = result?.map(date => date?.substring(0, 10));
        console.log(filteredDates.length,'fil');
        
    const check = filteredDates
  .map(date => date.replace(',', '')) // Remove the comma
  .filter(date => date === currentDate) .length; // Filter for the specific date
        return {
          statusCode:202,
          status:true,
          message:' All Data',
          appointment: filteredDates.length,
          todayAppointment:check
        }
      }
      catch(error){
        return{
          statusCode:402,
          status:false,
          message:' no Data',
          
        }

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
          const newAppointment = new db.Appointment({
            A_ID,
            firstName,
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

// ---------------USER TYPE ---------------------------------

userType = async()=>{
  const result= await db.Usertypes.find()
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

// --------------
newUserType = async(key,name,type)=>{
  switch (type){

    case 'post':
       const result= await db.Usertypes.findOne({key})
  if(!result){    
    const newData=db.Usertypes({
      key,
      name
    })
    await newData.save()
    return{
      status:true,
      statusCode:200,
      message:"Success",
    }
  }
  else{
    return{
      status:false,
      statusCode:402,
      message:"Fails Please Try Again",
    }
  }
    break;
    case 'edit':
      const editResult= await db.Usertypes.findOne({key})
      if(editResult){    
        editResult.name = name;

    // Save the updated user
    await editResult.save();
        return{
          status:true,
          statusCode:200,
          message:"Success",
        }
      }
      else{
        return{
          status:false,
          statusCode:402,
          message:"Edit Fails Please Try Again",
        }
      }
    break;
    case 'delete':
        console.log('delete');
        break;       
  }
}
module.exports={
    login,
    dashboard,
    patients,
    doctor,
    appointmentDetails,
    appointment,
    currentPassword,
    changePassword,
    userType,
    newUserType
}
// User.js

