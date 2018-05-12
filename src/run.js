import React, { Component } from 'react'
import RecorderClient from './lib/recorder.js'
import {Col,Row} from 'react-bootstrap'
import myWorker from "./lib/recorderWorker.js"


export default class Run extends Component{

	render(){
			return(
					<div>
							<Row>
									<RecorderClient worker={myWorker} />
							</Row>
							
					</div>
			)
	} 
    
}