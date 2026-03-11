import {FormFields} from "../../core/form.ts";
import React from "react";
import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";
import Select from "react-select";
import {genericMultiSelectOnChangeHandler} from "../../../../../helpers/form.ts";
import {useProduct} from "../../core/ProductContext.loader.tsx";
import {DEFAULT_LANGUAGE} from "../../../../../helpers/settings.ts";
import {FormikProps} from "formik";

interface Props {
    form: FormFields;
    setForm: React.Dispatch<React.SetStateAction<FormFields>>;
    formik: FormikProps<FormFields>;
}

const ProductPairedWith: React.FC<Props> = ({form, setForm, formik}) => {
    const {products} = useProduct()

    return (
        <KTCard className="py-4">
            <div className="card-header border-0">
                <div className="card-title">
                    <h3 className={`card-label`}>Paired With</h3>
                </div>
            </div>

            <KTCardBody className="pt-0">
                <Select isMulti name="paired_product_ids"
                        options={products}
                        getOptionLabel={(product) => product.name[DEFAULT_LANGUAGE]}
                        getOptionValue={(product) => product.id.toString()}
                        onChange={(e) => genericMultiSelectOnChangeHandler(e, formik, form, setForm, 'paired_product_ids')}
                        value={products.filter((product) => form.paired_product_ids?.includes(product.id))}
                        className="mb-2"/>

                <div className="text-muted fs-7">Set the product(s) that can be paired with.</div>
            </KTCardBody>
        </KTCard>
    )
}

export default ProductPairedWith;