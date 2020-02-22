import React from "react";
import { apiURL } from "../../constants";
import { Image } from "react-bootstrap";

const styles = {
  width: "100px",
  height: "100px"
};

const ProductThumbnail = props => {
  let image = "";

  if (props.image) {
    image = apiURL + "/uploads/" + props.image;
    return <Image src={image} style={styles} thumbnail />;
  } else {
    return false;
  }
};

export default ProductThumbnail;
