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
import {Lifestyle} from '../../../../models/commerce/Lifestyle.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {getLifestyle, updateLifestyle} from '../../../../requests/commerce/Lifestyle.ts';
import {defaultFormFields, FormFields, lifestyleSchema} from "../core/form.ts";
import {useMain} from "../../../shared/MainContext.loader.tsx";


const LifestyleEdit: React.FC = () => {
    const {id} = useParams();
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {options} = useMain()

    const {languages} = options

    const [lifestyle, setLifestyle] = useState<Lifestyle | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            submitRequest(getLifestyle, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    setLifestyle(response);
                    setForm(response)
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (lifestyle) {
            wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_LIFESTYLE, PageTypes.EDIT, lifestyle.name.en))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lifestyle]);

    const handleEdit = (values: FormFields) => {
        if (lifestyle) {
            submitRequest(updateLifestyle, [lifestyle.id, values], () => {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('lifestyle', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                })

                navigate(`/commerce/lifestyles`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Lifestyle"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={lifestyleSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        () => (
                            <Form placeholder={undefined}>
                                <div className="mb-7">
                                    <div className="row">
                                        {languages.map((language) => (
                                            <div className="col-12" key={`lifestyle-${language.id}`}>
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
                                </div>

                                <WickFormFooter cancelUrl={'/commerce/lifestyles'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default LifestyleEdit;
