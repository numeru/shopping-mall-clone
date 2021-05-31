import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { CartDetail, Images } from "_reducers/user_reducer";

type Props = {
  product: CartDetail;
};

function ProductImage({ product }: Props) {
  const [Images, setImages] = useState<Images[]>([]);

  useEffect(() => {
    if (product.images && product.images.length > 0) {
      let images: Images[] = [];

      product.images.map((item) => {
        images.push({
          original: `http://localhost:5000/${item}`,
          thumbnail: `http://localhost:5000/${item}`,
        });
      });
      setImages(images);
    }
  }, [product]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductImage;
