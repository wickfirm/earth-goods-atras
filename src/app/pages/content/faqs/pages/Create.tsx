import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import WickFormFooter from '../../../../components/forms/WickFormFooter.tsx';
import WickFormLabel from '../../../../components/forms/WickFormLabel.tsx';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {storeFaq} from '../../../../requests/content/Faq.ts';
import FormErrors from "../../../../components/forms/FormErrors.tsx";
import {defaultFormFields, faqSchema, FormFields} from "../core/form.ts";
import WickSwitch from "../../../../components/tables/WickSwitch.tsx";
import {useMain} from "../../../shared/MainContext.loader.tsx";


const FaqCreate: React.FC = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {options} = useMain()

    const {languages} = options

    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_FAQS, PageTypes.CREATE))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = (values: FormFields) => {
        submitRequest(storeFaq, [values], () => {
            // it's faq for sure
            wickApp.setAlert({
                message: new AlertMessageGenerator('faq', Actions.CREATE, WickToastType.SUCCESS).message,
                type: WickToastType.SUCCESS
            })

            navigate(`/content/faqs`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Faq"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={defaultFormFields} validationSchema={faqSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form placeholder={undefined}>
                                <div className="row">
                                    {languages.map((language) => (
                                        <div className="col-12" key={`faq-question-language-${language.id}`}>
                                            <div className="mb-3">
                                                <WickFormLabel text={`Question`} isRequired={true}/>
                                                <Field
                                                    className="form-control fs-base"
                                                    type="text"
                                                    placeholder={`Enter question`}
                                                    name={`question.${language.id}`}
                                                />
                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name={`question.${language.id}`} component="div"/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="row">
                                    {languages.map((language) => (
                                        <div className="col-12" key={`faq-answer-language-${language.id}`}>
                                            <div className="mb-3">
                                                <WickFormLabel text={`Answer`} isRequired={true}/>
                                                <Field
                                                    className="form-control fs-base"
                                                    type="text"
                                                    placeholder={`Enter answer`}
                                                    name={`answer.${language.id}`}
                                                />
                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name={`answer.${language.id}`} component="div"/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className='mb-7'>
                                    <WickFormLabel text='Is Active?' isRequired={true}/>

                                    <WickSwitch
                                        name='is_active'
                                        onChangeHandler={(e) => {
                                            e.stopPropagation()
                                            formik.setFieldValue("is_active", Number(!formik.getFieldProps('is_active').value))
                                        }}
                                        defaultValue={Boolean(formik.getFieldProps('is_active').value)}
                                    />
                                </div>

                                <WickFormFooter cancelUrl={'/content/faqs'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default FaqCreate;
