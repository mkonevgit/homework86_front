import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {MenuItem} from "@material-ui/core";


const FormElement = (props) => {

   let inputChildren = null;
   if (props.options && props.type === "select") {
      inputChildren = props.options.map((option) => (
         <MenuItem key={option._id} value={option._id}>
            {option.title}
         </MenuItem>
      ))
   }
   return (
      <Grid item xs={12}>
         <TextField
            variant="outlined"
            select={props.select}
            fullWidth
            required={props.required}
            type={props.type}
            multiline={props.multiline}
            rows={3}
            id={props.name}
            label={props.label}
            name={props.name}
            autoComplete={props.name}
            value={props.value}
            onChange={props.onChange}
            error={!!props.error}
            helperText={props.error}
         >
            {inputChildren}
         </TextField>
      </Grid>
   )

};

FormElement.propTypes = {
   name: PropTypes.string.isRequired,
   label: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   type: PropTypes.string.isRequired,
   required: PropTypes.bool,
   select: PropTypes.bool,
   error: PropTypes.string,
   options: PropTypes.arrayOf(PropTypes.object),
   multiline: PropTypes.bool,
   rows: PropTypes.number
};

export default FormElement;