import React, { Component } from 'react';

class InfoDisplayComponent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="info">
                <div className="info--card">
                    <div className="info--card--first-row">
                        <p className="info--card--first-row__text"><b>Баланс:</b> {this.props.balance} ₽</p>
                    </div>
                    <div className="info--card--second-row second-row">
                        <div className="second-row--first-col">
                            <p className="second-row--first-col__label">Стоимость<br/>аккаунта</p>
                            <p className="second-row--first-col__text">{this.props.account_price} ₽</p>
                        </div>
                        <div className="second-row--second-col">
                            <p className="second-row--second-col__label">Доступно к<br/>покупке</p>
                            <p className="second-row--second-col__text">{this.props.can_buy} шт.</p>
                        </div>
                    </div>
                </div>
                <div className="info--card">
                    <p className="active-accounts info--card--first-row__text"><b>Аккаунты</b></p>
                    <p className="second-row--first-col__text">{this.props.active_accounts} шт.</p>
                </div>
                <div className="info--card">
                    <div className="info--card--third">
                        <p className="info--card--third__label"><b>Общее количество виртуальных аккаунтов<br/>доступных к
                            покупке</b></p>
                        <p className="info--card--third__text">{this.props.all_accounts_on_sms_acivate} шт.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoDisplayComponent;