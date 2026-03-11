import {ErrorMessage, Field, Form, Formik, FormikProps} from 'formik';
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
import {storeCategory} from '../../../../requests/commerce/Category.ts';
import FormErrors from "../../../../components/forms/FormErrors.tsx";
import {categorySchema, defaultFormFields, FormFields} from "../core/form.ts";
import {useMain} from "../../../shared/MainContext.loader.tsx";


const CategoryCreate: React.FC = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {options} = useMain()

    const {languages} = options

    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_CATEGORIES, PageTypes.CREATE))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<any>, key: string) => {
        const file = e.target.files?.[0]

        formik.setFieldValue(key, file)
    };

    const handleCreate = (values: FormFields) => {
        submitRequest(storeCategory, [values], () => {
            wickApp.setAlert({
                message: new AlertMessageGenerator('category', Actions.CREATE, WickToastType.SUCCESS).message,
                type: WickToastType.SUCCESS
            })

            navigate(`/commerce/categories`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Category"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={defaultFormFields} validationSchema={categorySchema} onSubmit={handleCreate}
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
                                            <WickFormLabel text="Menu Thumbnail (290x300)" isRequired={true}/>

                                            <Field className="form-control fs-base" type="file" name="menu_thumbnail"
                                                   value={undefined}
                                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e, formik, 'menu_thumbnail')}/>

                                            <div className="mt-3 text-danger">
                                                {formik.errors?.menu_thumbnail ? formik.errors?.menu_thumbnail : null}
                                            </div>
                                        </div>

                                        <div className="col-4">
                                            <WickFormLabel text="Homepage Thumbnail (214x205)" isRequired={true}/>

                                            <Field className="form-control fs-base" type="file"
                                                   name="homepage_thumbnail"
                                                   value={undefined}
                                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e, formik, 'homepage_thumbnail')}/>

                                            <div className="mt-3 text-danger">
                                                {formik.errors?.homepage_thumbnail ? formik.errors?.homepage_thumbnail : null}
                                            </div>
                                        </div>

                                        <div className="col-4">
                                            <WickFormLabel text="Shop Banner" isRequired={true}/>

                                            <Field className="form-control fs-base" type="file" name="shop_thumbnail"
                                                   value={undefined}
                                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e, formik, 'shop_thumbnail')}/>

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

export default CategoryCreate;
