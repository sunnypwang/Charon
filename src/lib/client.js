import React, { Component } from 'react';
import Dictate from  './dictate.js'
import '../button.css'
export default class RecorderClient extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: 10,
            buttonState: 'start',
            window:{},
            transcription:null,
            dictate: null,
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
    
    clickStart = () => {
        this.setState({
            buttonState: 'answer'
        });
    }
    
    clickAnswer = () => {
        // window.Dictate.startListening();
        this.start()
        this.setState({
            buttonState: 'stop'
        });
    }

    clickContinue = () =>{
        this.setState({
            buttonState: 'answer'
        });
    }
    
    clickStop = () =>{
        // window.Dictate.stopListening();
        this.stop()
        this.setState({
            buttonState: 'check'
        });
    }

    start() {
        this.state.transcription.clear();
        this.state.dictate.startListening();
    }
    
    stop() {
        this.state.dictate.stopListening();
    }

    check(check_text){
        console.log("HI")
        console.log("text:" + check_text)
        console.log(this.state)
        if (check_text == this.state.dictate.onResults){
            this.setState({buttonState: 'continue'});
        }else{
            this.setState({buttonState:'answer'});
        }

    }

    render(){
        var true_text = this.props.text;
        return(
            <div className={this.state.buttonState==='start'? "start-button":
            this.state.buttonState==='answer'? "answer-button":"c-button"}
            onClick={this.state.buttonState==='start'? this.clickStart: 
            this.state.buttonState==='answer'? this.clickAnswer :
            this.state.buttonState==='stop' ? this.clickStop:
            this.state.buttonState=='check' ? this.check(true_text):
            this.state.buttonState==='continue'? this.clickContinue : ""}>
                {this.state.buttonState==='start'? 'START': 
                this.state.buttonState==='answer'? 'ANSWER':
                this.state.buttonState==='stop'?'STOP':
                this.state.buttonState==='check'? 'CHECK..':'CONTINUE?'}
            </div>
        );
    }
}