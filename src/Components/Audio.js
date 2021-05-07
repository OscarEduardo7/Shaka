import React, { Component } from "react";

class AudioM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        play: false,
        pause: true

    };

        this.url = "https://proyecto-lenguaje.s3.us-east-2.amazonaws.com/audios/welcome.mp3"; // "http://streaming.tdiradio.com:8000/house.mp3";
        //"https://proyecto-lenguaje.s3.us-east-2.amazonaws.com/audios/hello.mp3";
        this.audio = new Audio(this.url);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
    }

    play(){
        this.setState({
        play: true,
        pause: false
        });
        console.log(this.audio);
        this.audio.play();
    }

    pause(){
        this.setState({ play: false, pause: true });
        this.audio.pause();
    }

    render() {

    return (
    <div>
        <button type="button" class="btn btn-info btn-lg" onClick={this.play}><i class="fas fa-play"></i></button>
        <label>...</label>
        <button type="button" class="btn btn-info btn-lg" onClick={this.pause}><i class="fas fa-pause"></i></button>
    </div>
    );
}
}


export default AudioM