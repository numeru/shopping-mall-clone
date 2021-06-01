import React from "react";
import { CartDetail } from "_reducers/user_reducer";
import "./UserCart.css";

type Props = {
  products: CartDetail[];
  removeItem: (productId: string) => Promise<void>;
};

function UserCart({ products, removeItem }: Props) {
  const renderCartImage = (images: string[]) => {
    if (images.length > 0) {
      const image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };

  const renderItems = () =>
    products?.map((product, index) => (
      <tr key={index}>
        <td>
          <img
            style={{ width: "70px" }}
            alt="product"
            src={renderCartImage(product.images)}
          />
        </td>
        <td>{product.quantity} EA</td>
        <td>$ {product.price}</td>
        <td>
          <button onClick={() => removeItem(product._id)}>Remove</button>
        </td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>

        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
}

export default UserCart;
