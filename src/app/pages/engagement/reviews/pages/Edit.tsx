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
import {Review} from '../../../../models/engagement/Review.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {getReview, updateReview} from '../../../../requests/engagement/Review.ts';
import {useMain} from "../../../shared/MainContext.loader.tsx";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";
import {defaultFormFields, FormFields, reviewSchema} from "../core/form.ts";
import WickSwitch from "../../../../components/tables/WickSwitch.tsx";


const ReviewEdit: React.FC = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {id} = useParams();

    const [review, setReview] = useState<Review | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            submitRequest(getReview, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    setReview(response);
                    setForm({
                        ...form,
                        ["is_valid"]: response.is_valid,
                    })
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (review) {
            wickApp.setPageTitle(generatePageTitle(Sections.ENGAGEMENT_REVIEWS, PageTypes.EDIT, review.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [review]);


    const handleEdit = (values: FormFields) => {
        if (review) {
            submitRequest(updateReview, [review.id, values], () => {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('review', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                })

                navigate(`/engagement/reviews`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Review"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={reviewSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form placeholder={undefined}>
                                <div className="d-flex gap-6 align-items-center text-left mb-7">
                                    <WickFormLabel text='Name' isRequired={false}/>

                                    <div className="fw-medium text-black-50">{review?.name}</div>
                                </div>

                                <div className="d-flex gap-6 align-items-center text-left mb-7">
                                    <WickFormLabel text='Email' isRequired={false}/>

                                    <div className="fw-medium text-black-50">{review?.email}</div>
                                </div>

                                <div className="d-flex gap-6 align-items-center text-left mb-7">
                                    <WickFormLabel text='Rating' isRequired={false}/>

                                    <div className="fw-medium text-black-50">{review?.rating}</div>
                                </div>

                                <div className="d-flex gap-6 align-items-center text-left mb-7">
                                    <WickFormLabel text='Review' isRequired={false}/>

                                    <div className="fw-medium text-black-50">{review?.review}</div>
                                </div>

                                <div className="d-flex gap-6 align-items-center text-left mb-7">
                                    <WickFormLabel text='Product' isRequired={false}/>

                                    <div className="fw-medium text-black-50">{review?.product.name[DEFAULT_LANGUAGE]}</div>
                                </div>

                                <div className="d-flex gap-6 align-items-center text-left mb-7">
                                    <WickFormLabel text='Is Valid?' isRequired={true}/>

                                    <WickSwitch
                                        name='is_valid'
                                        onChangeHandler={(e) => {
                                            e.stopPropagation()
                                            formik.setFieldValue("is_valid", Number(!formik.getFieldProps('is_valid').value))
                                        }}
                                        defaultValue={Boolean(formik.getFieldProps('is_valid').value)}
                                    />
                                </div>

                                <WickFormFooter cancelUrl={'/engagement/reviews'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default ReviewEdit;
