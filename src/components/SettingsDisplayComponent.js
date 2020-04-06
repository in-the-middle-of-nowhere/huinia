import React, { Component } from 'react';
import Select from 'react-select';

const options = [
    {value: '1', label: 'Эконом'},
    {value: '2', label: 'Комфорт'},
    {value: '3', label: 'Комфорт+'},
    {value: '4', label: 'Business'},
    {value: '4', label: 'Premier'},
    {value: '5', label: 'Elite'},
];

class SettingsDisplayComponent extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <div className="order--first-form order-form">
                    <div className="order-form--content">
                        <p className="order-form--content__label">Радиус (в метрах)</p>
                        <input type="text" className="order-form--content__input" name="radius"
                                value={this.props.radius} onChange={this.props.handleInputChange}/>
                    </div>
                </div>
                <div className="order--second-form order-form">
                    <div className="order-form--content">
                        <p className="order-form--content__label">Количество аккаунтов</p>
                        <input type="text" className="order-form--content__input" name="num_accounts"
                                value={this.props.num_accounts} onChange={this.props.handleInputChange}/>
                    </div>
                </div>
                <Select
                    value={this.props.selectedOption}
                    options={options}
                    onChange={this.props.handleSelectChange}
                    className="order--select"
                />
            </div>
        );
    }

}

export default SettingsDisplayComponent;