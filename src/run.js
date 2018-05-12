import React, { Component } from 'react'
import RecorderClient from './lib/client.js'
import {Col,Row} from 'react-bootstrap'
import myWorker from "./lib/recorderWorker.js"


export default class Run extends Component{

	render(){
		var sending_text = this.props.sending
			return(
					<div>
							<Row>
									<RecorderClient worker={myWorker} text={sending_text} />
							</Row>
							
					</div>
			)
	} 
    
}