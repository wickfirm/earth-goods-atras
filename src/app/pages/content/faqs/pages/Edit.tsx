import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import WickFormFooter from '../../../../components/forms/WickFormFooter.tsx';
import WickFormLabel from '../../../../components/forms/WickFormLabel.tsx';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {Faq} from '../../../../models/content/Faq.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {getFaq, updateFaq} from '../../../../requests/content/Faq.ts';
import {defaultFormFields, faqSchema, FormFields} from "../core/form.ts";
import WickSwitch from "../../../../components/tables/WickSwitch.tsx";
import {useMain} from "../../../shared/MainContext.loader.tsx";


const FaqEdit: React.FC = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {id} = useParams();
    const {options} = useMain()

    const {languages} = options

    const [faq, setFaq] = useState<Faq | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            // get the faq we need to edit from the database
            submitRequest(getFaq, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current faq to edit
                    setFaq(response);
                    setForm(response)
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (faq) {
            wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_FAQS, PageTypes.EDIT, faq.question.en))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [faq]);

    const handleEdit = (values: FormFields) => {
        if (faq) {
            submitRequest(updateFaq, [faq.id, values], () => {
                // we got the updated faq so we're good
                wickApp.setAlert({
                    message: new AlertMessageGenerator('faq', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                })

                navigate(`/content/faqs`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Faq"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={faqSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        () => (
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
                                            setForm({...form, is_active: Number(!form.is_active)})
                                        }}
                                        defaultValue={Boolean(form.is_active)}
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

export default FaqEdit;
