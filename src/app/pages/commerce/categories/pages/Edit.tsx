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
import {Category} from '../../../../models/commerce/Category.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {getCategory, updateCategory} from '../../../../requests/commerce/Category.ts';
import {categorySchema, defaultFormFields, fillEditForm, FormFields} from "../core/form.ts";
import {useMain} from "../../../shared/MainContext.loader.tsx";
import {APP_URL} from "../../../../helpers/general.ts";
import {DEFAULT_RESPONSIVE_IMAGE_SIZE} from "../../../../helpers/settings.ts";


const CategoryEdit: React.FC = () => {
    const {id} = useParams();
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {options} = useMain()

    const {languages} = options

    const [category, setCategory] = useState<Category | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            submitRequest(getCategory, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    setCategory(response);

                    setForm(fillEditForm(response))
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (category) {
            wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_CATEGORIES, PageTypes.EDIT, category.name.en))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<any>, key: string) => {
        const file = e.target.files?.[0]

        formik.setFieldValue(key, file)
    };

    const handleEdit = (values: FormFields) => {
        if (category) {
            submitRequest(updateCategory, [category.id, values], () => {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('category', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                })

                navigate(`/commerce/categories`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Category"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={categorySchema(true)} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form placeholder={undefined}>
                                <div className="mb-7">
                                    <div className="row">
                                        {languages.map((language) => (
                                            <div className="col-12" key={`category-${language.id}`}>
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

                                <div className="mb-7">
                                    <div className="row">
                                        <div className="col-4">
                                            <WickFormLabel text="Menu Thumbnail (290x300)" isRequired={false}/>

                                            <Field className="form-control fs-base" type="file" name="menu_thumbnail"
                                                   value={undefined}
                                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e, formik, 'menu_thumbnail')}/>

                                            <div className="mt-3">
                                                {
                                                    category?.menu_thumbnail &&
                                                    <img src={APP_URL + category?.menu_thumbnail[DEFAULT_RESPONSIVE_IMAGE_SIZE]}
                                                         className="w-25"
                                                         alt={`${category?.name} menu thumbnail`}/>
                                                }
                                            </div>

                                            <div className="mt-3 text-danger">
                                                {formik.errors?.menu_thumbnail ? formik.errors?.menu_thumbnail : null}
                                            </div>
                                        </div>

                                        <div className="col-4">
                                            <WickFormLabel text="Homepage Thumbnail (214x205)" isRequired={false}/>

                                            <Field className="form-control fs-base" type="file"
                                                   name="homepage_thumbnail"
                                                   value={undefined}
                                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e, formik, 'homepage_thumbnail')}/>

                                            <div className="mt-3">
                                                {
                                                    category?.homepage_thumbnail &&
                                                    <img src={APP_URL + category?.homepage_thumbnail[DEFAULT_RESPONSIVE_IMAGE_SIZE]}
                                                         className="w-25"
                                                         alt={`${category?.name} homepage thumbnail`}/>
                                                }
                                            </div>

                                            <div className="mt-3 text-danger">
                                                {formik.errors?.homepage_thumbnail ? formik.errors?.homepage_thumbnail : null}
                                            </div>
                                        </div>

                                        <div className="col-4">
                                            <WickFormLabel text="Shop Banner" isRequired={false}/>

                                            <Field className="form-control fs-base" type="file" name="shop_thumbnail"
                                                   value={undefined}
                                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e, formik, 'shop_thumbnail')}/>

                                            <div className="mt-3">
                                                {
                                                    category?.shop_thumbnail &&
                                                    <img src={APP_URL + category?.shop_thumbnail[DEFAULT_RESPONSIVE_IMAGE_SIZE]}
                                                         className="w-25"
                                                         alt={`${category?.name} shop thumbnail`}/>
                                                }
                                            </div>

                                            <div className="mt-3 text-danger">
                                                {formik.errors?.shop_thumbnail ? formik.errors?.shop_thumbnail : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <WickFormFooter cancelUrl={'/commerce/categories'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default CategoryEdit;
