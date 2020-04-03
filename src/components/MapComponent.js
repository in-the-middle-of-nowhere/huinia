import React, {Component} from 'react';
import {Map, Placemark, YMaps} from 'react-yandex-maps';
import axios from 'axios';


class MapComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            center: [59.927171, 30.470315],
            zoom: 13,
            orders: [],
            markers: [{
                geometry: [59.927171, 30.470315],
                properties: {
                    balloonContent: 'Тут пидорас'
                },
                modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']
            }, {
                geometry: [59.927171, 30.42315],
                properties: {
                    balloonContent: 'Тут пидорас'
                },
                modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']
            }]
        };
    }

    addMarker = (e) => {
        const {markers} = this.state;
        markers.length = 0;
        markers.push(e.latlng);
        this.setState({markers})
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
                <Map className="map" defaultState={{center: this.state.center, zoom: this.state.zoom}}>
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