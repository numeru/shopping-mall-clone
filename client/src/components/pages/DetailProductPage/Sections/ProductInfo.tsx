import React from "react";
import { Button, Descriptions } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";
import { CartDetail } from "_reducers/user_reducer";

type Props = {
  product: CartDetail;
};

function ProductInfo({ product }: Props) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart(product._id));
  };

  return (
    <div>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price">{product.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{product.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{product.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {product.description}
        </Descriptions.Item>
      </Descriptions>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
      >
        <Button size="large" shape="round" onClick={handleClick}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
