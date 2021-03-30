import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function SimpleRating(props) {
  const [value, setValue] = React.useState(2);

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Notez la recette !</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            props.handleChange(newValue);
          }}
        />
        <button onSubmit={(e) => props.handleSubmit(e, value)}>Submit</button>
      </Box>
    </div>
  );
}
