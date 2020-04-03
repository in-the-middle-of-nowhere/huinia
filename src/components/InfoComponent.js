import React, {Component} from 'react';
import {Circle, Map, Placemark, YMaps} from 'react-yandex-maps';
import Select from 'react-select';
import axios from 'axios';
import '../styles/info.sass';
import { marker } from 'leaflet';

const options = [
    {value: '1', label: 'Эконом'},
    {value: '2', label: 'Комфорт'},
    {value: '3', label: 'Комфорт+'},
    {value: '4', label: 'Business'},
    {value: '4', label: 'Premier'},
    {value: '5', label: 'Elite'},
];

class InfoComponent extends Component {

    constructor(props) {
        super(props)

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStartSpam = this.handleStartSpam.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleStopSpam = this.handleStopSpam.bind(this);
        this.onMapClick = this.onMapClick.bind(this);

        this.state = {
            balance: null,
            account_price: null,
            can_buy: null,
            active_accounts: null,
            all_accounts: null,
            all_accounts_on_sms_acivate: null,
            selectedOption: null,
            radius: 1200,
            markers: [],
            num_accounts: '',
            coords: [],
            center: [59.928459, 30.320582],
            zoom: 10,
            circle: {
                coords: [59.927171, 30.470315]
            }
        }
    }

    newMarker = (coords) => {
        return {
            geometry: coords,
            properties: {},
            modules: []
        }
    };


    componentDidMount() {
        axios.get('/info/?app_key=Zab+a-G$Z+NxEv4X%vUMAPnh?8-wE&ESdFz3GA&W5X=@QAVVBvmeWPz*-?JWF*et')
            .then((response) => {
                const data = response.data.data;
                this.setState({
                    balance: data.info.balance,
                    account_price: data.info.account_price,
                    can_buy: data.info.can_buy_accounts,
                    active_accounts: data.accounts.free.count,
                    all_accounts: data.accounts.all.count,
                    all_accounts_on_sms_acivate: data.info.available_for_purchase,
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleSelectChange(selectedOption) {
        this.setState({selectedOption: selectedOption})
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    handleStartSpam() {
        if (this.state.selectedOption !== null && this.state.radius !== '' && this.state.num_accounts !== '') {
            const url = '/spam/start/?app_key=Zab+a-G$Z+NxEv4X%vUMAPnh?8-wE&ESdFz3GA&W5X=@QAVVBvmeWPz*-?JWF*et&radius=' + this.state.radius + '&accounts_count=' + this.state.num_accounts + '&service_type=' + this.state.selectedOption.value + '&latitude=' + this.state.markers[0].geometry[0] + '&longitude=' + this.state.markers[0].geometry[1];
            axios.get(url)
                .then((response) => {
                    const data = response.data
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    handleStopSpam() {
        const url = '/spam/stop/?force=true&app_key=Zab+a-G$Z+NxEv4X%vUMAPnh?8-wE&ESdFz3GA&W5X=@QAVVBvmeWPz*-?JWF*et';
        axios.get(url)
            .then((response) => {
                const data = response.data
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onMapClick(event) {
        const coords = event.get('coords');
        const markers = this.state.markers;

        markers.length = 0;

        if (this.state.markers.length === 0) {
            markers.push(this.newMarker(coords));
        } else {
            markers[0] = this.newMarker(coords)
        }

        this.setState({
            circle: {
                coords: coords,
            }
        })
    }

    handleDeletePhones() {
        const url = '/hide/all/accounts/?app_key=Zab+a-G$Z+NxEv4X%vUMAPnh?8-wE&ESdFz3GA&W5X=@QAVVBvmeWPz*-?JWF*et';
        axios.get(url)
            .then((response) => {
                const data = response.data
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        const {selectedOption} = this.state;
        return (
            <div className="composition">
                <div className="info">
                    <div className="info--card card">
                        <div className="card--first-row">
                            <p className="card--first-row__text"><b>Баланс:</b> {this.state.balance} ₽</p>
                        </div>
                        <div className="card--second-row second-row">
                            <div className="second-row--first-col">
                                <p className="second-row--first-col__label">Стоимость<br/>аккаунта</p>
                                <p className="second-row--first-col__text">{this.state.account_price} ₽</p>
                            </div>
                            <div className="second-row--second-col">
                                <p className="second-row--second-col__label">Доступно к<br/>покупке</p>
                                <p className="second-row--second-col__text">{this.state.can_buy} шт.</p>
                            </div>
                        </div>
                    </div>
                    <div className="info--card card">
                        <div className="card--first-row">
                            <p className="card--first-row__text"><b>Аккаунты</b></p>
                        </div>
                        <div className="card--second-row second-row">
                            <div className="second-row--first-col">
                                <p className="second-row--first-col__label">Активные</p>
                                <p className="second-row--first-col__text">{this.state.active_accounts} шт.</p>
                            </div>
                            <div className="second-row--second-col">
                                <p className="second-row--second-col__label">Всего</p>
                                <p className="second-row--second-col__text">{this.state.all_accounts} шт.</p>
                            </div>
                        </div>
                    </div>
                    <div className="info--card card">
                        <div className="card--third">
                            <p className="card--third__label"><b>Общее количество виртуальных аккаунтов<br/>доступных к
                                покупке</b></p>
                            <p className="card--third__text">{this.state.all_accounts_on_sms_acivate} шт.</p>
                        </div>
                    </div>
                </div>
                <div className="order">
                    <div className="order--first-form order-form">
                        <div className="order-form--content">
                            <p className="order-form--content__label">Радиус (в метрах)</p>
                            <input type="text" className="order-form--content__input" name="radius"
                                   value={this.state.radius} onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div className="order--second-form order-form">
                        <div className="order-form--content">
                            <p className="order-form--content__label">Количество аккаунтов</p>
                            <input type="text" className="order-form--content__input" name="num_accounts"
                                   value={this.state.num_accounts} onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <Select
                        value={selectedOption}
                        options={options}
                        onChange={this.handleSelectChange}
                        className="order--select"
                    />
                    <YMaps>
                        <Map className="order--map" state={{center: this.state.center, zoom: this.state.zoom}}
                             onClick={this.onMapClick.bind(this)}>
                            {
                                this.state.markers.map(placeMark => {
                                    return <Placemark {...placeMark} />
                                })
                            }
                            <Circle geometry={[this.state.circle.coords, this.state.radius]}
                                    options={{
                                        draggable: true,
                                        fillColor: '#DB709377',
                                        strokeColor: '#990066',
                                        strokeOpacity: 0.8,
                                        strokeWidth: 5,
                                    }}/>
                        </Map>
                    </YMaps>
                    <div className="order--row">
                        <button onClick={this.handleStartSpam} className="order--row__start">Начать</button>
                        <button onClick={this.handleStopSpam} className="order--row__stop">Остановить</button>
                    </div>
                    <button onClick={this.handleDeletePhones} className="order__delete">Удалить номера телефонов
                    </button>
                </div>
            </div>
        );
    }
}

export default InfoComponent;
