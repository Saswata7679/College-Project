import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const PartCard = ({ part }) => {
  const options = {
    value: part.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/part/${part._id}`}>
      <img src={part.images[0].url} alt={part.name} />
      <p>{part.name}</p>
      <div>
        {/* <Rating {...options} />{" "} */}
        <span className="productCardSpan">
          {/* {" "} */}
          ({part.description})
        </span>
      </div>
      <span>{`₹${part.price}`}</span>
    </Link>
  );
};

export default PartCard;
