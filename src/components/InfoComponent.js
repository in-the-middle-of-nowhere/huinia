import React, {Component} from 'react';
import axios from 'axios';
import '../styles/info.sass';
import InfoDisplayComponent from './InfoDisplayComponent';

class InfoComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            balance: null,
            account_price: null,
            can_buy: null,
            active_accounts: null,
            all_accounts: null,
            all_accounts_on_sms_acivate: null
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

    render() {
        return (
            <div className="composition">
                <InfoDisplayComponent balance={this.state.balance} account_price={this.state.account_price} 
                        can_buy={this.state.can_buy} active_accounts={this.state.active_accounts} 
                        all_accounts={this.state.all_accounts} all_accounts_on_sms_acivate={this.state.all_accounts_on_sms_acivate}/>
                <button id='deleteButton' onClick={this.handleDeletePhones} className="composition__delete">Удалить аккаунты</button>
            </div>
        );
    }
}

export default InfoComponent;
