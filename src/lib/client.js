import React, { Component } from 'react';
import Dictate from  './dictate.js'
import '../button.css'
import {showList} from './showList.js'

var lastTranscript;

export default class RecorderClient extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: 10,
            buttonState: 'start',
            window:{},
            transcription:null,
            dictate: null,
            try:0,
            innerText:"START",
            index:-1,
            score:0,
            play:0
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
            server : "ws://192.168.1.107:8080/client/ws/speech",
            serverStatus : "ws://192.168.1.107:8080/client/ws/status",
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
				lastTranscript = transcription.toString();
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
        this.setState({ index: Math.floor(Math.random()*(showList.length)) })
     
        console.log(this.state);
    }
    
    clickStart = () => {
        this.setState({
            buttonState: 'answer',
            innerText:'ANSWER'
        });
    }
    
    clickAnswer = () => {
        // window.Dictate.startListening();
        this.start()
        this.setState({
            buttonState: 'stop',
            innerText:'STOP'
        });
    }

    clickContinue = () =>{
            this.setState({
                buttonState: 'answer',
                innerText:'ANSWER'
            });
    }
    
    clickStop = () =>{
        // window.Dictate.stopListening();
        this.stop()
        this.setState({
            buttonState: 'check',
            innerText:"CHECK.."
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
        //console.log("HI")
        //console.log("text:" + check_text)
        //console.log(this.state.dictate.onResults)
        if(lastTranscript==undefined){
			lastTranscript="";
		}
		console.log(lastTranscript.substr(0,lastTranscript.length-1).replace(/\s/g,''));
        var answer = lastTranscript.substr(0,lastTranscript.length-1).replace(/\s/g,'');
        var score = this.state.score
        var play = this.state.play
        console.log(play)
        if (check_text == answer){
            console.log("The Answer is Correct.")
            if ((play+1) == 10){
                console.log("END")
                this.setState({buttonState:'end',innerText:"FINISH"});
                return true;
            }else{
                this.setState({try:0,buttonState: 'continue',
                innerText:"CONTINUE?",index: Math.floor(Math.random()*(showList.length)),
                play:play+1,score:score+1});
                return true;
            }
        }else{
			console.log("The Answer is Wrong.")
            this.setState({buttonState:'answer',innerText:"ANSWER"});
            return false;
        }
    }

    retry(){
        // console.log("TRY: "+this.state.try)
        var try_count = this.state.try + 1;
        var play = this.state.play
        if(try_count < 3){
            this.setState({try:try_count})
        }else{
            if(play+1 == 10){
                console.log("END")
                this.setState({buttonState:'end',innerText:"FINISH"});
                return true;
            }else{
                this.setState({
                    buttonState:"continue",innerText:"CONTINUE?",try:0,
                    index: Math.floor(Math.random()*(showList.length)),
                    play: play+1
                })
            }
        }

    }

    render(){
        // console.log("INDEX-b: "+this.state.index)
        var true_text = showList[this.state.index]
        // console.log(true_text)
        // console.log("PLAY : "+this.state.play)
        return(
            <div>
                {this.state.buttonState == "answer" || 
                this.state.buttonState == "stop" || 
                this.state.buttonState == "check" ||
                this.state.buttonState =="continue"?
                <div style={{height:'30px'}}>
                    <br/>
                    <p style={{color:'#0cad9f',fontSize:'20px'}}>Score : {this.state.score} / 10 </p>
                </div>:null}
                <div style={{height:'400px', display:'flex', flex:1,justifyContent:'center',paddingTop:'5%'}}>
                {this.state.buttonState=="start"? <p className="text">Hi.</p>:
                this.state.buttonState == "answer" || this.state.buttonState == "stop" || this.state.buttonState == "check"? 
                        <p className="text">
                            {showList[this.state.index]}
                        </p>:
                this.state.buttonState =="continue"? <p className="text"> </p>:
                this.state.buttonState =="end"? 
                    <div>
                        <p className="ending"> Thank You For Playing </p>
                        <p className="score"> {this.state.score} / 10 </p>
                    </div>:null}
                </div>
                <div style={{width:'10%', margin:"0 auto"}}>
                
                    <div className={this.state.buttonState==='start'? "start-button":
                    this.state.buttonState==='answer'? "answer-button":
                    this.state.buttonState==='end'?"finish-button":"c-button"}
                    onClick={this.state.buttonState==='start'? this.clickStart: 
                    this.state.buttonState==='answer'? this.clickAnswer :
                    this.state.buttonState==='stop' ? this.clickStop:
                    this.state.buttonState=='check' ? ()=>{this.check(true_text)? null:this.retry()}:
                    this.state.buttonState==='continue'? this.clickContinue :null}>
                        {this.state.innerText}
                    </div>
                </div>
            </div>
        );
    }
}