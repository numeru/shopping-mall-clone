import React, { useState } from "react";
import { Collapse, Radio, RadioChangeEvent } from "antd";
import { Price } from "./Datas";

const { Panel } = Collapse;

type Props = {
  price: Price[];
  handleFilters: (
    aFilter: string | number[],
    category: "price" | "continents"
  ) => void;
};

function RadioBox({ price, handleFilters }: Props) {
  const [checkedPrice, setCheckedPrice] = useState(0);

  const renderRadioBox = () =>
    price?.map((value) => (
      <Radio key={value._id} value={value._id}>
        {" "}
        {value.name}{" "}
      </Radio>
    ));

  const handleChange = (event: RadioChangeEvent) => {
    setCheckedPrice(event.target.value);
    handleFilters(event.target.value, "price");
  };

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price" key="1">
          <Radio.Group onChange={handleChange} value={checkedPrice}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
