import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import React from "react";
import Select from "react-select";
import {genericSingleSelectOnChangeHandler} from "../../../../helpers/form.ts";
import {FormFields} from "../core/form.ts";
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import {FormikProps} from "formik";

interface Props {
    form: FormFields;
    setForm: React.Dispatch<React.SetStateAction<FormFields>>;
    formik: FormikProps<FormFields>;
}

const ProductTemplate: React.FC<Props> = ({form, setForm, formik}) => {
    return (
        <KTCard className="py-4">
            <KTCardHeader text="Product Template" className="border-0"/>

            <KTCardBody className="pt-0">
                <label className="form-label">Select a product template </label>
                <Select name="template_id"
                        value={{id: 1, name: "Default template"}}
                        options={[{id: 1, name: "Default template"}, {id: 2, name: "Template 2"}]}
                        getOptionLabel={(template) => template.name}
                        getOptionValue={(template) => template.id.toString()}
                        onChange={(e) => genericSingleSelectOnChangeHandler(e, formik, form, setForm, 'template_id')}
                        className="mb-2"/>

                <div className="text-muted fs-7 mb-7">Assign a template from your current theme to define how a single
                    product is displayed.
                </div>
            </KTCardBody>
        </KTCard>
    )
}

export default ProductTemplate;