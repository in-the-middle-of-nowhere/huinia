import React, { Component } from 'react';
import axios from 'axios';
import '../styles/order.sass';
import MapDotComponent from './MapDotComponent';
import SettingsDisplayComponent from './SettingsDisplayComponent';
import { ProgressBar } from 'react-bootstrap';

class OrderComponent extends Component{
    constructor(props){
        super(props);

        this.handleStartSpam = this.handleStartSpam.bind(this);
        this.handleStopSpam = this.handleStopSpam.bind(this);
        this.handleCoordinates = this.handleCoordinates.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleClickStart = this.handleClickStart.bind(this);

        this.state = {
            selectedOption: null,
            radius: 500,
            markers: [],
            num_accounts: 0,
            bought_accounts: 0,
            coords: [],
            center: [59.928459, 30.320582],
            zoom: 10,
            circle: {
                coords: [59.927171, 30.470315]
            },
            latitude: null,
            longitude: null
        }
    }

    handleClickStart(){
        document.getElementById('progressBar').style.visibility = 'visible';
        document.getElementById('startButton').style.visibility = 'hidden';
        document.getElementById('stopButton').style.visibility = 'hidden';
        this.handleStartSpam();
    }

    handleStartSpam() {
        if (this.state.radius > 0 && this.state.num_accounts > 0 && this.state.selectedOption !== null) {
            if (this.state.num_accounts > this.state.bought_accounts) {
                axios.get('/api/order/create/?app_key=Zab+a-G$Z+NxEv4X%vUMAPnh?8-wE&ESdFz3GA&W5X=@QAVVBvmeWPz*-?JWF*et&radius=' + this.state.radius + '&accounts_count=' + this.state.num_accounts + '&service_type=' + this.state.selectedOption.value + '&latitude=' + this.state.latitude + '&longitude=' + this.state.longitude)
                    .then((response) => {
                        if (response.data.status === 'ok') {
                            let bought_accounts = this.state.bought_accounts;
                            bought_accounts += 1;
                            this.setState({
                                bought_accounts
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .then(() => {
                        this.handleStartSpam();
                    });
            } else {
                this.setState({
                    bought_accounts: 0
                });
                document.getElementById('progressBar').style.visibility = 'hidden';
                document.getElementById('startButton').style.visibility = 'visible';
                document.getElementById('stopButton').style.visibility = 'visible';
            }
        } else{
            document.getElementById('progressBar').style.visibility = 'hidden';
            document.getElementById('startButton').style.visibility = 'visible';
            document.getElementById('stopButton').style.visibility = 'visible';
            alert('Проверьте введенные данные')
        }
    }

    handleStopSpam() {
        document.getElementById('startButton').style.visibility = 'hidden';
        document.getElementById('stopButton').style.visibility = 'hidden';
        const url = '/api/spam/stop/?force=true&app_key=Zab+a-G$Z+NxEv4X%vUMAPnh?8-wE&ESdFz3GA&W5X=@QAVVBvmeWPz*-?JWF*et';
        axios.get(url)
            .then((response) => {
                const data = response.data;
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
            .then(() => {
                document.getElementById('startButton').style.visibility = 'visible';
                document.getElementById('stopButton').style.visibility = 'visible';
            });
    }

    handleCoordinates(latitude, longitude){
        this.setState({
            latitude: latitude,
            longitude: longitude
        });
    }

    handleSelectChange(selectedOption) {
        this.setState({ selectedOption })
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    render(){
        return(
            <div className="order">
                <SettingsDisplayComponent radius={this.state.radius} num_accounts={this.state.num_accounts} selectedOption={this.state.selectedOption} handleInputChange={this.handleInputChange} handleSelectChange={this.handleSelectChange}/>
                <MapDotComponent putCoordinates={this.handleCoordinates}/>
                <div className="order--row">
                    <button id='startButton' onClick={this.handleClickStart} className="order--row__start">Начать</button>
                    <button id='stopButton' onClick={this.handleStopSpam} className="order--row__stop">Остановить</button>
                </div>
                <ProgressBar animated now={this.state.bought_accounts} max={this.state.num_accounts} className="order-progress" id="progressBar"/>
            </div>
        );
    }

}

export default OrderComponent;