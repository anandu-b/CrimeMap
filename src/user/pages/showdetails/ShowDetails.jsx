import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../../utilities/supabase";

const ShowDetails = () => {
  const { id } = useParams();
  const [crimeData, setCrimeData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch crime details by ID
  const fetchCrime = async () => {
    const { data, error } = await supabase
      .from("tbl_crime")
      .select()
      .eq("id", id) // Filter by ID
      .single(); // Get a single row

    if (error) {
      console.error("Error fetching crime details:", error);
    } else {
      setCrimeData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCrime();
  }, [id]); // Runs when `id` changes

  if (loading) return <p>Loading...</p>;
  if (!crimeData) return <p>No crime data found.</p>;

  return (
    <div>
      <h2>Crime Details</h2>
      <p><strong>ID:</strong> {crimeData.id}</p>
      <p><strong>Time:</strong> {new Date(crimeData.created_at).toLocaleString()}</p>
      <p><strong>Location:</strong> {crimeData.crime_lan}, {crimeData.crime_log}</p>
      <p><strong>Subject:</strong> {crimeData.crime_subject}</p>
      <p><strong>Details:</strong> {crimeData.crime_details || "No details available"}</p>
      <p><strong>Status:</strong> {crimeData.crime_status || "Unknown"}</p>
    </div>
  );
};

export default ShowDetails;
