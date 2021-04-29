import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
//import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Autocomplete from "react-google-autocomplete";
import MarkerCustom from "./MarkerCustom";



import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  Col,
} from "reactstrap";

import "bootstrap/dist/css/bootstrap.css";
const calculate = require("calculate-geo-distance");
const geolib = require("geolib");


const mapStyles = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export class MapContainer extends Component {
  constructor(props) {
   // this.handleGoogleMapApi = this.handleGoogleMapApi.bind(this);
    super(props);

    this.state = {
      lat: 6.4489788,
      lng: 3.5104537,
      text1: false,
      text2: false,

      lat2: 6.4189788,
      lng2: 3.5204537,
      showInfoWindow: true,
      selectedPlace: null,
      activeMarker: null,
      zoom: 14,

      addressName: "",
      addressName2:''
    };
  }

  componentDidMount(props) {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        alert("DONE");
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          addressName: "Lekki, Lagos Nigeria",
        };
      });
    }
  }
    getMapCenter = (args) => {
      alert(JSON.stringify(args))
    this.setState({ center: args.center });
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };
    
    componentDidUpdate()
    {
         this.handleGoogleMapApi(this.props.google);

    }

    handlePickUpDropOff= async(data)=>
    {
        if (this.state.text1 || this.state.text2)
        {

            let lat = data.lat;
            let lng = data.lng;
            let addr = data.addressName;
            let uid = 'okechukwu0127@gmail.com'
            let req =data.req
            

            let URL =
              "http://443c4d32c45b.ngrok.io/2019/betbank/public/api/gokada/percel_request?uid=" +
              uid +
              "&lat=" +
              lat +
              "&lng=" +
              lng +
              "&addr=" +
              addr+'&req='+req;

            await fetch(URL)
              .then((res) => res.json())
              .then(
                  (result) => {
                      
                     // alert("Pacel Request Placed");
                      console.log("Success :: " + URL);
                      console.log(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                  alert("Error :: " + JSON.stringify(error));
                }
              );
            
        }
        else {
            console.log('No Text Save');
        }

    }

    handleGoogleMapApi = (google) => {
      
    var flightPath = new google.maps.Polyline({
      path: [
        { lat: this.state.lat, lng: this.state.lng },
        { lat: this.state.lat2, lng: this.state.lng2 },
      ],
      geodesic: true,
      strokeColor: "#33BD4E",
      strokeOpacity: 1,
      strokeWeight: 10,
    });
        
        console.log(JSON.stringify(google.map))

    flightPath.setMap(google.map);
  };

  render() {
    //var points = [{ lat: this.state.lat, lng: this.state.lng}];
    var bounds = new this.props.google.maps.LatLngBounds();

      bounds.extend({ lat: this.state.lat, lng: this.state.lng });
     

    return (
      <div>
        <Map
          //bounds={bounds}
          className="GOOGLEMAP"
          google={this.props.google}
          zoom={this.state.zoom}
          style={mapStyles}
          onChange={this.getMapCenter}
          center={{ lat: this.state.lat, lng: this.state.lng }}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.lng,
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.handleGoogleMapApi}
          //onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
        >
          <Card
            style={{
              position: "absolute",
              alignSelf: "center",
              bottom: 0,
              width: 97 + "%",
              margin: 5,
              display: this.state.text1 && this.state.text2 ? "block" : "none",
            }}
          >
            <CardBody
              style={{
                justifyContent: "center",
                alignSelf: "center",
                textAlign: "center",
                width: 90 + "%",
              }}
            >
              <Row xs="2">
                <Col
                  style={{ fontWeight: "800", fontSize: 11, textAlign: "left" }}
                >
                  ₦
                  {(
                    (geolib.getPreciseDistance(
                      { latitude: this.state.lat, longitude: this.state.lng },
                      { latitude: this.state.lat2, longitude: this.state.lng2 }
                    ) /
                      60) *
                    22
                  ).toFixed(0)}
                </Col>
                <Col
                  style={{
                    fontWeight: "800",
                    fontSize: 11,
                    textAlign: "right",
                  }}
                >
                  {calculate(
                    this.state.lat,
                    this.state.lng,
                    this.state.lat2,
                    this.state.lng2
                  ).toFixed(2)}
                  {"KM "}/{" "}
                  {(
                    geolib.getPreciseDistance(
                      { latitude: this.state.lat, longitude: this.state.lng },
                      { latitude: this.state.lat2, longitude: this.state.lng2 }
                    ) / 60
                  ).toFixed(2) + " Mins"}
                </Col>
              </Row>

              <Button
                block
                color="success"
                style={{ fontSize: 13, marginTop: 15, padding: 15 }}
              >
                Enter Percel Details
              </Button>
            </CardBody>
          </Card>

          <Card
            style={{
              position: "absolute",
              alignSelf: "center",
              width: 100 + "%",
              margin: 5,
            }}
          >
            <CardBody
              style={{
                justifyContent: "center",
                alignSelf: "center",
                textAlign: "center",
                width: 90 + "%",
              }}
            >
              <CardTitle tag="h5" style={{ marginTop: 0 }}>
                Pacel Request
              </CardTitle>
              <CardSubtitle
                tag="h6"
                style={{ fontSize: 11 }}
                className="mb-2 text-muted"
              >
                Provide you pickup & drop-off location
              </CardSubtitle>

              <Form>
                <FormGroup>
                  <Autocomplete
                    className={"form-control"}
                    apiKey="AIzaSyB33FTgfeVBP3a6f3s7kIwIYc3fpOIWjGE"
                    style={{ width: "95%", backgroundColor: "#f0efef" }}
                    options={{
                      types: ["address"],
                      //field: ["address_components"],
                      componentRestrictions: { country: "NG" },
                    }}
                    placeholder={"Pickup Address"}
                    onPlaceSelected={(
                      place,
                      inputRef,
                      theSameAutocompletRef
                    ) => {

                       
                      this.setState({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        addressName: place.formatted_address,
                        text1: true,
                      }, () => {
                           let data = {
                             lat: place.geometry.location.lat(),
                             lng: place.geometry.location.lng(),
                             addressName: place.formatted_address,
                             req: "pickup",
                           };
                           this.handlePickUpDropOff(data);
                      });
                        
                      //console.log(place);
                    }}
                    //defaultValue="Lagos"
                  />

                  {/* <Input
                        type="email"
                        style={{ width: 100 + "%", backgroundColor: "#f0efef" }}
                        name="email"
                        id="exampleEmail"
                        placeholder="Pickup Address"
                      /> */}
                </FormGroup>
                <FormGroup>
                  <Autocomplete
                    className={"form-control"}
                    placeholder={"DropOff Address"}
                    apiKey="AIzaSyB33FTgfeVBP3a6f3s7kIwIYc3fpOIWjGE"
                    style={{ width: "95%", backgroundColor: "#f0efef" }}
                    options={{
                      //types: ["(cities)"],
                      componentRestrictions: { country: "NG" },
                    }}
                    onPlaceSelected={(
                      place,
                      inputRef,
                      theSameAutocompletRef
                    ) => {

                        


                      this.setState({
                        lat2: place.geometry.location.lat(),
                        lng2: place.geometry.location.lng(),
                        addressName2: place.formatted_address,
                        text2: true,
                      }, () => {
                          let data = {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                            addressName: place.formatted_address,
                            req: "dropoff",
                          };
                          this.handlePickUpDropOff(data);
                      });
                      //console.log(place);
                    }}
                    //defaultValue="Lagos"
                  />
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
          <Marker
            icon={{
              url: "https://mybetbank.com/pickup.fw.png",

              // anchor: new this.props.google.maps.Point(17, 46),

              scaledSize: new this.props.google.maps.Size(77, 59),
            }}
            position={{ lat: this.state.lat, lng: this.state.lng }}
            onClick={this.onMarkerClick}
            name={this.state.addressName}
          ></Marker>

          <InfoWindow
            visible={this.state.showInfoWindow}
            onClose={this.onInfoWindowClose}
          ></InfoWindow>

          {/*  <MarkerCustom
            lat={this.state.lat}
            lng={this.state.lng}
            name={this.state.addressName}
            color="blue"
          /> */}

          <Marker
            icon={{
              url:
                //"https://www.flaticon.com/svg/vstatic/svg/3709/3709562.svg?token=exp=1619658059~hmac=be080da08dd9e1a478552798d1af1269",
                "https://mybetbank.com/dropoff.fw.png",
              // anchor: new this.props.google.maps.Point(17, 46),

              scaledSize: new this.props.google.maps.Size(77, 59),
            }}
            position={{ lat: this.state.lat2, lng: this.state.lng2 }}
            onClick={this.onMarkerClick}
            name={this.state.addressName}
          />

          <InfoWindow
            visible={this.state.showInfoWindow}
            onClose={this.onInfoWindowClose}
          >
            <div>
              <h1>{this.state.addressName}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

const LoadingContainer = (props) => (
  <div style={{ textAlign: "center", width:100+'%'}}>
    <img
      style={{ width: 290, height: 290 }}
      src="https://i.pinimg.com/originals/4d/f9/6d/4df96d609e207d9bf897e68e342f72c4.gif"
    />
  </div>
);

export default GoogleApiWrapper({
  apiKey: "AIzaSyDiaWqMsip-l29d8pfeBlk9v7PlOZFFtjk",
  LoadingContainer: LoadingContainer,
})(MapContainer);
