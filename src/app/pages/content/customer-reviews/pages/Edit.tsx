import {ErrorMessage, Field, Form, Formik, FormikProps} from 'formik';
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
import {CustomerReview} from '../../../../models/content/CustomerReview.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {getCustomerReview, updateCustomerReview} from '../../../../requests/content/CustomerReview.ts';
import {defaultFormFields, customerReviewSchema, FormFields, fillEditForm} from "../core/form.ts";
import WickSwitch from "../../../../components/tables/WickSwitch.tsx";
import {useMain} from "../../../shared/MainContext.loader.tsx";
import {genericHandleSingleFile, genericSingleSelectOnChangeHandler} from "../../../../helpers/form.ts";
import Select from "react-select";

const CustomerReviewEdit: React.FC = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {id} = useParams();
    const {options} = useMain()

    const {languages, genders} = options

    const [customerReview, setCustomerReview] = useState<CustomerReview | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            // get the customerReview we need to edit from the database
            submitRequest(getCustomerReview, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current customerReview to edit
                    setCustomerReview(response);
                    setForm(fillEditForm(response))
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (customerReview) {
            wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_CUSTOMER_REVIEWS, PageTypes.EDIT, customerReview.name.en))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerReview]);

    const handleEdit = (values: FormFields) => {
        if (customerReview) {
            submitRequest(updateCustomerReview, [customerReview.id, values], () => {
                // we got the updated customerReview so we're good
                wickApp.setAlert({
                    message: new AlertMessageGenerator('customer review', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                })

                navigate(`/content/customer-reviews`);
            }, setFormErrors);
        }
    }

    const handleFile = (e: any, formik: FormikProps<any>, key: string) => {
        genericHandleSingleFile(e, formik, form, setForm, key);
    };

    return (
        <KTCard>
            <KTCardHeader text="Edit Customer Review"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={customerReviewSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form placeholder={undefined}>
                                <div className="row">
                                    {languages.map((language) => (
                                        <div className="col-4" key={`customer-review-name-language-${language.id}`}>
                                            <div className="mb-3">
                                                <WickFormLabel text={`Name`} isRequired={true}/>
                                                <Field
                                                    className="form-control fs-base"
                                                    type="text"
                                                    placeholder={`Enter name`}
                                                    name={`name.${language.id}`}
                                                />
                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name={`name.${language.id}`} component="div"/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mb-7">
                                    <WickFormLabel text="Gender" isRequired={true}/>

                                    <Select name="gender"
                                            value={genders.find((gender) => gender.id === form.gender)}
                                            options={genders}
                                            getOptionLabel={(gender) => gender.name}
                                            getOptionValue={(gender) => gender.id.toString()}
                                            onChange={(e) => genericSingleSelectOnChangeHandler(e, formik, form, setForm, 'gender')}
                                            className="mb-2"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="gender" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <WickFormLabel text="Rating" isRequired={false}/>

                                    <Field
                                        className="form-control fs-base"
                                        type="number"
                                        name="rating"
                                        min="1"
                                        max="5"
                                        step="1"
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const value = Math.max(1, Math.min(5, Math.floor(Number(e.target.value))));
                                            e.target.value = value.toString();
                                        }}
                                    />
                                    <small className="text-muted">Please enter a rating between 1 and 5.</small>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="rating" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="row">
                                    {languages.map((language) => (
                                        <div className="col-12" key={`customer-review-review-language-${language.id}`}>
                                            <div className="mb-3">
                                                <WickFormLabel text={`Review`} isRequired={true}/>
                                                <Field
                                                    className="form-control fs-base"
                                                    type="text"
                                                    placeholder={`Enter review`}
                                                    name={`review.${language.id}`}
                                                />
                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name={`review.${language.id}`} component="div"/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <WickFormFooter cancelUrl={'/content/customer-reviews'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default CustomerReviewEdit;
