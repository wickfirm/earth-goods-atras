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

const ProductClaims: React.FC<Props> = ({form, setForm, formik}) => {
    const {options} = useProduct()
    const {claims} = options

    return (
        <KTCard className="py-4">
            <div className="card-header border-0">
                <div className="card-title">
                    <h3 className={`card-label`}>Claims</h3>
                </div>
            </div>

            <KTCardBody className="pt-0">
                <Select isMulti name="claim_ids"
                        options={claims}
                        getOptionLabel={(claim) => claim.name[DEFAULT_LANGUAGE]}
                        getOptionValue={(claim) => claim.id.toString()}
                        onChange={(e) => genericMultiSelectOnChangeHandler(e, formik, form, setForm, 'claim_ids')}
                        value={claims.filter((claim) => form.claim_ids?.includes(claim.id))}
                        className="mb-2"/>

                <div className="text-muted fs-7">Set the product claim(s).</div>
            </KTCardBody>
        </KTCard>
    )
}

export default ProductClaims;