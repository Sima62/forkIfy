import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };


export const getJSON=async(url)=>{
    try{
     const response= await Promise.race([fetch(url),timeout(TIMEOUT_SEC)]); 
     const data=await response.json();
     if(!response.ok){
        throw new Error(`'Something went wrong' ${response.status} ${data.message}`);
     }
     return data;
    }
    catch(error){
        // alert(error);
        throw error;
    }

}

export const sendJSON=async(url,uploadData)=>{
  try{
   const response= await Promise.race([fetch(url,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(uploadData)
   }),timeout(TIMEOUT_SEC)]); 
   const data=await response.json();
   if(!response.ok){
      throw new Error(`'Something went wrong' ${response.status} ${data.message}`);
   }
   return data;
  }
  catch(error){
      // alert(error);
      throw error;
  }

}