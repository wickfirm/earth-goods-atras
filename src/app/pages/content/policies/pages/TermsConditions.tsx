import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {submitRequest} from "../../../../helpers/requests";
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from "../../../../helpers/variables";
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import FormErrors from "../../../../components/forms/FormErrors.tsx";
import {getPolicyByType, storePolicy, updatePolicy} from "../../../../requests/content/Policy.ts";
import {Policy} from "../../../../models/content/Policy.ts";
import {defaultFormFields, fillEditForm, FormFields, policySchema} from "../core/form.ts";
import WickFormLabel from "../../../../components/forms/WickFormLabel.tsx";
import {Editor} from "primereact/editor";
import WickFormFooter from "../../../../components/forms/WickFormFooter.tsx";
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator.ts";
import {scrollToTop} from "../../../../helpers/general.ts";


const TermsConditions: React.FC = () => {
    const wickApp = useWickApp();

    const [policy, setPolicy] = useState<Policy | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        submitRequest(getPolicyByType, ['terms_and_conditions'], (response) => {
            if (response) {
                setPolicy(response);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_TERMS_CONDITIONS, PageTypes.INDEX))

        if (policy) {
            setForm(fillEditForm(policy))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [policy]);

    const handleEdit = (values: FormFields, fns: any) => {
        if (policy) {
            submitRequest(
                updatePolicy,
                [policy.id, {...values, type: 'terms_and_conditions'}],
                (response) => {
                    wickApp.setAlert({
                        message: new AlertMessageGenerator("terms and conditions", Actions.EDIT, WickToastType.SUCCESS)
                            .message,
                        type: WickToastType.SUCCESS,
                    })

                    setPolicy(response)

                    setFormErrors([])
                },
                setFormErrors,
                fns
            )

            scrollToTop()
        } else {
            submitRequest(
                storePolicy,
                [{...values, type: 'terms_and_conditions'}],
                (response) => {
                    wickApp.setAlert({
                        message: new AlertMessageGenerator("terms and conditions", Actions.CREATE, WickToastType.SUCCESS)
                            .message,
                        type: WickToastType.SUCCESS,
                    })

                    setPolicy(response)

                    setFormErrors([])
                },
                setFormErrors,
                fns
            )

            scrollToTop()
        }
    };

    return (
        <>
            <FormErrors errorMessages={formErrors}/>

            <Formik initialValues={form} validationSchema={policySchema} onSubmit={handleEdit}
                    enableReinitialize>
                {
                    (formik) => (
                        <Form placeholder={undefined}
                              className="form">
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-10">
                                        <WickFormLabel text="Title" isRequired={true}/>
                                        <Field
                                            className="form-control fs-base mb-2"
                                            type="text"
                                            placeholder="Enter terms and conditions title"
                                            name={`title.en`}
                                        />
                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name={`title.en`} component="div"/>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-column mb-4">
                                        <span className="fs-5 text-gray-700 fw-medium">Terms and Conditions Content</span>
                                        <small className="text-muted">
                                            Understand the rules and guidelines for using our services. Review your rights, obligations, and the terms that govern your interaction with us.
                                        </small>
                                    </div>

                                    <div className="mb-3">
                                        <WickFormLabel text={`Content`}
                                                       isRequired={true}/>

                                        <Editor value={formik.getFieldProps('content').value ? formik.getFieldProps('content').value['en'] : ''}
                                                onTextChange={(e) => {
                                                    if (formik.getFieldProps('content').value['en'] !== e.htmlValue) {
                                                        const attr = `content.en`

                                                        formik.setFieldValue(attr, e.htmlValue)
                                                    }
                                                }}
                                                style={{height: '500px'}}
                                                className="mb-2"/>

                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name={`content.en`} component="div"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end">
                                <WickFormFooter/>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}

export default TermsConditions;
