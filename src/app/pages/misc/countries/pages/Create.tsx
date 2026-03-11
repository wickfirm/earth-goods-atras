import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers';
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import WickFormFooter from '../../../../components/forms/WickFormFooter';
import WickFormLabel from '../../../../components/forms/WickFormLabel';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericOnChangeHandler} from '../../../../helpers/form';

import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {submitRequest} from '../../../../helpers/requests';
import {Sections} from '../../../../helpers/sections';
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {storeCountry} from '../../../../requests/misc/Country';
import {CountrySchema, defaultFormFields, FormFields} from '../core/form';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";

const CountryCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const navigate = useNavigate();
    const WickApp = useWickApp();

    useEffect(() => {
        WickApp.setPageTitle(generatePageTitle(Sections.MISC_COUNTRIES, PageTypes.CREATE))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleCreate = (e: any) => {
        // send API request to create the country
        submitRequest(storeCountry, [form], (response) => {
            // it's country for sure
            WickApp.setAlert({
                message: new AlertMessageGenerator('country', Actions.CREATE, WickToastType.SUCCESS).message,
                type: WickToastType.SUCCESS
            });

            navigate(`/misc/countries`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Country"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={CountrySchema} onSubmit={handleCreate}
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

export default CountryCreate;