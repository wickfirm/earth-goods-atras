import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Select from 'react-select';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import WickFormFooter from '../../../../components/forms/WickFormFooter';
import WickFormLabel from '../../../../components/forms/WickFormLabel';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {filterData} from '../../../../helpers/dataManipulation';
import {genericOnChangeHandler, genericSingleSelectOnChangeHandler,} from '../../../../helpers/form';
import {generatePageTitle} from '../../../../helpers/pageTitleGenerator';
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from '../../../../helpers/sections';
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {City} from '../../../../models/misc/City';
import {Country} from '../../../../models/misc/Country';
import {getCity, updateCity} from '../../../../requests/misc/City';
import {getAllCountries} from '../../../../requests/misc/Country';
import {CitySchema, defaultFormFields, FormFields} from '../core/form';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";

const CityEdit: React.FC = () => {
    const [city, setCity] = useState<City | null>(null);

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [countries, setCountries] = useState<Country[]>([]);

    const wickApp = useWickApp();

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the city we need to edit from the database
            submitRequest(getCity, [parseInt(id)], (response) => {
                let errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current city to edit
                    setCity(response);

                    wickApp.setPageTitle(generatePageTitle(Sections.MISC_CITIES, PageTypes.EDIT, response.name))

                    const {country, ...currentCity} = response;

                    setForm({...currentCity, country_id: country.id});

                    setSelectedCountry(country);
                }
            });

            // get the countries
            submitRequest(getAllCountries, [], (response) => {
                setCountries(filterData(response, 'name', ['All Countries']));
            }, setFormErrors);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = (e: any) => {
        if (city) {
            // we need to update the city's data by doing API call with form
            submitRequest(updateCity, [city.id, form], (response) => {
                // we got the booking city so we're good
                wickApp.setAlert({
                    message: new AlertMessageGenerator('city', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                });

                navigate(`/misc/cities`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit City"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={CitySchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler} placeholder={undefined}>
                                <div className="mb-7">
                                    <WickFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter city name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <WickFormLabel text="Country" isRequired={true}/>

                                    <Select name={'country_id'} value={selectedCountry}
                                            options={countries}
                                            getOptionLabel={(instance) => instance.name[DEFAULT_LANGUAGE]}
                                            getOptionValue={(instance) => instance.id.toString()}
                                            placeholder={'Select country'}
                                            onChange={(e) => {
                                                genericSingleSelectOnChangeHandler(e, formik, form, setForm, 'country_id');

                                                const newCountry: Country = e as Country;

                                                setSelectedCountry(newCountry);
                                            }
                                            }/>

                                    <div className="mt-3 text-danger">
                                        {formik.errors?.country_id ? formik.errors?.country_id : null}
                                    </div>
                                </div>
                                <WickFormFooter cancelUrl={'/misc/cities'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default CityEdit;
