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
import {Ingredient} from '../../../../models/commerce/Ingredient.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {getIngredient, updateIngredient} from '../../../../requests/commerce/Ingredient.ts';
import {defaultFormFields, FormFields, ingredientSchema} from "../core/form.ts";
import {useMain} from "../../../shared/MainContext.loader.tsx";
import {APP_URL, isValidLanguageKey} from "../../../../helpers/general.ts";


const IngredientEdit: React.FC = () => {
    const {id} = useParams();
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {options} = useMain()

    const {languages} = options

    const [ingredient, setIngredient] = useState<Ingredient | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);


    useEffect(() => {
        if (id) {
            submitRequest(getIngredient, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    setIngredient(response);
                    setForm(response)
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (ingredient) {
            wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_INGREDIENTS, PageTypes.EDIT, ingredient.name.en))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ingredient]);

    const handleEdit = (values: FormFields) => {
        if (ingredient) {
            submitRequest(updateIngredient, [ingredient.id, values], () => {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('ingredient', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                })

                navigate(`/commerce/ingredients`);
            }, setFormErrors);
        }
    }

    const handleFile = (e: any, formik: FormikProps<any>, key: string) => {
        const file = e.target.files[0]

        formik.setFieldValue(key, file)
    };

    return (
        <KTCard>
            <KTCardHeader text="Edit Ingredient"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={ingredientSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form placeholder={undefined}>
                                <div className="mb-7">
                                    <div className="row">
                                        <div className="col-6">
                                            {languages.map((language) => (
                                                <div className="col-12" key={`ingredient-${language.id}`}>
                                                    <div className="mb-3">
                                                        <WickFormLabel text={`Name`}
                                                                       isRequired={true}/>
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
                                        <div className="col-6">
                                            {languages.map((language) => (
                                                <div className="col-12" key={`ingredient-${language.id}`}>
                                                    <div className="mb-3">
                                                        <WickFormLabel text={`Icon`}
                                                                       isRequired={true}/>
                                                        <Field className="form-control fs-base" type="file"
                                                               name={`icon.${language.id}`}
                                                               value={undefined}
                                                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e, formik, `icon.${language.id}`)}/>

                                                        <div className="mt-3">
                                                            {
                                                                ingredient?.icon && (
                                                                    <img
                                                                        src={APP_URL + ingredient?.icon}
                                                                        className="w-25px"
                                                                        alt={`${ingredient?.name} icon`}
                                                                    />
                                                                )
                                                            }
                                                        </div>

                                                        <div className="mt-1 text-danger">
                                                            <ErrorMessage name={`icon.${language.id}`} component="div"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <WickFormFooter cancelUrl={'/commerce/ingredients'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default IngredientEdit;
