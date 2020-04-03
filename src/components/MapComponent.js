import React, {Component} from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import icon_map from '../assets/map_icon.png';
import axios from 'axios';



class MapComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
      greenIcon: {
        lat: 59.940127,
        lng: 30.251783,
      },
      zoom: 13,
      orders: [],
      markers: []
    }
  }

  addMarker = (e) => {
    const {markers} = this.state;
    markers.length = 0
    markers.push(e.latlng)
    this.setState({markers})
  }

  componentDidMount(){
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

  grenIcon = L.icon({
    iconUrl: icon_map,
    iconSize: [25, 40]
  });


  render(){
    const positionGreenIcon = [this.state.greenIcon.lat, this.state.greenIcon.lng];

    return (
      <Map className="map" center={positionGreenIcon} zoom={this.state.zoom} onClick={this.addMarker}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.markers.map((position, idx) => 
          <Marker key={`marker-${idx}`} position={position} icon={this.grenIcon}>
            <Popup>
              <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
            </Popup>
          </Marker>
        )}
        {this.state.orders.map((element) => 
          <Marker key={element.id} position={[element.start_latitude, element.start_longitude]}>
            <Popup>
              <span>{element.car} <br/> {element.number} <br/> {element.color} <br/> {element.driver} <br/> {element.status}</span>
            </Popup>
          </Marker>
        )}
      </Map>
    );
  }
}

export default MapComponent;