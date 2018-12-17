import axios from "axios";

class CollService {
    constructor() {
        let service = axios.create({
            baseURL: "http://localhost:5000/api/dbroutes",
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
                console.log(err.response.data.message, '<---');
            })
    }

    newCollection = (name) => {
        let collection = { name }
        console.log(collection);
        return this.service.post('/newcoll', collection)
            .then((response) => {
                console.log(response.data);
                return response.data
            })
            .catch((err) => {
                console.log(err);
            })
    }

    userCollections = () => {
        return this.service.get('/user-collections')
            .then((response) => {
                // console.log(response.data);
                return response.data
            })
            .catch((err) => {
                console.log(err);
            })
    }

    removeCollection = (id) =>{
        let collection = {id}
        return this.service.post('/removecoll', collection)
        .then((response)=>{
            console.log('collection successfully removed');
            return response.data
        })
        .catch((err)=>{
            console.log('collection removal failed');
            console.log(err);
        })
    }

    removeGame = (collectionId, gameId) =>{

        let collection = {collectionId, gameId};
        
        return this.service.post('/removefromcoll', collection)
        .then((response)=>{
            console.log('game successfully removed');
            return response.data
        })
        .catch((err)=>{
            console.log('game removal failed');
            console.log(err);
        })
    }
}


export default CollService;

