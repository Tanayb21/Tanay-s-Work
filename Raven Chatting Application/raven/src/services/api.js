import axios from "axios";
const url = 'http://localhost:8000';



export const addUser = async (data) => {
  try {
    await axios.post(`${url}/add`, data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  }
  catch (error) {
    console.log("Error while addUser Api", error.message);
  }
}


export const getUsers = async () => {
  try {
    const response = await axios.get(`${url}/users`);
    console.log(response)
    return response.data;
  }
  catch (error) {
    console.log("Error while getting api : ", error.message);
  }
}


export const setConversation = async (data) => {
  try {
    await axios.post(`${url}/conversation/add`, data);
  }
  catch (error) {
    console.log("Error while setConversation api : ", error.message);
  }
}


export const getConversation = async (data) => {
  try {
    let response = await axios.post(`${url}/conversation/get`, data);
    return response.data;
  }
  catch (error) {
    console.log("Error while getConversation api : ", error.message);
  }
}


export const newMessage = async (data) => {
  try {
    let response = await axios.post(`${url}/message/add`, data);
    return response.data;
  }
  catch (error) {
    console.log("Error while newMessage api : ", error.message);
  }
}


export const getMessages = async (id) =>{
  try{
    let response = await axios.get(`${url}/message/get/${id}`);
    return response.data;
  }
  catch(error){
    console.log("Error while getMessage api : ", error.message);
  }
} 


export const uploadFile = async (data) => {
try{
  return await axios.post(`${url}/file/upload`,data);
}
catch(error){
  console.log("Error while uploadFile  api : ", error.message);
}
}