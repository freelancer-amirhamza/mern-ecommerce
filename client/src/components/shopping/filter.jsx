import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFilter = () => {
  return (
    <div className="  bg-background border-r-2 rounded-lg shadow-sm ">
      <div className="p-4 border-b  ">
        <h1 className="text-lg font-semibold ">Filters</h1>
      </div>
      <div className="p-4 space-y-4   grid grid-cols-2 lg:grid-cols-1">
      {Object.keys(filterOptions).map((keyItem) => (
        <Fragment key={keyItem}  >
            <div className="" >
                <h3 className="text-base capitalize font-bold">{keyItem} </h3>
                <div className="grid gap-2 mt-2">
                    {filterOptions[keyItem].map((option)=> (
                    <Label className="flex items-center gap-2 font-medium " key={option.id} >
                        <Checkbox className=" px-0 py-0 focus:bg-white bg-white " />
                        <span className="text-foreground ">{option.label}</span>
                    </Label>
                ))}
                </div>
            </div>
            <Separator/>
        </Fragment>
      ))}
      </div>
    </div>
  );
};

export default ProductFilter;
