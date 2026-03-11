import {FormFields} from "../../core/form.ts";
import React from "react";
import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";
import {FormikProps} from "formik";
import Select from "react-select";
import {DEFAULT_LANGUAGE} from "../../../../../helpers/settings.ts";
import {genericMultiSelectOnChangeHandler} from "../../../../../helpers/form.ts";
import {useProduct} from "../../core/ProductContext.loader.tsx";

interface Props {
    form: FormFields
    setForm: React.Dispatch<React.SetStateAction<FormFields>>
    formik: FormikProps<FormFields>;
}

const ProductHighlights: React.FC<Props> = ({form, setForm, formik}) => {
    const {options} = useProduct()
    const {highlights} = options

    return (
        <KTCard className="py-4">
            <div className="card-header border-0">
                <div className="card-title">
                    <h3 className={`card-label`}>Product Highlights</h3>
                </div>
            </div>

            <KTCardBody className="pt-0">
                <Select isMulti name="highlight_ids"
                        options={highlights}
                        getOptionLabel={(product) => product.name[DEFAULT_LANGUAGE]}
                        getOptionValue={(product) => product.id.toString()}
                        onChange={(e) => genericMultiSelectOnChangeHandler(e, formik, form, setForm, 'highlight_ids')}
                        value={highlights.filter((highlight) => form.highlight_ids?.includes(highlight.id))}
                        className="mb-2"/>

                <div className="text-muted fs-7">Set the product(s) that can be related to a certain highlight.</div>
            </KTCardBody>
        </KTCard>
    )
}

export default ProductHighlights;