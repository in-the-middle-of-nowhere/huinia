import React, { Component } from 'react';
import MapComponent from './MapComponent';
import { Map, Placemark, YMaps} from 'react-yandex-maps';


class MapDotComponent extends Component{
    constructor(props){
        super(props)
            
        this.onMapClick = this.onMapClick.bind(this);

        this.state = {
            markers: [],
            coords: [],
            center: [59.928459, 30.320582],
            zoom: 10,
            circle: {
                coords: [59.927171, 30.470315]
            }
        }
    }

    newMarker = (coords) => {
        return {
            geometry: coords,
            properties: {},
            modules: []
        }
    };

    onMapClick(event) {
        const coords = event.get('coords');
        const markers = this.state.markers;

        markers.length = 0;

        if (this.state.markers.length === 0) {
            markers.push(this.newMarker(coords));
        } else {
            markers[0] = this.newMarker(coords)
        }

        this.props.putCoordinates(this.state.markers[0].geometry[0], this.state.markers[0].geometry[1])
    }

    render(){
        return(
            <YMaps>
                <Map className="order--map" state={{center: this.state.center, zoom: this.state.zoom}}
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

export default MapDotComponent;