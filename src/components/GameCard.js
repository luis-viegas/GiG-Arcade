import "./css/Grid.css";
import InfoCard from "./InfoCard";
import React, { useEffect, useState } from "react";
import img1 from "./images/img-01.png";
import img2 from "./images/img-02.png";
import img3 from "./images/img-03.png";

//TODO Calll electron to run game

function GameCard(props) {

    let game = props.game;
    let gameImages = [img3, img2, img1] //TODO get images from public
    const [ShowInfo, setInfo] = useState(false);
    
    function showInfo(){
        setInfo(true);
      }
    
      function hideInfo(game){
        setInfo(false);
      }
    
    function startGame() {
        window.gigaArcade.startGame(game.name)
      }

    return(
        <div className={props.className}>
            <img id = "game-image"src={props.image}></img>
            <div className = "hover-view-container" id = "hover-view-container">
                <input id="play-button" type="button" value = "PLAY" onClick ={startGame}/>
                <input id="info-button" type="button" value = "INFO" onClick = {showInfo}/>
            </div>
            {ShowInfo ? <InfoCard game = {props.game} gameImages = {gameImages} hideInfo={hideInfo} startGame = {startGame}></InfoCard>: null}
            
        </div>
        /*<div class="container">
            <img src={props.image} alt="Snow"></img>
            <button class="btn">Button</button>
        </div>*/


    )

}



export default GameCard;