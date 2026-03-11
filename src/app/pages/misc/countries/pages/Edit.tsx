import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import WickFormFooter from '../../../../components/forms/WickFormFooter';
import WickFormLabel from '../../../../components/forms/WickFormLabel';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericOnChangeHandler} from '../../../../helpers/form';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from '../../../../helpers/sections';
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {Country} from '../../../../models/misc/Country';
import {getCountry, updateCountry} from '../../../../requests/misc/Country';
import {CountrySchema, defaultFormFields, FormFields} from '../core/form';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";


const CountryEdit: React.FC = () => {
    const [country, setCountry] = useState<Country | null>(null);

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const wickApp = useWickApp();

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the country we need to edit from the database
            submitRequest(getCountry, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current country to edit
                    setCountry(response);
                    setForm(response);
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (country) {
            wickApp.setPageTitle(generatePageTitle(Sections.MISC_COUNTRIES, PageTypes.EDIT, country.name[DEFAULT_LANGUAGE]))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        if (country) {
            // we need to update the country's data by doing API call with form
            submitRequest(updateCountry, [country.id, form], (response) => {
                // we got the booking country so we're good
                wickApp.setAlert({
                    message: new AlertMessageGenerator('country', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                });

                navigate(`/misc/countries`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Country"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={CountrySchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        () => (
                            <Form onChange={onChangeHandler} placeholder={undefined}>
                                <div className="mb-7">
                                    <WickFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter country name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <WickFormLabel text="Code" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter country code" name="code"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="code" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <WickFormLabel text="Currency" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter country currency" name="currency"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="currency" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <WickFormLabel text="Phone code" isRequired={true}/>

                                    <Field className="form-control fs-base" type="number"
                                           placeholder="Enter country phone code" name="phone_code"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="phone_code" className="mt-2"/>
                                    </div>
                                </div>

                                <WickFormFooter cancelUrl={'/misc/countries'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default CountryEdit;
