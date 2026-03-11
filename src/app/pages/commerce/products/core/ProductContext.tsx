import {createContext, Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {WithChildren} from '../../../../../_metronic/helpers'
import {getErrorPage, submitRequest} from '../../../../helpers/requests'
import {ProductOptions} from "../../../../models/commerce/Options.ts";
import {getProductOptions} from "../../../../requests/Options.ts";
import {DEFAULT_PRODUCT_OPTIONS} from "../../../../helpers/settings.ts";
import {Product} from "../../../../models/commerce/Product.ts";
import {getAllProducts} from "../../../../requests/commerce/Product.ts";

interface Props {
    options: ProductOptions
    setOptions: Dispatch<SetStateAction<ProductOptions>>
    products: Product[]
    setProducts: Dispatch<SetStateAction<Product[]>>
}

const defaultProductContext = {
    options: DEFAULT_PRODUCT_OPTIONS,
    setOptions: () => {
    },
    products: [],
    setProducts: () => {
    },
}

export const ProductContext = createContext<Props>(defaultProductContext)

export const ProductProvider: FC<WithChildren> = ({children}) => {
    const navigate = useNavigate()

    const [options, setOptions] = useState<ProductOptions>(DEFAULT_PRODUCT_OPTIONS)
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        // get the list of all product options
        submitRequest(getProductOptions, [], (response) => {
            const errorPage = getErrorPage(response)

            if (errorPage) {
                navigate(errorPage)
            } else {
                setOptions(response)
            }
        })

        // get the list of all products
        submitRequest(getAllProducts, [], (response) => {
            const errorPage = getErrorPage(response)

            if (errorPage) {
                navigate(errorPage)
            } else {
                setProducts(response)
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ProductContext.Provider
            value={{
                options,
                setOptions,
                products,
                setProducts
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}
