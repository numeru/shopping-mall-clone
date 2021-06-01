import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { CartDetail, Images } from "_reducers/user_reducer";

type Props = {
  product: CartDetail;
};

function ProductImage({ product }: Props) {
  const [imagesInfoSet, setImagesInfoSet] = useState<Images[]>([]);

  useEffect(() => {
    if (product.images?.length > 0) {
      const newImagesInfoSet = product.images.map((image) => {
        return {
          original: `http://localhost:5000/${image}`,
          thumbnail: `http://localhost:5000/${image}`,
        };
      });
      setImagesInfoSet(newImagesInfoSet);
    }
  }, [product]);

  return (
    <div>
      <ImageGallery items={imagesInfoSet} />
    </div>
  );
}

export default ProductImage;
