import React, { Component } from 'react';
import Dictate from  './dictate.js'

export default class RecorderClient extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: 10
        }
    }
    
    componentDidMount () {
        console.log("recorder mounted");
        
        this.state.window = {};
        Dictate(this.state.window);

        var worker = this.props.worker;
        console.log("WORKER",worker);
				
				var transcription = new this.state.window.Transcription();
        this.state.transcription = transcription;
				
        var dictate = new this.state.window.Dictate({
            server : "ws://192.168.1.106:8080/client/ws/speech",
            serverStatus : "ws://192.168.1.106:8080/client/ws/status",
            recorderWorkerPath : worker,
            onReadyForSpeech : function() {
                console.log("READY FOR SPEECH");
            },
            onEndOfSpeech : function() {
                console.log("END FOR SPEECH");

            },
            onEndOfSession : function() {
                console.log("END OF SESSION");
            },
            onServerStatus : function(json) {
                console.log(json.num_workers_available + ':' + json.num_requests_processed)
            },
            onPartialResults : function(hypos) {
                transcription.add(hypos[0].transcript, false);
            },
            onResults : function(hypos) {
                transcription.add(hypos[0].transcript, true);
                for(let ans of hypos) {
                    console.log("WIP Transcript: ",ans.transcript.toString(),"prob: ",ans.likelihood);
                }
                console.log("Best transcript: "+transcription.toString())
            },
            onError : function(code, data) {
                console.log(code,data);
                dictate.cancel();
            },
            onEvent : function(code, data) {
            }
        });
        this.state.dictate = dictate;
        this.state.dictate.init();
        
        console.log(this.state);
    }
    
    start() {
        this.state.transcription.clear();
        this.state.dictate.startListening();
    }
    
    stop() {
        this.state.dictate.stopListening();
    }
    
    render(){
        return(
            <div>
                <button onClick={this.start.bind(this)}>Start</button>
                <button onClick={this.stop.bind(this)}>Stop</button>
            </div>
        )
    }
}