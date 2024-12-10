import ProductFilter from "@/components/shopping/filter";
import ShoppingProductTile from "@/components/shopping/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { getAllFilteredProducts } from "@/store/shop/shoppingSlice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShoppingListing = () => {

  const [sort, setSort] = useState();
  const [filter, setFilter] = useState();

  

  const dispatch = useDispatch();
  const { productsList } = useSelector((state) => state.shoppingProducts);

  useEffect(() => {
    dispatch(getAllFilteredProducts());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 ">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between ">
          <h1 className=" text-lg font-extrabold ">All Products</h1>
          <div className=" flex items-center gap-3 ">
            <span className="text-muted-foreground">{productsList.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" flex items-center gap-1>
                  <ArrowUpDownIcon className="w-24 h-24 text-4xl " />
                  <span className="">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={(value)=> (setSort(value))} >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                      <span className="text-sm font-medium ">
                        {sortItem.label}
                      </span>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
          {productsList && productsList.length > 0
            ? productsList.map((productItem) => (
                <ShoppingProductTile
                  product={productItem}
                  key={productItem.id}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
