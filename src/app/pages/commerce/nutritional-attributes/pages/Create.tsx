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
import {storeNutritionalAttribute} from '../../../../requests/commerce/NutritionalAttribute.ts';
import FormErrors from "../../../../components/forms/FormErrors.tsx";
import {defaultFormFields, FormFields, nutritionalAttributeSchema} from "../core/form.ts";
import {useMain} from "../../../shared/MainContext.loader.tsx";


const NutritionalAttributeCreate: React.FC = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {options} = useMain()

    const {languages} = options

    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_NUTRITIONAL_ATTRIBUTES, PageTypes.CREATE))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = (values: FormFields) => {
        submitRequest(storeNutritionalAttribute, [values], () => {
            wickApp.setAlert({
                message: new AlertMessageGenerator('nutritional attribute', Actions.CREATE, WickToastType.SUCCESS).message,
                type: WickToastType.SUCCESS
            })

            navigate(`/commerce/nutritional-attributes`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Nutritional Attribute"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={defaultFormFields} validationSchema={nutritionalAttributeSchema}
                        onSubmit={handleCreate}
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

export default NutritionalAttributeCreate;
