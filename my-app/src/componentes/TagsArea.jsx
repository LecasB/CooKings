import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import supabase from "../supabaseClient";

export default function TagsArea({ tag, setTag, setIsDirty }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedData, error } = await supabase
          .from("Tags")
          .select();

        if (error) {
          throw error;
        }

        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Autocomplete
      style={{ border: "1px solid", borderRadius: "8px", padding: "4px" }}
      multiple
      id="tags-standard"
      options={data}
      getOptionLabel={(option) => option.tag}
      onChange={(event, newValue) => {
        const selectedIds = newValue.map((option) => option.idTag);
        setTag(selectedIds);
        setIsDirty(true); // Call setIsDirty(true) when a tag is selected
        console.log("Selected tags:", selectedIds);
      }}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label="" />
      )}
    />
  );
}