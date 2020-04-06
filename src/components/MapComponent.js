import React, {Component} from 'react';
import {Circle, Map, Placemark, YMaps} from 'react-yandex-maps';
import axios from 'axios';


class MapComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            radius: 300,
            center: [59.928459, 30.320582],
            zoom: 10,
            orders: []
        };
    }

    newMarker = (data) => {

        return {
            geometry: data.position,
            properties: {
                balloonContent: `<div style="width: 150px; padding: 5px;">
                    <div style="display: flex;">
                        <div style="font-weight: bold">${data.car}</div>
                    </div>
                    <div style="font-family: 'Roboto'">${data.driver}</div>
                    <div style="display: flex">
                        <div style="margin-top: auto; margin-bottom: auto; margin-left: 0;">${data.status}</div>
                        <div style="padding: 4px; margin: 5px; border: 1px solid #000; border-radius: 10px;">
                            ${data.number.slice(0, 1)} ${data.number.slice(1, 4)} ${data.number.slice(4)}
                        </div>
                    </div>
                </div>`
            },
            modules: ['geoObject.addon.balloon']
        }
    };

    componentDidMount() {
        axios.get('/api/info/orders/?app_key=Zab+a-G$Z+NxEv4X%vUMAPnh?8-wE&ESdFz3GA&W5X=@QAVVBvmeWPz*-?JWF*et')
            .then((response) => {

                const orders = this.state.orders;
                orders.length = 0;
                
                response.data.data.forEach(element => {
                    orders.push(this.newMarker({
                        position: [element.start_latitude, element.start_longitude],
                        car: element.car, number: element.number,
                        color: element.color, driver: element.driver,
                        status: element.status
                    }))
                });

                this.setState({orders})
                console.log(this.state.orders);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {

        return (
            <YMaps>
                <Map className="map" defaultState={{center: this.state.center, zoom: this.state.zoom}}>
                    {
                        this.state.orders.map(placeMark => {
                            return <Placemark {...placeMark} />
                        })
                    }

                </Map>
            </YMaps>
        );
    }
}

export default MapComponent;