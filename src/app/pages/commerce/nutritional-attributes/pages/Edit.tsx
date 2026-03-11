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
import {NutritionalAttribute} from '../../../../models/commerce/NutritionalAttribute.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {
    getNutritionalAttribute,
    updateNutritionalAttribute
} from '../../../../requests/commerce/NutritionalAttribute.ts';
import {defaultFormFields, FormFields, nutritionalAttributeSchema} from "../core/form.ts";
import {useMain} from "../../../shared/MainContext.loader.tsx";


const NutritionalAttributeEdit: React.FC = () => {
    const {id} = useParams();
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {options} = useMain()

    const {languages} = options

    const [nutritionalAttribute, setNutritionalAttribute] = useState<NutritionalAttribute | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            // get the nutritionalAttribute we need to edit from the database
            submitRequest(getNutritionalAttribute, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current nutritionalAttribute to edit
                    setNutritionalAttribute(response);
                    setForm(response)
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (nutritionalAttribute) {
            wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_NUTRITIONAL_ATTRIBUTES, PageTypes.EDIT, nutritionalAttribute.name.en))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nutritionalAttribute]);

    const handleEdit = (values: FormFields) => {
        if (nutritionalAttribute) {
            submitRequest(updateNutritionalAttribute, [nutritionalAttribute.id, values], () => {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('nutritional attribute', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                })

                navigate(`/commerce/nutritional-attributes`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Nutritional Attribute"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={nutritionalAttributeSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        () => (
                            <Form placeholder={undefined}>
                                <div className="mb-7">
                                    <div className="row">
                                        {languages.map((language) => (
                                            <div className="col-12" key={`nutritional-attribute-${language.id}`}>
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

                                <WickFormFooter cancelUrl={'/commerce/nutritional-attributes'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default NutritionalAttributeEdit;
