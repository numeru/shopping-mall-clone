import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

type Props = {
  updateSearchTerm: (newSearchTerm: string) => void;
};

function SearchFeature({ updateSearchTerm }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
    updateSearchTerm(event.currentTarget.value);
  };

  return (
    <div>
      <Search
        placeholder="input search text"
        onChange={searchHandler}
        style={{ width: 200 }}
        value={searchTerm}
      />
    </div>
  );
}

export default SearchFeature;
