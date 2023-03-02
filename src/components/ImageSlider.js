import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./css/Carousel.css";
import video_path from "./images/video_01.mp4"; //TODO get video from props

export default function CarouselComponent(props) {
   

    function setImages(){
        let images = [];
        let game = props.game;


        images.push(<div> <img src={window.gigaArcade.getGameMediaPath(game.name, game.icon)}/></div>)
        
        for(let i =  0; i < props.game.media.length ; i++){
            if( game.media[i].media_type == "image"){
                images.push(<div> <img src={window.gigaArcade.getGameMediaPath(game.name, game.media[i].filename)}/></div>)
            }else{
                images.push(<div><video width={350} controls="controls">
                    <source src={window.gigaArcade.getGameMediaPath(game.name, game.media[i].filename)} type="video/mp4"></source>
                    <object data="">
                    <embed  src="Yes Bank Advertisment.mp4"></embed>
                    </object>
                </video></div>)
            }
            
        }
        


        return images;
    }
    //

    /* {videoProperties.map((videoObj) => {
                    return {
                        <Carousel.Item key = {videoObj.id}>
                        </Carousel.Item>
                    }
                })} */
    //TODO fix media size 
    return (
        <div id="carousel-wrapper" >
            <Carousel infiniteLoop useKeyboardArrows transitionTime={0} showArrows={true} showStatus = {false} thumbWidth = {100}>
            {setImages()} 
                
            </Carousel>
        </div>
    );
    
}