import ProductDetailsDialog from '@/components/shopping/product-details';
import ShoppingProductTile from '@/components/shopping/product-tile';
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast';
import { addToCart, getCartItems } from '@/store/shop/cart-slice';
import { getSearchResults, resetSearchResults } from '@/store/shop/searchSlice';
import { getProductDetails } from '@/store/shop/shoppingSlice';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const SearchProducts = () => {
    const [keyword, setKeyword] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {searchResults} = useSelector(state=> state.searchSlice);
    const {user} = useSelector(state => state.auth);
    const { productDetails } = useSelector(state => state.shoppingProducts);
    const {cartItems} = useSelector(state=> state.shoppingCarts);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)


    const handleAddToCart = (getCurrentProductId, getTotalStock)=>{
        let getCartItem = cartItems.items || [];
        if(getCartItem.length){
            const indexOfCurrentItem = getCartItem.findIndex(item => item.productId === getCurrentProductId);
            if(indexOfCurrentItem.length > -1){
                const getQuantity = getCartItem[indexOfCurrentItem].quantity;
                if(getQuantity + 1 > getTotalStock){
                    toast({
                        title: `Only ${getQuantity} quantity can be added for this item!`,
                        variant: "destructive"
                    });
                    return
                }
            }
        }

        dispatch(addToCart({
            userId: user?.id,
            productId: getCurrentProductId,
            quantity: 1,
        })).then((data)=> {
            if(data?.payload?.success){
                dispatch(getCartItems(user?.id));
                toast({
                    title: "this product added to cart successfully"
                })
            }
        })
    };
    
    
    const handleGetProductDetails = (getCurrentProductId)=>{
        dispatch(getProductDetails(getCurrentProductId))
    }
    useEffect(()=>{
        if(productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails])



    useEffect(()=>{
        if(keyword && keyword.trim() !== "" && keyword.trim().length > 2){
            setTimeout(()=>{
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getSearchResults(keyword))
            }, 1000)
           }else{
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(resetSearchResults())
           }
    }, [keyword])

console.log(searchResults, "search results ok")

    return (
        <div>
            <div className="container w-full mx-auto md:px-6 px-4 py-8">
                <div className="flex justify-center mb-8 ">
                    <div className="w-full flex items-center ">
                        <Input
                            className="py-6"
                            placeholder="Search Products.."
                            value={keyword}
                            name="keyword"
                            onChange={(event) => setKeyword(event.target.value)}
                        />
                    </div>
                </div>
                {!searchResults.length ? <h1 className='text-center text-3xl font-extrabold  '>No Products Found! </h1> :null}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
                    {searchResults.map(item => <ShoppingProductTile
                     key={item.id}
                      product={item}
                      handleAddToCart={handleAddToCart}
                      handleGetProductDetails={handleGetProductDetails}
                      />)}
                </div>
            </div>
            <ProductDetailsDialog
            open={openDetailsDialog}
            setOpen={setOpenDetailsDialog}
            productDetails={productDetails}
            />
        </div>
    )
}

export default SearchProducts