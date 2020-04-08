import React, { Component } from 'react';
import axios from 'axios';
import '../styles/account.sass';
import {ProgressBar} from 'react-bootstrap';

class BuyAccounts extends Component{

    constructor(props){
        super(props);

        this.handleClickBuy = this.handleClickBuy.bind(this);
        this.handleBuyPhones = this.handleBuyPhones.bind(this);
        this.handleAccounts = this.handleAccounts.bind(this);

        this.state = {
            accounts_to_buy: 0,
            accounts_bought: 0
        }

    }

    handleClickBuy(){
        document.getElementById('progressBarBuy').style.visibility = 'visible';
        document.getElementById('buyButton').style.visibility = 'hidden';
        document.getElementById('buyInput').setAttribute('disabled', 'true');
        this.handleBuyPhones();
    }

    handleBuyPhones(){
        if (this.state.accounts_to_buy > 0) {
            if (this.state.accounts_to_buy > this.state.accounts_bought) {
                axios.get('/api/account/create/?app_key=Zab+a-G$Z+NxEv4X%vUMAPnh?8-wE&ESdFz3GA&W5X=@QAVVBvmeWPz*-?JWF*et')
                    .then((response) => {
                        if (response.data.status === 'ok') {
                            let accounts_bought = this.state.accounts_bought;
                            console.log(response.data);
                            accounts_bought += 1;
                            this.setState({
                                accounts_bought
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .then(() => {
                        this.handleBuyPhones();
                    });
            } else {
                this.setState({
                    accounts_bought: 0
                });
                document.getElementById('progressBarBuy').style.visibility = 'hidden';
                document.getElementById('buyButton').style.visibility = 'visible';
                document.getElementById('buyInput').removeAttribute('disabled');
            }
        } else{
            document.getElementById('progressBarBuy').style.visibility = 'hidden';
            document.getElementById('buyButton').style.visibility = 'visible';
            document.getElementById('buyInput').removeAttribute('disabled');
            alert('Проверьте введенные данные')
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
                    <p className="account--content__label">Количество аккаунтов<br/>для покупки</p>
                    <input id='buyInput' type="text" className="account--content__input" name="accounts_to_buy"
                            value={this.state.accounts_to_buy} onChange={this.handleAccounts}/>
                    <button id='buyButton' onClick={this.handleClickBuy} className="account--content__buy">Купить аккаунты</button>
                    <ProgressBar animated now={this.state.accounts_bought} max={this.state.accounts_to_buy} className="buy-progress" id="progressBarBuy"/>
                </div>
            </div>
        );
    }
}

export default BuyAccounts;