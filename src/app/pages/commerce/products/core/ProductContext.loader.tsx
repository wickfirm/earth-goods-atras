import {useContext} from 'react'
import {ProductContext} from "./ProductContext.tsx";

const useProduct = () => {
    return useContext(ProductContext)
}

export {useProduct}