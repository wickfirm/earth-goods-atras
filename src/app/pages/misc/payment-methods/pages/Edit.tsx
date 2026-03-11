import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import * as Yup from 'yup';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import WickFormFooter from '../../../../components/forms/WickFormFooter.tsx';
import WickFormLabel from '../../../../components/forms/WickFormLabel.tsx';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericOnChangeHandler} from '../../../../helpers/form';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {PaymentMethod} from '../../../../models/misc/PaymentMethod';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {getPaymentMethod, updatePaymentMethod} from '../../../../requests/misc/PaymentMethod';
import {defaultFormFields, FormFields} from "../core/form.ts";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";


const PaymentMethodEdit: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const wickApp = useWickApp();

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the paymentMethod we need to edit from the database
            submitRequest(getPaymentMethod, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current paymentMethod to edit
                    setPaymentMethod(response);
                    setForm(response)
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (paymentMethod) {
            wickApp.setPageTitle(generatePageTitle(Sections.MISC_PAYMENT_METHODS, PageTypes.EDIT, paymentMethod.name[DEFAULT_LANGUAGE]))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentMethod]);

    const EditPaymentMethodSchema = Yup.object().shape({
        name: Yup.string().required()
    });

    const onChangeHandler = (e: React.FormEvent<HTMLFormElement>) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        // we need to update the paymentMethod's data by doing API call with form
        if (paymentMethod) {
            submitRequest(updatePaymentMethod, [paymentMethod.id, form], () => {
                // we got the updated paymentMethod so we're good
                wickApp.setAlert({
                    message: new AlertMessageGenerator('payment method', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                })

                navigate(`/misc/payment-methods`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Payment Method"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={EditPaymentMethodSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        () => (
                            <Form onChange={onChangeHandler} placeholder={undefined}>
                                <div className="mb-7">
                                    <WickFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter payment method name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <WickFormFooter cancelUrl={'/misc/payment-methods'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default PaymentMethodEdit;
