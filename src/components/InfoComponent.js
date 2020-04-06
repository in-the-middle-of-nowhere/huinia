import React, {Component} from 'react';
import axios from 'axios';
import '../styles/info.sass';
import MapDotComponent from './MapDotComponent';
import InfoDisplayComponent from './InfoDisplayComponent';
import SettingsDisplayComponent from './SettingsDisplayComponent';

class InfoComponent extends Component {

    constructor(props) {
        super(props)

        this.handleStartSpam = this.handleStartSpam.bind(this);
        this.handleStopSpam = this.handleStopSpam.bind(this);
        this.handleCoordinates = this.handleCoordinates.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        
        this.state = {
            balance: null,
            account_price: null,
            can_buy: null,
            active_accounts: null,
            all_accounts: null,
            all_accounts_on_sms_acivate: null,
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


    componentDidMount() {
        axios.get('/api/info/?app_key=Zab+a-G$Z+NxEv4X%vUMAPnh?8-wE&ESdFz3GA&W5X=@QAVVBvmeWPz*-?JWF*et')
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

    handleStartSpam() {
        if (this.state.selectedOption !== null && this.state.radius !== '' && this.state.num_accounts !== '') {
            const url = '/api/spam/start/?app_key=Zab+a-G$Z+NxEv4X%vUMAPnh?8-wE&ESdFz3GA&W5X=@QAVVBvmeWPz*-?JWF*et&radius=' + this.state.radius + '&accounts_count=' + this.state.num_accounts + '&service_type=' + this.state.selectedOption.value + '&latitude=' + this.state.latitude + '&longitude=' + this.state.longitude;
            axios.get(url)
                .then((response) => {
                    alert('Заказы оформлены')
                })
                .catch((error) => {
                    console.log(error);
                    alert('Ошибка, нажмите на стоп и закажите снова')
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

    handleDeletePhones() {
        const url = '/api/hide/all/accounts/?app_key=Zab+a-G$Z+NxEv4X%vUMAPnh?8-wE&ESdFz3GA&W5X=@QAVVBvmeWPz*-?JWF*et';
        axios.get(url)
            .then((response) => {
                const data = response.data
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleSelectChange(selectedOption) {
        this.setState({ selectedOption })
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="composition">
                <InfoDisplayComponent balance={this.state.balance} account_price={this.state.account_price} 
                        can_buy={this.state.can_buy} active_accounts={this.state.active_accounts} 
                        all_accounts={this.state.all_accounts} all_accounts_on_sms_acivate={this.state.all_accounts_on_sms_acivate}/>
                <div className="order">
                    <SettingsDisplayComponent radius={this.state.radius} num_accounts={this.state.num_accounts} selectedOption={this.state.selectedOption} handleInputChange={this.handleInputChange} handleSelectChange={this.handleSelectChange}/>
                    <MapDotComponent putCoordinates={this.handleCoordinates}/>
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
