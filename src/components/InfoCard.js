import React from "react";
import "./css/InfoCard.css";
import img_placeholder from "./images/zelda.png";
import CarouselComponent from "./ImageSlider";
import video from "./images/video_01.mp4";

function InfoCard(props) {
  var game = props.game;
  var info_game = game.description;

  function setMembers(){
    let members = []

    for(let i = 0; i < game.authors.length; i++){
      members.push(<li >{game.authors[i].name} - {game.authors[i].role}</li>)
    }
    return members
  }

  function setOS(){
    let os = []

    for(let i = 0; i < game.operative_system.length; i++){
      os.push( game.operative_system[i], " ")
    }
    return os
  }

  function setGenre(){
    let genres = []

    for(let i = 0; i < game.genres.length -1; i++){
      genres.push( game.genres[i], ", ")
    }

    genres.push( game.genres[game.genres.length-1])
    return genres
  }




  return (
    <div id="info-container">
      <div id="transparent" onClick={props.hideInfo}></div>
      <div id="info-card">
        <div id="info-title">{game.name}</div>
        <div id="info-body">
          <div id="left">
            <div id="info-description">{game.description}</div>
            <table id="bottom-info">
              <tbody>
                <tr>
                  <td id="row-title">
                    {" "}
                    <b>Operative System </b>
                  </td>
                  <td>{setOS()}</td>
                </tr>
                <tr>
                  <td id="row-title">
                    {" "}
                    <b>Release Year </b>
                  </td>
                  <td>{game.year} </td>
                </tr>
                <tr>
                  <td id="row-title">
                    {" "}
                    <b>Genre </b>
                  </td>
                  <td>{setGenre()} </td>
                </tr>
                <tr>
                  <td id="row-title">
                    {" "}
                    <b>Curricular Unit </b>
                  </td>
                  <td>{game.UC} </td>
                </tr>
                
                <tr>
                  <td id="row-title">
                    {" "}
                    <b> Team Members </b>
                  </td>
                  <td>
                    <ul id = "members-list">
                      {setMembers()}
                    </ul>
                  </td>
                </tr>
                <tr></tr>
                <tr>
                  <td id="row-title">
                    {" "}
                    <b>Website </b>
                  </td>
                  <td>{game.website} </td>
                </tr>
              </tbody>
            </table>

            <div id="info-text"></div>
          </div>

          <div id="right">
            <button
              id="play-btn"
              type="button"
              value="PLAY"
              onClick={props.startGame}
            >
              PLAY
            </button>
            <CarouselComponent game={props.game} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
