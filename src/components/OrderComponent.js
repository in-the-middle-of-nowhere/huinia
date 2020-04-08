import React, { Component } from 'react';
import axios from 'axios';
import '../styles/order.sass';
import MapDotComponent from './MapDotComponent';
import SettingsDisplayComponent from './SettingsDisplayComponent';

class OrderComponent extends Component{
    constructor(props){
        super(props)

        this.handleStartSpam = this.handleStartSpam.bind(this);
        this.handleStopSpam = this.handleStopSpam.bind(this);
        this.handleCoordinates = this.handleCoordinates.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

        this.state = {
            selectedOption: null,
            radius: 500,
            markers: [],
            num_accounts: 0,
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


    handleStartSpam() {
        if (this.state.radius !== 0 && this.state.num_accounts !== 0 && this.state.selectedOption !== null){
            const url = '/api/create/order/?app_key=Zab+a-G$Z+NxEv4X%vUMAPnh?8-wE&ESdFz3GA&W5X=@QAVVBvmeWPz*-?JWF*et&radius=' + this.state.radius + '&accounts_count=' + this.state.num_accounts + '&service_type=' + this.state.selectedOption.value + '&latitude=' + this.state.latitude + '&longitude=' + this.state.longitude;
            axios.get(url)
                .then((response) => {
                    console.log(response.data.status)
                    if (response.data.status === 'ok'){
                        alert('Осталось ' + this.state.num_accounts + ' оформить')
                        const num_accounts  = this.state.num_accounts - 1;
                        this.setState({
                            num_accounts
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert('Что то пошло не так');
                })
                .then((data) => {
                    if (this.state.num_accounts !== 0){
                        this.handleStartSpam();
                    } else{
                        //do something...
                    }
                })
        } else{
            alert('Заполните все поля!')
        }
    }

    handleStopSpam() {
        const url = '/api/spam/stop/?force=true&app_key=Zab+a-G$Z+NxEv4X%vUMAPnh?8-wE&ESdFz3GA&W5X=@QAVVBvmeWPz*-?JWF*et';
        axios.get(url)
            .then((response) => {
                const data = response.data
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
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
                    <button id='startButton' onClick={this.handleStartSpam} className="order--row__start">Начать</button>
                    <button id='stopButton' onClick={this.handleStopSpam} className="order--row__stop">Остановить</button>
                </div>
            </div>
        );
    }

}

export default OrderComponent;