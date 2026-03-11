import {FormFields} from "../../core/form.ts";
import React from "react";
import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import {Language} from "../../../../../models/Options.ts";
import WickFormLabel from "../../../../../components/forms/WickFormLabel.tsx";
import {ErrorMessage, FormikProps} from "formik";
import WickLanguageTextFields from "../../../../../components/forms/WickLanguageTextFields.tsx";
import {FormControl} from "react-bootstrap";

interface Props {
    form: FormFields;
    setForm: React.Dispatch<React.SetStateAction<FormFields>>;
    formik: FormikProps<FormFields>;
    languages: Language[];
}

const ProductMetaOptions: React.FC<Props> = ({form, setForm, formik, languages}) => {
    return (
        <KTCard className="py-4">
            <KTCardHeader text="Meta Options" className="border-0"/>

            <KTCardBody className="pt-0">
                <div className="row mb-10">
                    <WickLanguageTextFields field="meta_tag_title" placeholder="Meta Tag Title" isRequired={false}
                                            languages={languages}/>

                    <div className="text-muted fs-7">Set a meta tag title. Recommended to be simple and precise
                        keywords.
                    </div>
                </div>

                <div className="row mb-10">
                    {languages.map((language) => (
                        <div className="col-12" key={`meta-tag-description-language-${language.id}`}>
                            <div className="mb-3">
                                <WickFormLabel text={`Meta Tag Description`}
                                               isRequired={false}/>

                                <FormControl
                                    as='textarea'
                                    rows={6}
                                    name={`meta_tag_description.${language.id}`}
                                    className='form-control fs-base mb-2'
                                    placeholder='Enter the meta tag description'
                                    defaultValue={formik.getFieldProps('meta_tag_description').value ? formik.getFieldProps('meta_tag_description').value[language.id] : null}
                                    onChange={(e) => {
                                        const attr = `meta_tag_description.${language.id}`

                                        formik.setFieldValue(attr, e.target.value)
                                    }}
                                />

                                <div className="mt-1 text-danger">
                                    <ErrorMessage name={`meta_tag_description.${language.id}`} component="div"/>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="text-muted fs-7">Set a meta tag description to the product for increased SEO
                        ranking.
                    </div>
                </div>

                <div className="row mb-10">
                    <WickLanguageTextFields field="meta_tag_keywords" placeholder="Meta Tag Keywords" isRequired={false}
                                            languages={languages}/>

                    <div className="text-muted fs-7">
                        Set a list of keywords that the product is related to. Separate the keywords by adding a
                        comma <code>,</code> between each keyword.
                    </div>
                </div>
            </KTCardBody>
        </KTCard>
    )
}

export default ProductMetaOptions;