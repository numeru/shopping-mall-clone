import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

type Props = {
  refreshFunction: (newSearchTerm: string) => void;
};

function SearchFeature({ refreshFunction }: Props) {
  const [SearchTerm, setSearchTerm] = useState("");

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
    refreshFunction(event.currentTarget.value);
  };

  return (
    <div>
      <Search
        placeholder="input search text"
        onChange={searchHandler}
        style={{ width: 200 }}
        value={SearchTerm}
      />
    </div>
  );
}

export default SearchFeature;
