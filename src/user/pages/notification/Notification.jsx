import React, { useEffect, useState } from "react";
import supabase from "../../../utilities/supabase";
import { ToastContainer, toast } from 'react-toastify';

const Notification = () => {

    const buttonStyle = {
        padding: "6px 12px",
        fontSize: "14px",
        backgroundColor: "#7016c4", // Blue color
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)", // Uniform shadow
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        alignSelf: "flex-end", // Aligns button at the bottom
    };

    const [crimeData, setCrimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const notify = () => toast("New Notification!");

    // Haversine formula to calculate distance in km
    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const degToRad = (deg) => deg * (Math.PI / 180);
        const dLat = degToRad(lat2 - lat1);
        const dLon = degToRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const fetchCrime = async () => {
        setLoading(true);
        const userId = sessionStorage.getItem('uid');
    
        // Fetch previously seen notifications
        const { data: notifications, error: notifError } = await supabase
            .from("tbl_notification")
            .select("notification_crime_id")
            .eq("notification_user_id", userId);
    
        if (notifError) {
            console.error("Error fetching notifications:", notifError);
            setLoading(false);
            return;
        }
    
        const seenCrimeIds = notifications.map(n => n.notification_crime_id);
    
        // Fetch crime data
        const { data, error } = await supabase.from("tbl_crime").select().eq("crime_status", 1);
        if (error) {
            console.error("Error fetching crime data:", error);
            setLoading(false);
            return;
        }
    
        if (userLocation) {
            const filteredCrimes = data
                .filter(crime => !seenCrimeIds.includes(crime.id)) // Exclude seen notifications
                .map(crime => {
                    const distance = getDistanceFromLatLonInKm(
                        userLocation.lat,
                        userLocation.lon,
                        parseFloat(crime.crime_lan),
                        parseFloat(crime.crime_log)
                    );
                    return { ...crime, distance };
                })
                .filter(crime => crime.distance <= 10) // Filter crimes within 10km
                .sort((a, b) => a.distance - b.distance); // Sort by distance
    
            setCrimeData(filteredCrimes);
        }
    
        setLoading(false);
    };
    

    // Get user's location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            (error) => console.error("Error getting location:", error),
            { enableHighAccuracy: true }
        );
    }, []);

    // Fetch crime data when user location is set
    useEffect(() => {
        if (userLocation) {
            fetchCrime();
        }
    }, [userLocation]);

    const removeNotification = async (id) => {
        const notiData = {
            notification_crime_id: id,
            notification_user_id: sessionStorage.getItem('uid')
        }
        try {
            const { error } = await supabase
                .from("tbl_notification")
                .insert([notiData]);

            if (error) {
                console.error("Supabase Insert Error:", error.message);
            } else {
                console.log("Location added to database successfully.");
                fetchCrime()
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };

    return (

        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <h2>Notifications 🔔</h2>
            {loading ? (
                <p>Loading...</p>
            ) : crimeData.length === 0 ? (
                <p>No new notifications</p>
            ) : (
                crimeData.map((notif) => (
                    <div key={notif.id} style={{ padding: "0px 10px 10px 10px", border: "1px solid #ccc", marginBottom: "10px", borderRadius: "10px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)" }}>
                        <p><strong>{notif.crime_subject || "Unknown Subject"}</strong></p>
                        <p>{notif.crime_details}</p>
                        <p style={{ fontSize: "12px", color: "gray" }}>
                            Distance: {notif.distance.toFixed(2)} km
                        </p>
                        <button onClick={() => removeNotification(notif.id)} style={buttonStyle}>Dismiss</button>

                    </div>
                ))
            )}
            <button onClick={notify}>Notify!</button>
            <ToastContainer />
        </div>
    );
};

export default Notification;
