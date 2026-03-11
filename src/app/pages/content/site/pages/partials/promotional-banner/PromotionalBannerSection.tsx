import React, {useCallback, useEffect, useState} from 'react'
import {KTCard, KTCardBody} from "../../../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import FormErrors from "../../../../../../components/forms/FormErrors.tsx";
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import WickFormLabel from "../../../../../../components/forms/WickFormLabel.tsx";
import WickFormFooter from "../../../../../../components/forms/WickFormFooter.tsx";
import {PromotionalBannerSectionFormFields, sectionSchema} from "../../core/form.ts";
import {submitRequest} from "../../../../../../helpers/requests.ts";
import {useWickApp} from "../../../../../../modules/general/WickApp.loader.ts";
import {AlertMessageGenerator} from "../../../../../../helpers/AlertMessageGenerator.ts";
import {Actions, WickToastType} from "../../../../../../helpers/variables.ts";
import {FormControl} from "react-bootstrap";
import {SectionTypeEnum} from "../../../../../../enum/SectionTypeEnum.ts";
import {usePageEdit} from "../../core/PageEditContext.loader.tsx";
import {storeSectionDatum} from "../../../../../../requests/content/site/SectionData.ts";
import {Language} from "../../../../../../models/Options.ts";
import {DEFAULT_LANGUAGE, DEFAULT_RESPONSIVE_IMAGE_SIZE} from "../../../../../../helpers/settings.ts";
import {useMain} from "../../../../../shared/MainContext.loader.tsx";
import {defaultSectionDatum, SectionData} from "../../../../../../models/content/Site.ts";
import {APP_URL, storageUrl} from "../../../../../../helpers/general.ts";
import WickColorPicker from "../../../../../../components/forms/WickColorPicker.tsx";

interface LanguageFieldsProps {
    field: string;
    placeholder: string;
    isRequired?: boolean;
    languages: Language[];
}

