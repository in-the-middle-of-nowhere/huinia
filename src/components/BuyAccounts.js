import React, { Component } from 'react';
import axios from 'axios';
import '../styles/account.sass';
import {ProgressBar} from 'react-bootstrap';

class BuyAccounts extends Component{

    constructor(props){
        super(props)

        this.handleBuyPhones = this.handleBuyPhones.bind(this);
        this.handleAccounts = this.handleAccounts.bind(this);

        this.state = {
            accounts_to_buy: 0,
            accounts_bought: 0
        }

    }

    handleBuyPhones(){
        if (this.state.accounts_to_buy !== 0){
            const url =  '/api/account/create/?app_key=Zab+a-G$Z+NxEv4X%vUMAPnh?8-wE&ESdFz3GA&W5X=@QAVVBvmeWPz*-?JWF*et';
            axios.get(url)
                .then((response) => {
                    console.log(response.data)
                    if(response.data.status === 'ok'){
                        console.log('Осталось купить ' + this.state.num_accounts);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    handleAccounts(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    render(){
        return(
            <div className="account">
                <div className="account--content">
                    <p className="account--content__label">Количество аккаунтов для покупки</p>
                    <input type="text" className="account--content__input" name="num_accounts"
                            value={this.state.accounts_to_buy} onChange={this.handleAccounts}/>
                    <button id='buyButton' onClick={this.handleBuyPhones} className="account--content__buy">Купить аккаунты</button>
                </div>
            </div>
        );
    }
}

export default BuyAccounts;