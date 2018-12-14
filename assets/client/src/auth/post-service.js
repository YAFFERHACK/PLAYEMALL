import axios from "axios";

class PostService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/post",
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


  dashboardWritePost = (username, password, city, photo) => {
    const formData = new FormData();
    let user = { username, password, city, photo };

    Object.keys(user).forEach(key => formData.append(key, user[key]));
    console.log(formData)
    return this.service.post('/signup', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then((response) => {
        console.log('entra por el then');
        console.log(response.data)
      })
      .catch((err) => {
        console.log('entra por el catch');
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
