import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";
import { Continents } from "./Datas";

const { Panel } = Collapse;

type Props = {
  continents: Continents[];
  handleFilters: (
    aFilter: string | number[],
    category: "price" | "continents"
  ) => void;
};

function CheckBox({ continents, handleFilters }: Props) {
  const [checkedContinents, setChecked] = useState<number[]>([]);

  const handleToggle = (toggledOption: number) => {
    //누른 것의 Index를 구하고
    const currentIndex = checkedContinents.indexOf(toggledOption);
    //전체 Checked된 State에서  현재 누른 Checkbox가 이미 있다면
    const newChecked: number[] = [...checkedContinents];

    // State 넣어준다.
    if (currentIndex === -1) {
      newChecked.push(toggledOption);
      // 빼주고
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    handleFilters(newChecked, "continents");
  };

  const renderCheckboxLists = () =>
    continents?.map((value) => (
      <React.Fragment key={value._id}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={checkedContinents.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