const LanguageFields: React.FC<LanguageFieldsProps> = ({field, placeholder, isRequired, languages}) => {
    return (
        <>
            {languages.map((language) => (
                <div className="col-12" key={`${field}-language-${language.id}`}>
                    <div className="mb-3">
                        <WickFormLabel
                            text={`${placeholder}`}
                            isRequired={isRequired && language.id === DEFAULT_LANGUAGE}
                        />
                        <Field
                            className="form-control fs-base"
                            type="text"
                            placeholder={`Enter ${placeholder.toLowerCase()}`}
                            name={`${field}.${language.id}`}
                        />
                        <div className="mt-1 text-danger">
                            <ErrorMessage name={`${field}.${language.id}`} component="div"/>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

interface PromotionalBannerProps {
    pageId: number;
    sectionId: number;
}

const PromotionalBannerSection = ({pageId, sectionId}: PromotionalBannerProps) => {
    const {getSectionDatum, page} = usePageEdit();
    const wickApp = useWickApp();
    const {options} = useMain()
    const {languages} = options

    const [formErrors, setFormErrors] = useState<string[]>([])
    const [data, setData] = useState<SectionData>(defaultSectionDatum);

    const handleFile = useCallback((e: any, formik: FormikProps<any>, key: string) => {
        const file = e.target.files[0]
        if (file) {
            formik.setFieldValue(key, file);
        }
    }, []);

    const handleStore = useCallback((values: PromotionalBannerSectionFormFields, fns: any) => {
        submitRequest(
            storeSectionDatum,
            [pageId, sectionId, {...values, type: SectionTypeEnum.PROMOTIONAL_BANNER}],
            () => {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('promotional banner section settings', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS,
                });
                setFormErrors([]);
            },
            setFormErrors,
            fns
        );
    }, [wickApp, pageId, sectionId]);

    useEffect(() => {
        const sectionDatum = getSectionDatum(sectionId)

        if (sectionDatum) {
            const datum: SectionData = {
                ...sectionDatum,
                title: {
                    en: sectionDatum.title?.en || '',
                    ar: sectionDatum.title?.ar || '',
                    fr: sectionDatum.title?.fr || '',
                },
                subtitle: {
                    en: sectionDatum.subtitle?.en || '',
                    ar: sectionDatum.subtitle?.ar || '',
                    fr: sectionDatum.subtitle?.fr || '',
                },
                cta_text: {
                    en: sectionDatum.cta_text?.en || '',
                    ar: sectionDatum.cta_text?.ar || '',
                    fr: sectionDatum.cta_text?.fr || '',
                },
                cta_link: {
                    en: sectionDatum.cta_link?.en || '',
                    ar: sectionDatum.cta_link?.ar || '',
                    fr: sectionDatum.cta_link?.fr || '',
                },
                description: {
                    en: sectionDatum.description?.en || '',
                    ar: sectionDatum.description?.ar || '',
                    fr: sectionDatum.description?.fr || '',
                },
                background_color: sectionDatum.background_color || '',
                carousel_speed: sectionDatum.carousel_speed ? sectionDatum.carousel_speed : 0,
            }

            setData(datum)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionId, getSectionDatum, page]);

    return (
        <>
            <KTCard className="mb-8">
                <KTCardHeader text="Promotional Banner Block"/>

                <KTCardBody>
                    <FormErrors errorMessages={formErrors}/>

                    <Formik
                        initialValues={data}
                        validationSchema={sectionSchema({
                            isPromoBanner: true,
                            mainImage: !!data.main_image,
                            floatingImageLeft: !!data.floating_image_left,
                            floatingImageRight: !!data.floating_image_right
                        })}
                        onSubmit={handleStore}
                        enableReinitialize
                    >
                        {(formik) => (
                            <Form placeholder={undefined}>
                                <div className="row">
                                    <LanguageFields field="title" placeholder="Title" isRequired={true}
                                                    languages={languages}/>
                                </div>

                                <div className="row">
                                    <LanguageFields field="subtitle" placeholder="Subtitle" isRequired={true}
                                                    languages={languages}/>
                                </div>

                                <div className="row">
                                    {languages.map((language) => (
                                        <div className="col-12" key={`ps-description-language-${language.id}`}>
                                            <div className="mb-3">
                                                <WickFormLabel text={`Description`}
                                                               isRequired={false}/>

                                                <FormControl
                                                    as='textarea'
                                                    rows={6}
                                                    name={`description.${language.id}`}
                                                    className='form-control fs-base mb-2'
                                                    placeholder='Enter the description'
                                                    defaultValue={formik.getFieldProps('description').value[language.id]}
                                                    onChange={(e) => {
                                                        const attr = `description.${language.id}`

                                                        formik.setFieldValue(attr, e.target.value)
                                                    }}
                                                />

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name={`description.${language.id}`} component="div"/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <LanguageFields field="cta_text" placeholder="CTA Text" isRequired={false}
                                                        languages={languages}/>
                                    </div>
                                    <div className="col-4">
                                        <div className="mb-7">
                                            <WickFormLabel text="CTA Background Color" isRequired={false}/>
                                            <WickColorPicker
                                                value={formik.getFieldProps('cta_background_color').value}
                                                onChange={(color) => formik.setFieldValue('cta_background_color', color)}
                                            />
                                            <div className="mt-1 text-danger">
                                                <ErrorMessage name="cta_background_color" component="div"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <div className="mb-7">
                                            <WickFormLabel text="CTA Text Color" isRequired={false}/>
                                            <WickColorPicker
                                                value={formik.getFieldProps('cta_text_color').value}
                                                onChange={(color) => formik.setFieldValue('cta_text_color', color)}
                                            />
                                            <div className="mt-1 text-danger">
                                                <ErrorMessage name="cta_text_color" component="div"/>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="col-6">*/}
                                    {/*    <div className="mb-7">*/}
                                    {/*        <WickFormLabel text="Background Color" isRequired={false}/>*/}
                                    {/*        <WickColorPicker*/}
                                    {/*            value={formik.getFieldProps('background_color').value}*/}
                                    {/*            onChange={(color) => formik.setFieldValue('background_color', color)}*/}
                                    {/*        />*/}
                                    {/*        <div className="mt-1 text-danger">*/}
                                    {/*            <ErrorMessage name="background_color" component="div"/>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-7">
                                            <WickFormLabel text="Main Image (Desktop Version)" isRequired={false}/>

                                            <Field className="form-control fs-base" type="file"
                                                   name="main_image"
                                                   value={undefined}
                                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e, formik, 'main_image')}/>

                                            <div className="mt-3">
                                                {
                                                    data?.main_image[DEFAULT_RESPONSIVE_IMAGE_SIZE] &&
                                                    <img
                                                        src={APP_URL + data?.main_image[DEFAULT_RESPONSIVE_IMAGE_SIZE]}
                                                        className="w-75"
                                                        alt={`Main image`}/>
                                                }
                                            </div>

                                            <div className="mt-3 text-danger">
                                                {/*{formik.errors?.main_image ? formik.errors?.main_image : null}*/}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                    <div className="mb-7">
                                            <WickFormLabel text="Main Image (Mobile Version)" isRequired={false}/>

                                            <Field className="form-control fs-base" type="file"
                                                   name="main_image_mobile"
                                                   value={undefined}
                                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e, formik, 'main_image_mobile')}/>

                                            <div className="mt-3">
                                                {
                                                    data?.main_image['sm'] &&
                                                    <img src={APP_URL + data?.main_image['sm']}
                                                         className="w-75"
                                                         alt={`Main image mobile`}/>
                                                }
                                            </div>

                                            <div className="mt-3 text-danger">
                                                {/*{formik.errors?.main_image_mobile ? formik.errors?.main_image_mobile : null}*/}
                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="col-12">*/}
                                    {/*    <div className='mb-7'>*/}
                                    {/*        <WickFormLabel text='Main Image' isRequired={true}/>*/}

                                    {/*        <Field className="form-control fs-base" type="file"*/}
                                    {/*               name="main_image"*/}
                                    {/*               value={undefined}*/}
                                    {/*               onChange={(e: React.FormEvent) => handleFile(e, formik, 'main_image')}/>*/}

                                    {/*        <div className="mt-3">*/}
                                    {/*            {*/}
                                    {/*                data.main_image[DEFAULT_RESPONSIVE_IMAGE_SIZE] !== '' &&*/}
                                    {/*                <img src={storageUrl((data.main_image[DEFAULT_RESPONSIVE_IMAGE_SIZE] as string))}*/}
                                    {/*                     className="w-25"*/}
                                    {/*                     alt={`Main Image`}/>*/}
                                    {/*            }*/}
                                    {/*        </div>*/}

                                    {/*        <div className='mt-1 text-danger'>*/}
                                    {/*            /!*{formik.errors?.main_image ? formik.errors?.main_image : null}*!/*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className='mb-7'>
                                            <WickFormLabel text='Floating Image Left' isRequired={true}/>

                                            <Field className="form-control fs-base" type="file"
                                                   name="floating_image_left"
                                                   value={undefined}
                                                   onChange={(e: React.FormEvent) => handleFile(e, formik, 'floating_image_left')}/>

                                            <div className="mt-3">
                                                {
                                                    data.floating_image_left !== '' &&
                                                    <img src={storageUrl((data.floating_image_left as string))}
                                                         className="w-25"
                                                         alt={`Floating Image Left`}/>
                                                }
                                            </div>

                                            <div className='mt-1 text-danger'>
                                                {formik.errors?.floating_image_left ? formik.errors?.floating_image_left : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className='mb-7'>
                                            <WickFormLabel text='Floating Image Right' isRequired={true}/>

                                            <Field className="form-control fs-base" type="file"
                                                   name="floating_image_right"
                                                   value={undefined}
                                                   onChange={(e: React.FormEvent) => handleFile(e, formik, 'floating_image_right')}/>

                                            <div className="mt-3">
                                                {
                                                    data.floating_image_right !== '' &&
                                                    <img src={storageUrl((data.floating_image_right as string))}
                                                         className="w-25"
                                                         alt={`Floating Image Right`}/>
                                                }
                                            </div>

                                            <div className='mt-1 text-danger'>
                                                {formik.errors?.floating_image_right ? formik.errors?.floating_image_right : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <WickFormFooter/>
                            </Form>
                        )}
                    </Formik>
                </KTCardBody>
            </KTCard>
        </>
    )
}

export default PromotionalBannerSection;
