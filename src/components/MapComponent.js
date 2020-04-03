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
            markers: [{
                geometry: [59.927171, 30.470315],
                properties: {
                    balloonContent: "<span>BMW 7x <br/> R283RR <br/> Черный\n" +
                        "                        <br/> Василий Петрович <br/> Едет</span>"
                },
                modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']
            }, {
                geometry: [59.927171, 30.42315],
                properties: {
                    balloonContent: "<span>BMW 7x <br/> R283RR <br/> Черный\n" +
                        "                        <br/> Василий Петрович <br/> Едет</span>"
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
                    <Circle
                        geometry={[[59.927171, 30.470315], this.state.radius]}
                        options={{
                            draggable: true,
                            fillColor: '#DB709377',
                            strokeColor: '#990066',
                            strokeOpacity: 0.8,
                            strokeWidth: 5,
                        }}
                    />
                </Map>
            </YMaps>
        );
    }
}

export default MapComponent;