import React, {useEffect, useState} from 'react'
import {Sections} from '../../../../helpers/sections';
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import FormErrors from "../../../../components/forms/FormErrors.tsx";
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import WickFormLabel from "../../../../components/forms/WickFormLabel.tsx";
import WickFormFooter from "../../../../components/forms/WickFormFooter.tsx";
import {Newsletter} from "../../../../models/content/Newsletter.ts";
import {defaultFormFields, fillEditForm, FormFields, newsletterSchema} from "../core/form.ts";
import {getErrorPage, submitRequest} from "../../../../helpers/requests.ts";
import {useNavigate} from "react-router-dom";
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator.ts";
import {getNewsletter, updateNewsletter} from "../../../../requests/content/Newsletter.ts";
import {useMain} from "../../../shared/MainContext.loader.tsx";
import WickSwitch from "../../../../components/tables/WickSwitch.tsx";
import {APP_URL} from "../../../../helpers/general.ts";
import {DEFAULT_RESPONSIVE_IMAGE_SIZE} from "../../../../helpers/settings.ts";
import {getAllDiscountCodes} from "../../../../requests/commerce/DiscountCode.ts";
import {DiscountCode} from "../../../../models/commerce/DiscountCode.ts";
import Select from "react-select";
import {genericSingleSelectOnChangeHandler} from "../../../../helpers/form.ts";

const NewsletterIndex = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {options} = useMain()

    const {languages} = options

    const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
    const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_NEWSLETTER, PageTypes.INDEX))

        submitRequest(getNewsletter, [1], (response) => {
            const errorPage = getErrorPage(response);

            if (errorPage) {
                navigate(errorPage);
            } else {
                setNewsletter(response);
                setForm(fillEditForm(response))
            }
        });

        submitRequest(getAllDiscountCodes, [], (response) => {
            const errorPage = getErrorPage(response)

            if (errorPage) {
                navigate(errorPage)
            } else {
                setDiscountCodes(response)
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleFile = (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<any>, key: string) => {
        const file = e.target.files?.[0]

        formik.setFieldValue(key, file)
    };

    const handleEdit = (values: FormFields) => {
        if (newsletter) {
            submitRequest(updateNewsletter, [newsletter.id, values], (response) => {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('newsletter', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                })

                setNewsletter(response)

                navigate(`/content/newsletters`);
            }, setFormErrors);
        }
    }

    return (
        <>
            <KTCard className="mb-10">
                <KTCardHeader text="Newsletter Popup Content"/>

                <KTCardBody>
                    <FormErrors errorMessages={formErrors}/>

                    <Formik initialValues={form} validationSchema={newsletterSchema} onSubmit={handleEdit}
                            enableReinitialize>
                        {
                            (formik) => (
                                <Form placeholder={undefined}>
                                    <div className="mb-7">
                                        <div className="row">
                                            {languages.map((language) => (
                                                <div className="col-4" key={`newsletter-title-${language.id}`}>
                                                    <div className="mb-3">
                                                        <WickFormLabel text={`Title`}
                                                                       isRequired={true}/>
                                                        <Field
                                                            className="form-control fs-base"
                                                            type="text"
                                                            placeholder={`Enter title`}
                                                            name={`title.${language.id}`}
                                                        />
                                                        <div className="mt-1 text-danger">
                                                            <ErrorMessage name={`title.${language.id}`}
                                                                          component="div"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {languages.map((language) => (
                                                <div className="col-4"
                                                     key={`newsletter-subtitle-${language.id}`}>
                                                    <div className="mb-3">
                                                        <WickFormLabel text={`Subtitle`}
                                                                       isRequired={true}/>
                                                        <Field
                                                            className="form-control fs-base"
                                                            type="text"
                                                            placeholder={`Enter subtitle`}
                                                            name={`subtitle.${language.id}`}
                                                        />
                                                        <div className="mt-1 text-danger">
                                                            <ErrorMessage name={`subtitle.${language.id}`}
                                                                          component="div"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="col-4">
                                                <div className="mb-3">
                                                    <WickFormLabel text={`Discount Code`}
                                                                   isRequired={true}/>
                                                    <Select name="discount_code_id"
                                                            value={discountCodes.find((discountCode) => discountCode.id === form.discount_code_id)}
                                                            options={discountCodes}
                                                            getOptionLabel={(discountCode) => discountCode.code}
                                                            getOptionValue={(discountCode) => discountCode.id.toString()}
                                                            onChange={(e) => genericSingleSelectOnChangeHandler(e, formik, form, setForm, 'discount_code_id')}
                                                            className="mb-2"/>

                                                    <div className="mt-2 mb-2 text-danger">
                                                        {formik.errors?.discount_code_id ? formik.errors?.discount_code_id : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-7">
                                        <div className="row">
                                            {languages.map((language) => (
                                                <div className="col-12"
                                                     key={`newsletter-description-${language.id}`}>
                                                    <div className="mb-3">
                                                        <WickFormLabel text={`Description`}
                                                                       isRequired={true}/>
                                                        <Field
                                                            className="form-control fs-base"
                                                            type="text"
                                                            placeholder={`Enter description`}
                                                            name={`description.${language.id}`}
                                                        />
                                                        <div className="mt-1 text-danger">
                                                            <ErrorMessage name={`description.${language.id}`}
                                                                          component="div"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-7">
                                        <div className="row">
                                            <div className="col-5">
                                                <WickFormLabel text="Background Image (Desktop Version)"
                                                               isRequired={false}/>

                                                <Field className="form-control fs-base" type="file"
                                                       name="background_image"
                                                       value={undefined}
                                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e, formik, 'background_image')}/>

                                                <div className="mt-3">
                                                    {
                                                        newsletter?.background_image[DEFAULT_RESPONSIVE_IMAGE_SIZE] &&
                                                        <img
                                                            src={APP_URL + newsletter?.background_image[DEFAULT_RESPONSIVE_IMAGE_SIZE]}
                                                            className="w-75"
                                                            alt={`${newsletter?.title} background image`}/>
                                                    }
                                                </div>

                                                <div className="mt-3 text-danger">
                                                    {formik.errors?.background_image ? formik.errors?.background_image : null}
                                                </div>
                                            </div>

                                            <div className="col-5">
                                                <WickFormLabel text="Background Image (Mobile Version)"
                                                               isRequired={false}/>

                                                <Field className="form-control fs-base" type="file"
                                                       name="background_image_mobile"
                                                       value={undefined}
                                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e, formik, 'background_image_mobile')}/>

                                                <div className="mt-3">
                                                    {
                                                        newsletter?.background_image['sm'] &&
                                                        <img src={APP_URL + newsletter?.background_image['sm']}
                                                             className="w-75"
                                                             alt={`${newsletter?.title} background image mobile`}/>
                                                    }
                                                </div>

                                                <div className="mt-3 text-danger">
                                                    {formik.errors?.background_image ? formik.errors?.background_image : null}
                                                </div>
                                            </div>

                                            <div className="col-2">
                                                <WickFormLabel text='Is Active?' isRequired={true}/>

                                                <WickSwitch
                                                    name='is_active'
                                                    onChangeHandler={(e) => {
                                                        e.stopPropagation()
                                                        formik.setFieldValue("is_active", Number(!formik.getFieldProps('is_active').value))
                                                    }}
                                                    defaultValue={Boolean(formik.getFieldProps('is_active').value)}
                                                />
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
        </>
    )
}

export default NewsletterIndex;
