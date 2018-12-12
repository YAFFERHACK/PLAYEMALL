import React, { Component } from "react";
import AuthService from "../auth/auth-service";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default class SingleGameInfo extends Component {
  // constructor() {
  //   super();
  //   this.state = { gameInfo: null };
  // }

  // getGameInfo = () => {
  //   axios.get(`https://ironbeer-api.herokuapp.com/beers/single/${this.props.match.params.id}`)
  //     .then(responseFromApi => {
  //       console.log(responseFromApi);
  //       this.setState({
  //         gameInfo: responseFromApi.data
  //       });
  //     });
  // };

  // componentDidMount() {
  //   this.getGameInfo();
  // }

  render() {
    return(
    <div>
      <img alt="cover" src="https://pbs.twimg.com/profile_images/902498677692014595/Gvk-q1cu_400x400.jpg"/>
      <h1>pepe of duty</h1>
      <hr/>
      <p>Genero: miedo, terror toh potente</p>
      <p>Fecha lanzamiento: 1989</p>
      <p>Plataformas: equisbons, plesteishioNn</p>
      <p>rating: PuntuasSion con Musho TONGO</p>
      <p>Resumen TOH WAPO DER JUEGO</p>
      <p>Distribuido por: Pepe interactive</p>
      <p>URL CON INFORMASSION POTENTE</p>
      <hr/>
      <p>Imágenes to reshulonas</p>
      <img alt="img" src="https://media.giphy.com/media/1044Y0PiV0Fyww/giphy.gif"/>
      <hr/>
      <h3>Videos</h3>
      <iframe width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY"/>
    </div>
    )
  }
}
