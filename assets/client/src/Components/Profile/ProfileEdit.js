import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../auth/auth-service";


export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", city: "", redirect: false };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const city = this.state.city;
    // const course = this.state.course;

    this.service
      .edit(username, password, city)
      .then(response => {
        this.setState({
          ...this.state,
          username: "",
          password: "",
          city: "",
          redirect: true
        });
        // this.props.getUser(response);

      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    if (this.state && this.state.redirect) {
      return <Redirect to="/profile" />;
    }
    console.log(this.props.user)
    return (
      <div>

        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />

          <label>Password:</label>
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />

          <label>City:</label>
          <select
            name="city"
            value={this.state.city}
            onChange={e => this.handleChange(e)}
          >
            <option>A Coruña</option>
            <option>Alava</option>
            <option>Albacete</option>
            <option>Alicante</option>
            <option>Almería</option>
            <option>Asturias</option>
            <option>Avila</option>
            <option>Badajoz</option>
            <option>Barcelona</option>
            <option>Burgos</option>
            <option>Cáceres</option>
            <option>Cádiz</option>
            <option>Cantabria</option>
            <option>Castellón</option>
            <option>Ceuta</option>
            <option>Ciudad Real</option>
            <option>Córdoba</option>
            <option>Cuenca</option>
            <option>Formentera</option>
            <option>Girona</option>
            <option>Granada</option>
            <option>Guadalajara</option>
            <option>Guipuzcoa</option>
            <option>Huelva</option>
            <option>Huesca</option>
            <option>Ibiza</option>
            <option>Jaén</option>
            <option>La Rioja</option>
            <option>Las Palmas de Gran Canaria</option>
            <option>León</option>
            <option>Lérida</option>
            <option>Lugo</option>
            <option>Madrid</option>
            <option>Málaga</option>
            <option>Mallorca</option>
            <option>Menorca</option>
            <option>Murcia</option>
            <option>Navarra</option>
            <option>Orense</option>
            <option>Palencia</option>
            <option>Pontevedra</option>
            <option>Salamanca</option>
            <option>Santa Cruz de Tenerife</option>
            <option>Segovia</option>
            <option>Sevilla</option>
            <option>Soria</option>
            <option>Tarragona</option>
            <option>Teruel</option>
            <option>Toledo</option>
            <option>Valencia</option>
            <option>Valladolid</option>
            <option>Vizcaya</option>
            <option>Zamora</option>
            <option>Zaragoza</option>
          </select>

          
          <input type="submit" value="Edit" />
        </form>     
         </div>
    )
  }
}
