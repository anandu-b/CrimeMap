import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import supabase from "../../../utilities/supabase";
import { useNavigate } from "react-router-dom";
import ShowDetails from "../showdetails/ShowDetails";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 0, // Fallback values
  lng: 0,
};

const ShowMap = () => {
  const [center, setCenter] = useState(defaultCenter);
  const [crimeLocations, setCrimeLocations] = useState([]);
  const navigate = useNavigate()

  // Get user's location when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);

          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.warn("Geolocation permission denied. Using default location.");
        }
      );
    }
  }, []);

  // Fetch crime locations
  useEffect(() => {
    const fetchCrimeLocations = async () => {
      const { data, error } = await supabase.from("tbl_crime").select("id, crime_lan, crime_log").eq("crime_status", 1);
      if (error) {
        console.error("Error fetching crime locations:", error);
      } else {
        const locations = data
          .filter((crime) => crime.crime_lan && crime.crime_log)
          .map((crime) => ({
            id: crime.id, // Store crime ID
            lat: parseFloat(crime.crime_lan),
            lng: parseFloat(crime.crime_log),
          }));

        setCrimeLocations(locations);
      }
    };

    fetchCrimeLocations();
  }, []);


  // Function to handle marker click
  const handleMarkerClick = (id) => {
    navigate(`/user/viewcrime-details/${id}`); // Navigate to crime details page
  };

  return (
    <div>
    <LoadScript >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {/* Render crime markers */}
        {crimeLocations.map((crime, index) => (
          <Marker key={index} position={crime} onClick={() => handleMarkerClick(crime.id)} />
        ))}
      </GoogleMap>
    </LoadScript>

    </div>
  );
};

export default ShowMap;
