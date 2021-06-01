import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../../utils/image-slider";
import Checkbox from "./Sections/CheckBox";
import Radiobox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";
import { continents, price } from "./Sections/Datas";
import { CartDetail } from "_reducers/user_reducer";

type Filter = {
  continents: number[];
  price: number[];
};

type Body = {
  skip: number;
  limit: number;
  loadMore?: boolean;
  filters?: Filter;
  searchTerm?: string;
};

function LandingPage() {
  const [products, setProducts] = useState<CartDetail[]>([]);

  // skip번째 부터 limit만큼 가져온다.
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);

  // 가져오는 상품의 수. limit보다 작을 경우 더 가져올 상품이 없으므로 더보기 버튼을 숨긴다.
  const [postSize, setPostSize] = useState(0);
  const [filters, setFilters] = useState<Filter>({
    continents: [],
    price: [],
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const body = {
      skip,
      limit,
    };

    getProducts(body);
  }, []);

  const getProducts = (body: Body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts([...products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert(" 상품들을 가져오는데 실패 했습니다.");
      }
    });
  };

  const loadMoreHanlder = () => {
    const newSkip = skip + limit;
    const body = {
      skip: newSkip,
      limit,
      loadMore: true,
      filters,
    };

    getProducts(body);
    setSkip(newSkip);
  };

  const renderCards = products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters: Filter) => {
    const body = {
      skip: 0,
      limit,
      filters,
    };

    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value: string): number[] => {
    const data = price;
    let array: number[] = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (
    aFilter: string | number[],
    category: "price" | "continents"
  ) => {
    let newFilters: Filter = { ...filters };

    if (category === "price") {
      const priceValues = handlePrice(aFilter as string);
      newFilters[category] = priceValues;
    }
    if (category === "continents") {
      newFilters[category] = aFilter as number[];
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerm = (newSearchTerm: string) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>Let's Travel Anywhere </h2>
      </div>

      {/* Filter */}

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* CheckBox */}
          <Checkbox list={continents} handleFilters={handleFilters} />
        </Col>
        <Col lg={12} xs={24}>
          {/* RadioBox */}
          <Radiobox list={price} handleFilters={handleFilters} />
        </Col>
      </Row>

      {/* Search */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerm} />
      </div>

      {/* Cards */}

      <Row gutter={[16, 16]}>{renderCards}</Row>

      <br />

      {postSize >= limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHanlder}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
