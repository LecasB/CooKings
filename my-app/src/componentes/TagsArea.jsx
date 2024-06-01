import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import supabase from "../supabaseClient";

export default function Tags({ tag, setTag }) {
  const [data, setData] = useState([]);
  /* const [valores, setValores] = useState(); */

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Supabase
        const { data: fetchedData, error } = await supabase
          .from("Tags")
          .select();

        if (error) {
          throw error;
        }

        // Set fetched data to state
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    // Call fetchData function
    fetchData();
  }, []);

  return (
    <Autocomplete
      style={{ border: "1px solid", borderRadius: "8px", padding: "4px" }}
      multiple
      id="tags-standard"
      options={data}
      getOptionLabel={(option) => option.tag} // Adjust based on your data structure
      onChange={(event, newValue) => {
        const selectedIds = newValue.map((option) => option.idTag);
        setTag(selectedIds); // Update the state with the selected IDs
        console.log("Selected tags:", selectedIds);
      }}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label="" />
      )}
    />
  );
}
