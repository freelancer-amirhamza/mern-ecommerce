import ShoppingProductTile from '@/components/shopping/product-tile';
import { Input } from '@/components/ui/input'
import { getSearchResults, resetSearchResults } from '@/store/shop/searchSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const SearchProducts = () => {
    const [keyword, setKeyword] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {searchResults} = useSelector(state=> state.searchSlice);



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
                    {searchResults.map(item => <ShoppingProductTile key={item} product={item} />)}
                </div>
            </div>
        </div>
    )
}

export default SearchProducts