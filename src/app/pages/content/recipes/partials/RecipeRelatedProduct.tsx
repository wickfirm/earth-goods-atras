import React, {useEffect, useState} from "react";
import Select from "react-select";
import {Product} from "../../../../models/commerce/Product.ts";
import {getErrorPage, submitRequest} from "../../../../helpers/requests.ts";
import {getAllProducts} from "../../../../requests/commerce/Product.ts";
import {useNavigate} from "react-router-dom";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {FormFields} from "../core/form.ts";
import {FormikProps} from "formik";

interface Props {
    formik: FormikProps<FormFields>;
    form?: FormFields
    setForm?: React.Dispatch<React.SetStateAction<FormFields>>
}

const RecipeRelatedProduct: React.FC<Props> = ({formik}) => {
    const navigate = useNavigate()
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        submitRequest(getAllProducts, [], (response) => {
            const errorPage = getErrorPage(response)

            if (errorPage) {
                navigate(errorPage)
            } else {
                setProducts(response)
            }
        })

    }, []);

    return (
        <KTCard className="py-4">
            <div className="card-header border-0">
                <div className="card-title">
                    <h3 className={`card-label`}>Related Products</h3>
                </div>
            </div>

            <KTCardBody className="pt-0">
                <Select isMulti name="product_ids"
                        options={products}
                        getOptionLabel={(product) => product.name.en}
                        getOptionValue={(product) => product.id.toString()}
                    // setForm({...form, [key]: e.map((entity: any) => entity.id)})
                        onChange={(e) => formik.setFieldValue('product_ids', e.map((entity: any) => entity.id))}
                        value={products.filter(
                            (product) =>
                                formik.getFieldProps('product_ids').value?.includes(product.id)
                        )}
                        className="mb-2"/>

                <div className="text-muted fs-7">Set the product(s) that are related.</div>
            </KTCardBody>
        </KTCard>
    )
}

export default RecipeRelatedProduct;