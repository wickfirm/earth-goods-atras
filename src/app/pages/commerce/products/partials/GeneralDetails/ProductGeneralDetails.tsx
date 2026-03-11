import {FormFields} from "../../core/form.ts";
import React from "react";
import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import {ErrorMessage, FormikProps} from "formik";
import {Editor} from "primereact/editor";
import {Language} from "../../../../../models/Options.ts";
import WickFormLabel from "../../../../../components/forms/WickFormLabel.tsx";
import WickLanguageTextFields from "../../../../../components/forms/WickLanguageTextFields.tsx";

interface Props {
    form: FormFields
    setForm: React.Dispatch<React.SetStateAction<FormFields>>
    formik: FormikProps<FormFields>;
    languages: Language[];
}

const ProductGeneralDetails: React.FC<Props> = ({form, setForm, formik, languages}) => {
    return (
        <KTCard className="py-4">
            <KTCardHeader text="General" className="border-0"/>

            <KTCardBody className="pt-0">
                <div className="row mb-10">
                    <WickLanguageTextFields field="name" placeholder="Product Name" isRequired={true}
                                            languages={languages}/>

                    <div className="text-muted fs-7">A product name is required and recommended to be unique.</div>
                </div>

                <div className="row">
                    <div className="col-4">
                        {languages.map((language) => (
                            <div className="col-12" key={`description-${language.id}`}>
                                <div className="mb-3">
                                    <WickFormLabel text={`Description`}
                                                   isRequired={false}/>

                                    <Editor
                                        value={formik.getFieldProps('description').value[language.id] ?? ''}
                                        onTextChange={(e) => {
                                            if (formik.getFieldProps('description').value[language.id] !== e.htmlValue) {
                                                const attr = `description[${language.id}]`

                                                formik.setFieldValue(attr, e.htmlValue)
                                                setForm({
                                                    ...form,
                                                    [attr]: e.htmlValue,
                                                })
                                            }
                                        }}
                                        style={{height: '500px'}}
                                        className="mb-2"
                                    />

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name={`description.${language.id}`} component="div"/>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="text-muted fs-7">Set a description to the product for better visibility.</div>
                    </div>

                    <div className="col-4">
                        {languages.map((language) => (
                            <div className="col-12" key={`ingredient-${language.id}`}>
                                <div className="mb-3">
                                    <WickFormLabel text={`Ingredient`}
                                                   isRequired={false}/>

                                    <Editor
                                        value={formik.getFieldProps('ingredient').value[language.id] ?? ''}
                                        onTextChange={(e) => {
                                            if (formik.getFieldProps('ingredient').value[language.id] !== e.htmlValue) {
                                                const attr = `ingredient[${language.id}]`

                                                formik.setFieldValue(attr, e.htmlValue)
                                                setForm({
                                                    ...form,
                                                    [attr]: e.htmlValue,
                                                })
                                            }
                                        }}
                                        style={{height: '500px'}}
                                        className="mb-2"
                                    />

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name={`ingredient.${language.id}`} component="div"/>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="text-muted fs-7">Set a ingredient to the product for better visibility.</div>
                    </div>

                    <div className="col-4">
                        {languages.map((language) => (
                            <div className="col-12" key={`how-to-enjoy-${language.id}`}>
                                <div className="mb-3">
                                    <WickFormLabel text={`How to Enjoy`}
                                                   isRequired={false}/>

                                    <Editor
                                        value={formik.getFieldProps('how_to_enjoy').value[language.id] ?? ''}
                                        onTextChange={(e) => {
                                            if (formik.getFieldProps('how_to_enjoy').value[language.id] !== e.htmlValue) {
                                                const attr = `how_to_enjoy[${language.id}]`

                                                formik.setFieldValue(attr, e.htmlValue)
                                                setForm({
                                                    ...form,
                                                    [attr]: e.htmlValue,
                                                })
                                            }
                                        }}
                                        style={{height: '500px'}}
                                        className="mb-2"
                                    />

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name={`how_to_enjoy.${language.id}`} component="div"/>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="text-muted fs-7">Set a "How to Enjoy" to the product for better visibility.</div>
                    </div>
                </div>
            </KTCardBody>
        </KTCard>
    )
}

export default ProductGeneralDetails;