import React, {Component} from 'react';
import {Circle, Map, Placemark, YMaps} from 'react-yandex-maps';
import axios from 'axios';


class MapComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            radius: 300,
            center: [59.927171, 30.470315],
            zoom: 13,
            orders: [],
            circle: {
                coords: [59.927171, 30.470315],
            },
            markers: [
                this.newMarker({
                    position: [59.927171, 30.470315],
                    car: 'BMW 7x', number: 'R283RR',
                    color: 'Черный', driver: 'Василий Петрович',
                    status: 'waiting'
                }),
                this.newMarker({
                    position: [59.927171, 30.450315],
                    car: 'BMW 7x', number: 'R283RR',
                    color: 'Черный', driver: 'Василий Петрович',
                    status: 'driving'
                })
            ]
        };
    }

    onMapClick(event) {
        this.setState({
            circle: {
                coords: event.get('coords')
            }
        });
    }

    newMarker = (data) => {
        const status = {
            search: {
                text: 'Поиск',
                color: '#1771F1'
            },
            driving: {
                text: 'Едет',
                color: '#A400FF'
            },
            waiting: {
                text: 'Ожидает',
                color: '#F85C50'
            }
        };
        const dataStatus = status[data.status];

        return {
            geometry: data.position,
            properties: {
                balloonContent: `<div style="width: 150px">
                    <div style="display: flex; margin-bottom: 10px">
                        <div style="padding: 5px; font-weight: bold">${data.car}</div>
                        <div style="padding: 5px">${data.color}</div>
                    </div>
                    <div style="display: flex">
                        <div style="padding: 4px; margin: 5px; margin-left: 0; color: ${dataStatus.color}">${dataStatus.text}</div>
                        <div style="padding: 4px; margin: 5px; border: 1px solid #000; border-radius: 10px; width: 60px">
                            ${data.number.slice(0, 1)} ${data.number.slice(1, 4)} ${data.number.slice(4)}
                        </div>
                    </div>
                    <div style="margin-top: 10px; font-family: 'Roboto'">${data.driver}</div>
                </div>`
            },
            modules: ['geoObject.addon.balloon']
        }
    };

    componentDidMount() {
        axios.get('info/orders/?app_key=Zab+a-G$Z+NxEv4X%vUMAPnh?8-wE&ESdFz3GA&W5X=@QAVVBvmeWPz*-?JWF*et')
            .then((response) => {
                this.setState({
                    orders: response.data.data
                });
                console.log(this.state.orders);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <YMaps>
                <Map className="map" defaultState={{center: this.state.center, zoom: this.state.zoom}}
                     onClick={this.onMapClick.bind(this)}>
                    {
                        this.state.markers.map(placeMark => {
                            return <Placemark {...placeMark} />
                        })
                    }

                </Map>
            </YMaps>
        );
    }
}

export default MapComponent;