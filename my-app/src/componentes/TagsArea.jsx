import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import supabase from "../supabaseClient";

export default function Tags() {
  const [data, setData] = useState([]);

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
      style={{ border: "1px solid", borderRadius: "8px", padding: "4px"}}
      multiple
      id="tags-standard"
      options={data}
      getOptionLabel={(option) => option.tag} // Adjust based on your data structure
      renderInput={(params) => (
        <TextField {...params} variant="standard" label="" />
      )}
    />
  );
}
