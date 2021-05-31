import React from "react";
import { Carousel } from "antd";
import { Images } from "_reducers/user_reducer";

type Props = {
  images: Images[];
};

function ImageSlider({ images }: Props) {
  return (
    <div>
      <Carousel autoplay>
        {images.map((image, index) => (
          <div key={index}>
            <img
              style={{ width: "100%", maxHeight: "150px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
