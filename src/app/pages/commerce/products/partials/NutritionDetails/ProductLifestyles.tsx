import {FormFields} from "../../core/form.ts";
import React from "react";
import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";
import Select from "react-select";
import {genericMultiSelectOnChangeHandler} from "../../../../../helpers/form.ts";
import {useProduct} from "../../core/ProductContext.loader.tsx";
import {FormikProps} from "formik";
import {DEFAULT_LANGUAGE} from "../../../../../helpers/settings.ts";

interface Props {
    form: FormFields;
    setForm: React.Dispatch<React.SetStateAction<FormFields>>;
    formik: FormikProps<FormFields>;
}

const ProductLifestyles: React.FC<Props> = ({form, setForm, formik}) => {
    const {options} = useProduct()
    const {lifestyles} = options

    return (
        <KTCard className="py-4">
            <div className="card-header border-0">
                <div className="card-title">
                    <h3 className={`card-label`}>Lifestyles</h3>
                </div>
            </div>

            <KTCardBody className="pt-0">
                <Select isMulti name="lifestyle_ids"
                        options={lifestyles}
                        getOptionLabel={(lifestyle) => lifestyle.name[DEFAULT_LANGUAGE]}
                        getOptionValue={(lifestyle) => lifestyle.id.toString()}
                        onChange={(e) => genericMultiSelectOnChangeHandler(e, formik, form, setForm, 'lifestyle_ids')}
                        className="mb-2"/>

                <div className="text-muted fs-7">Set the product lifestyle(s).</div>
            </KTCardBody>
        </KTCard>
    )
}

export default ProductLifestyles;