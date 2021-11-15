import React from "react";
import { TextField, Grid, Paper, Button } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ProductService from "../services/ProductService";

const AddProduct = () => {
  const initialProduct = {
    name: "",
    image: "",
  };

  const [product, setProduct] = useState(initialProduct);

  const onChangeValue = async (e) => {
    if (e.target.name === "image") {
      let image = e.target.files[0];
      setProduct({
        ...product,
        image: await convertBase64(image),
      });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onAddProduct = () => {
    console.log(product);
    ProductService.postProduct(product);
  };

  return (
    <Paper component="main" sx={{ flexGrow: 1, p: 6 }}>
      <Grid
        spacing={3}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8}>
          <TextField
            onChange={onChangeValue}
            fullWidth
            id="name"
            label="Name"
            name="name"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={8}>
          <input onChange={onChangeValue} type="file" name="image" />
        </Grid>
        <Grid item xs={8}>
          <Button
            onClick={onAddProduct}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddProduct;
