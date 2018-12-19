import axios from "axios";
require('dotenv').config()

class PostService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/post`,
      withCredentials: true
    });
    this.service = service;
  }


  dashboardShowPost = () => {
    return this.service.get('/dashboard')
      .then(response => { 
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        // console.log(err.response.data.message);
      })
  }


  dashboardWritePost = (title, content, price, photo) => {
    const formData = new FormData();
    let newPost = { title, content, price, photo };

    Object.keys(newPost).forEach(key => formData.append(key, newPost[key]));
    console.log(formData)
    return this.service.post('/newpost', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then((response) => {
        console.log('entra por el then del newpost');
        console.log(response.data)
      })
      .catch((err) => {
        console.log('entra por el catch del newpost');
        // console.log(err.response.data.message, '<---');
      })
  }


  dashboardOne = (id) => {
    return this.service.get(`/completepost/${id}`)
    .then(res => res.data)
    .catch(err => console.log(err));
  }


}








  export default PostService;
