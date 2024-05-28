import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import supabase from "../supabaseClient";

export default function Tags() {
  const [setData, data] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Supabase
        const { data: fetchedData, error } = await supabase
          .from("Category_Ingredients")
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
      style={{ border: "1px solid", borderRadius: "8px" }}
      multiple
      id="tags-standard"
      options=""
      // getOptionLabel={}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label="Choose here" />
      )}
    />
  );
}
