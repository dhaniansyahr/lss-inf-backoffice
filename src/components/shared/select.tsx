import React from "react";
import { Select, SelectTrigger, SelectValue } from "../ui/select";

const SelectBase = () => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pilih salah satu" />
      </SelectTrigger>
    </Select>
  );
};

export default SelectBase;
