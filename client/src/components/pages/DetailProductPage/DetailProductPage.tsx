import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { Row, Col } from "antd";
import { CartDetail, UserState } from "_reducers/user_reducer";
import ProductComments from "./Sections/ProductComments";
import { useSelector } from "react-redux";

type Match<P> = {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
};

export type Comment = {
  content: string;
  createdAt: string;
  postId: string;
  responseTo?: string;
  updatedAt: string;
  _id: string;
};

type Props = {
  match: Match<{ productId: string }>;
};

function DetailProductPage({ match }: Props) {
  const user = useSelector((state: { user: UserState }) => state.user);
  const productId = match.params.productId;

  const [product, setProduct] = useState<CartDetail>({
    continents: 0,
    createdAt: "",
    updatedAt: "",
    title: "",
    _id: "",
    price: 0,
    quantity: 0,
    images: [],
    sold: 0,
    views: 0,
    description: "",
  });

  const [commentList, setCommentList] = useState<Comment[]>([]);

  const getProductInfo = () => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        setProduct(response.data[0]);
      });
  };

  const getCommentList = () => {
    const data = {
      productId,
    };

    axios.post("/api/comment/getComments", data).then((response) => {
      if (response.data.success) {
        setCommentList(response.data.comments);
      } else {
        alert("Failed to get video Info");
      }
    });
  };

  useEffect(() => {
    getProductInfo();
    getCommentList();
  }, []);

  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{product.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          {/* ProductImage */}
          <ProductImage product={product} />
        </Col>
        <Col lg={12} sm={24}>
          {/* ProductInfo */}
          <ProductInfo product={product} />
        </Col>
      </Row>
      <ProductComments
        user={user}
        commentList={commentList}
        setCommentList={setCommentList}
        productId={productId}
      />
    </div>
  );
}

export default DetailProductPage;
