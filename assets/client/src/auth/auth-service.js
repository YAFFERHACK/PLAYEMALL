import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/auth",
      withCredentials: true
    });
    this.service = service;
  }

  signup = (username, password, city, photo) => {
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

  loggedin = () => {
    return this.service.get('/loggedin')
      .then(response => { 
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        // console.log(err.response.data.message);
      })
  }

  login = (username, password) => {
    return this.service.post('/login', { username, password })
      .then(response => { 
        console.log(response.data);
        return response.data;
        })
      .catch((err) => {
        console.log(err.response.data.message);
      })
  }

  logout = () => {
    return this.service.get("/logout")
    .then(response => response.data)
    .catch((err)=>{
      console.log(err.response.data.message)
  });
};

  edit = (username, password, city) => {
    return this.service
    .post("/edit", { username, password, city })
    .then(response => {
      console.log(response.data);
      console.log("entra el edit");
  })
    .catch(err => {
    console.log(err);
    console.log("entra por el edit del catch jandlemore");
  });
};
}


export default AuthService;

