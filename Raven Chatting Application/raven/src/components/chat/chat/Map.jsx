import { useEffect, useState, useContext } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Button } from "@mui/material";
import { AccountContext } from "../../../context/AccountProvider";

import { newMessage } from "../../../services/api";

const Map = ({ isVisible, toggleMapVisibility }) => {
  const [mapVisible, setMapVisible] = useState(isVisible);
  const [coordinates, setCoordinates] = useState(null);
  const [mapLayer, setMapLayer] = useState("street");
  
  const { socket, person, account,Conversation,setMessages } = useContext(AccountContext);

  console.log("Soxket : ",socket)

  useEffect(() => {
    if (mapVisible && !coordinates) {
      fetchDeviceCoordinates();
    }
  }, [mapVisible]);

  const fetchDeviceCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
      });
    }
  };

  useEffect(() => {
    if (mapVisible && coordinates) {
      const map = L.map("map").setView([coordinates.lat, coordinates.lng], 13);
      
      const streetLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 19,
        }
      );

      const cartoCDNLayer = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution:
            '© <a href="https://carto.com/attributions">CARTO</a> contributors',
        }
      );

      const selectedLayer = mapLayer === "street" ? streetLayer : cartoCDNLayer;
      selectedLayer.addTo(map);

      const customIcon = L.icon({
        iconUrl: "/assets/placeholder.png",
        iconSize: [32, 32],
      });
      L.marker([coordinates.lat, coordinates.lng], { icon: customIcon }).addTo(
        map
      );

      return () => {
        map.remove();
      };
    }
  }, [mapVisible, coordinates, mapLayer]);

  const handleCloseMap = () => {
    toggleMapVisibility();
  };

  const handleToggleLayer = () => {
    setMapLayer((prevLayer) => (prevLayer === "street" ? "cartoCDN" : "street"));
  };

  const sendLocation = async() => {
    if (coordinates) {
      const locationMessage = {
        senderId: account.sub,
        receiverId: person.sub,
        conversationId: Conversation._id,
        lat: coordinates.lat,
        lng: coordinates.lng,
        type: "location",
        
        
      };
      /*message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: Conversation._id,
          lat: coordinates.lat,
          lng: coordinates.lng,
          text:'location hi hello',
          type: "location",
        };*/
        await newMessage(locationMessage);
      //setMessages((prev) => [...prev, locationMessage]);
      console.log("Location",locationMessage)
  
      socket.current.emit("sendMessage", locationMessage);
    }
    toggleMapVisibility();
  };
  
  

  const buttonStyle = {
    color: "black",
    backgroundColor: "white",
    border: "1px solid black",
    marginRight: "10px",
  };

  return (
    <>
      {mapVisible && (
        <Box
          id="map"
          style={{
            height: "650px",
            overflow: "hidden",
            transition: "height 0.5s",
            zIndex: 500,
          }}
        ></Box>
      )}
      {mapVisible && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseMap}
            sx={buttonStyle}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleToggleLayer}
            sx={buttonStyle}
          >
            Toggle Layer
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={sendLocation} // Call the sendLocation function to send your location
            sx={buttonStyle}
          >
            Send Location
          </Button>
        </Box>
      )}
    </>
  );
};

export default Map;
