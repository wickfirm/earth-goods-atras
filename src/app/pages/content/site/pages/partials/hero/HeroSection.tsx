import React, {useCallback, useEffect, useState} from 'react'
import {KTCard, KTCardBody, toAbsoluteUrl} from "../../../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import FormErrors from "../../../../../../components/forms/FormErrors.tsx";
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import WickFormLabel from "../../../../../../components/forms/WickFormLabel.tsx";
import WickFormFooter from "../../../../../../components/forms/WickFormFooter.tsx";
import {defaultHeroSectionFormFields, HeroSectionFormFields, sectionSchema} from "../../core/form.ts";
import {submitRequest} from "../../../../../../helpers/requests.ts";
import {AlertMessageGenerator} from "../../../../../../helpers/AlertMessageGenerator.ts";
import {Actions, WickToastType} from "../../../../../../helpers/variables.ts";
import {useWickApp} from "../../../../../../modules/general/WickApp.loader.ts";
import WickTableWithData from "../../../../../../components/tables/WickTableWithData.tsx";
import {SectionData} from "../../../../../../models/content/Site.ts";
import {HeroTableColumns} from "../../core/HeroTableColumns.tsx";
import {usePageEdit} from "../../core/PageEditContext.loader.tsx";
import {storeSectionDatum, updateSectionDatum} from "../../../../../../requests/content/site/SectionData.ts";
import {SectionTypeEnum} from "../../../../../../enum/SectionTypeEnum.ts";
import {useMain} from "../../../../../shared/MainContext.loader.tsx";
import {DEFAULT_LANGUAGE, DEFAULT_RESPONSIVE_IMAGE_SIZE} from "../../../../../../helpers/settings.ts";
import {Language} from "../../../../../../models/Options.ts";
import {APP_URL, storageUrl} from "../../../../../../helpers/general.ts";
import * as Yup from "yup";
import WickColorPicker from "../../../../../../components/forms/WickColorPicker.tsx";
import {Editor} from "primereact/editor";
import WickSwitch from "../../../../../../components/forms/WickSwitch.tsx";

interface LanguageFieldsProps {
    field: string;
    placeholder: string;
    isRequired?: boolean;
    languages: Language[];
    type?: string
}

const LanguageFields: React.FC<LanguageFieldsProps> = ({field, placeholder, isRequired, languages, type}) => {
    return (
        <>
            {languages.map((language) => (
                <div className="col-12" key={`${field}-language-${language.id}`}>
                    <div className="mb-3">
                        <WickFormLabel
                            text={`${placeholder}`}
                            isRequired={isRequired && language.id === DEFAULT_LANGUAGE}
                        />
                        {type === 'editor' ? (
                            <Field name={`${field}.${language.id}`}>
                                {({ field: formikField, form }: any) => (
                                    <Editor
                                        value={formikField.value}
                                        onTextChange={(e) => form.setFieldValue(`${field}.${language.id}`, e.htmlValue)}
                                        style={{ height: '100px' }}
                                    />
                                )}
                            </Field>
                        ) : (
                            <Field
                                as={type === 'textarea' ? 'textarea' : 'input'}
                                className="form-control fs-base"
                                type={type === 'textarea' ? undefined : (type || 'text')}
                                placeholder={`Enter ${placeholder.toLowerCase()}`}
                                name={`${field}.${language.id}`}
                                rows={type === 'textarea' ? 4 : undefined}
                            />
                        )}
                        <div className="mt-1 text-danger">
                            <ErrorMessage name={`${field}.${language.id}`} component="div"/>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};



interface HeroSectionProps {
    pageId: number;
    sectionId: number;
    onlyForm?: boolean;
    editSectionData?: SectionData;
}

const HeroSection: React.FC<HeroSectionProps> = ({pageId, sectionId, onlyForm, editSectionData}) => {
    const {getSectionData, page, handleRefresh} = usePageEdit();
    const wickApp = useWickApp();
    const {options} = useMain();
    const {languages} = options;

    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [data, setData] = useState<SectionData[]>([]);
    const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);

    const handleFile = useCallback((e: any, formik: FormikProps<any>, key: string) => {
        const file = e.target.files[0]
        if (file) {
            formik.setFieldValue(key, file);

            // Set preview of the uploaded icon
            const reader = new FileReader();
            reader.onloadend = () => setMainImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    }, []);
    // Normalize initial values to ensure all localized fields are objects, not arrays
    const normalizeInitialValues = useCallback((data: any): HeroSectionFormFields => {
        if (!data) return defaultHeroSectionFormFields;

        const normalizeLocalized = (value: any) => {
            // If it's an array, convert to object
            if (Array.isArray(value)) {
                const obj: any = {};
                value.forEach((item, index) => {
                    if (typeof item === 'string') {
                        // Handle case: ['value'] => {en: 'value'}
                        obj['en'] = item;
                    } else if (typeof item === 'object') {
                        // Handle case: [{en: 'value'}] => {en: 'value'}
                        Object.assign(obj, item);
                    }
                });
                // Fill in missing language keys
                return {
                    en: obj.en || '',
                    ar: obj.ar || '',
                    fr: obj.fr || '',
                };
            }
            // If it's already an object, ensure all keys exist
            if (value && typeof value === 'object') {
                return {
                    en: value.en || '',
                    ar: value.ar || '',
                    fr: value.fr || '',
                };
            }
            // Default empty object
            return { en: '', ar: '', fr: '' };
        };

        return {
            title: normalizeLocalized(data.title),
            subtitle: normalizeLocalized(data.subtitle),
            cta_text: normalizeLocalized(data.cta_text),
            cta_link: normalizeLocalized(data.cta_link),
            title_text_color: data.title_text_color || '',
            subtitle_text_color: data.subtitle_text_color || '',
            background_color: data.background_color || '',
            carousel_speed: data.carousel_speed || 0,
            main_image: data.main_image || undefined,
            main_image_mobile: data.main_image_mobile || undefined,
            hide: data.hide || 0,
        };
    }, []);
    const handleStore = useCallback((values: HeroSectionFormFields, fns: any) => {

        if (editSectionData) {
            submitRequest(
                updateSectionDatum,
                [pageId, sectionId, editSectionData.id, {...values, type: SectionTypeEnum.HERO}],
                () => {
                    wickApp.setAlert({
                        message: new AlertMessageGenerator('hero section settings', Actions.EDIT, WickToastType.SUCCESS).message,
                        type: WickToastType.SUCCESS,
                    });
                    setFormErrors([]);
                    handleRefresh();
                },
                setFormErrors,
                fns
            );
        } else {
            submitRequest(
                storeSectionDatum,
                [pageId, sectionId, {...values, type: SectionTypeEnum.HERO}],
                () => {
                    wickApp.setAlert({
                        message: new AlertMessageGenerator('hero section settings', Actions.EDIT, WickToastType.SUCCESS).message,
                        type: WickToastType.SUCCESS,
                    });
                    setFormErrors([]);
                    handleRefresh();
                    fns.resetForm(); // Reset form after successful submission
                    setMainImagePreview(null); // Reset icon preview
                },
                setFormErrors,
                fns
            );
        }
    }, [wickApp, pageId, sectionId, handleRefresh]);

    useEffect(() => {
        const sectionData = getSectionData(sectionId);

        if (sectionData) {
            setData(sectionData);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionId, getSectionData, page]);

    return (
        <>
            {
                !onlyForm && (
                    <KTCard className="mb-8">
                        <KTCardHeader text="Hero Block"/>

                        <KTCardBody>
                            <WickTableWithData data={data} columnsArray={HeroTableColumns}/>
                        </KTCardBody>
                    </KTCard>
                )
            }

            <KTCard className="mb-8">
                {/*<KTCardHeader text="Hero Block"/>*/}

                <KTCardBody>
                    <FormErrors errorMessages={formErrors}/>

                    <Formik
                        initialValues={normalizeInitialValues(editSectionData) ?? defaultHeroSectionFormFields}
                        validationSchema={onlyForm ? Yup.object().shape({
                            // title: Yup.object().shape({
                            //     en: Yup.string().required('title in English is required'),
                            //     // ar: Yup.string().notRequired(),
                            //     // fr: Yup.string().notRequired(),
                            // }),
                            // subtitle: Yup.object().shape({
                            //     en: Yup.string().required('subtitle in English is required'),
                            //     // ar: Yup.string().notRequired(),
                            //     // fr: Yup.string().notRequired(),
                            // }),
                        }) : sectionSchema({isHero: true})}
                        onSubmit={handleStore}
                        enableReinitialize
                    >
                        {(formik) => (
                            <Form placeholder={undefined}>
                                <div className="row">
                                    <LanguageFields field="title" placeholder="Title" isRequired={false}
                                                    languages={languages}/>
                                </div>

                                <div className="row">
                                    <LanguageFields field="subtitle" placeholder="Subtitle" isRequired={false}
                                                    languages={languages} type={'editor'}/>


                                </div>

                                <div className="row">
                                    <div className="col-3">
                                        <LanguageFields field="cta_text" placeholder="CTA Text" isRequired={false}
                                                        languages={languages}/>
                                    </div>

                                    <div className="col-3">
                                        <LanguageFields field="cta_link" placeholder="CTA Link" isRequired={false}
                                                        languages={languages}/>
                                    </div>

                                    <div className="col-3">
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

                                    <div className="col-3">
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
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="mb-7">
                                            <WickFormLabel text="Main Image (Desktop Version)" isRequired={false}/>

                                            <Field className="form-control fs-base" type="file"
                                                   name="main_image"
                                                   value={undefined}
                                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e, formik, 'main_image')}/>

                                            <div className="mt-3">
                                                {
                                                    editSectionData?.main_image[DEFAULT_RESPONSIVE_IMAGE_SIZE] &&
                                                    <img
                                                        src={APP_URL + editSectionData?.main_image[DEFAULT_RESPONSIVE_IMAGE_SIZE]}
                                                        className="w-75"
                                                        alt={`Main image`}/>
                                                }
                                            </div>

                                            <div className="mt-3 text-danger">
                                                {formik.errors?.main_image ? formik.errors?.main_image : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="mb-7">
                                            <WickFormLabel text="Main Image (Mobile Version)" isRequired={false}/>

                                            <Field className="form-control fs-base" type="file"
                                                   name="main_image_mobile"
                                                   value={undefined}
                                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e, formik, 'main_image_mobile')}/>

                                            <div className="mt-3">
                                                {
                                                    editSectionData?.main_image['sm'] &&
                                                    <img src={APP_URL + editSectionData?.main_image['sm']}
                                                         className="w-75"
                                                         alt={`Main image mobile`}/>
                                                }
                                            </div>

                                            <div className="mt-3 text-danger">
                                                {formik.errors?.main_image_mobile ? formik.errors?.main_image_mobile : null}
                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="col-4">*/}
                                    {/*    <div className="mb-3">*/}
                                    {/*        <WickFormLabel text="Main Image" isRequired={true}/>*/}
                                    {/*        <Field className="form-control fs-base" type="file"*/}
                                    {/*               name="main_image"*/}
                                    {/*               value={undefined}*/}
                                    {/*               onChange={(e: React.FormEvent) => handleFile(e, formik, 'main_image')}/>*/}

                                    {/*        {mainImagePreview && <img src={mainImagePreview} alt="Main Image Preview"*/}
                                    {/*                                  style={{width: '100%', marginTop: '10px'}}/>}*/}

                                    {/*        {mainImagePreview ? (*/}
                                    {/*            <img src={mainImagePreview} alt="Main Image Preview"*/}
                                    {/*                 style={{width: '100%', marginTop: '10px'}}/>*/}
                                    {/*        ) : (*/}
                                    {/*            editSectionData && editSectionData.main_image[DEFAULT_RESPONSIVE_IMAGE_SIZE] !== '' && editSectionData.main_image[DEFAULT_RESPONSIVE_IMAGE_SIZE]?.includes('/assets') ? (*/}
                                    {/*                    <img*/}
                                    {/*                        src={toAbsoluteUrl(editSectionData.main_image[DEFAULT_RESPONSIVE_IMAGE_SIZE])}*/}
                                    {/*                        alt="Main Image Preview"*/}
                                    {/*                        style={{width: '100%', marginTop: '10px'}}/>*/}
                                    {/*                )*/}
                                    {/*                :*/}
                                    {/*                editSectionData && editSectionData.main_image[DEFAULT_RESPONSIVE_IMAGE_SIZE] !== '' && (*/}
                                    {/*                    <img*/}
                                    {/*                        src={storageUrl(editSectionData.main_image[DEFAULT_RESPONSIVE_IMAGE_SIZE])}*/}
                                    {/*                        alt="Main Image Preview"*/}
                                    {/*                        style={{width: '100%', marginTop: '10px'}}/>*/}
                                    {/*                )*/}
                                    {/*        )}*/}

                                    {/*        <div className="mt-1 text-danger">*/}
                                    {/*            <ErrorMessage name="main_image" component="div"/>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    {/*<div className="col-4">*/}
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

                                    <div className="col-4">
                                        <div className="mb-7">
                                            <WickFormLabel text="Carousel Speed" isRequired={false}/>
                                            <Field
                                                className="form-control fs-base"
                                                type="number"
                                                placeholder="Enter the speed of the carousel"
                                                name="carousel_speed"
                                                step={500}
                                            />
                                            <div className="mt-1 text-danger">
                                                <ErrorMessage name="carousel_speed" component="div"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-7">
                                            <WickFormLabel text="Title Text Color" isRequired={false}/>
                                            <WickColorPicker
                                                value={formik.getFieldProps('title_text_color').value}
                                                onChange={(color) => formik.setFieldValue('title_text_color', color)}
                                            />
                                            <div className="mt-1 text-danger">
                                                <ErrorMessage name="title_text_color" component="div"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-7">
                                            <WickFormLabel text="Subtitle Text Color" isRequired={false}/>
                                            <WickColorPicker
                                                value={formik.getFieldProps('subtitle_text_color').value}
                                                onChange={(color) => formik.setFieldValue('subtitle_text_color', color)}
                                            />
                                            <div className="mt-1 text-danger">
                                                <ErrorMessage name="subtitle_text_color" component="div"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="d-flex flex-stack my-5">
                                            <div className="me-5">
                                                <label className="fs-6 fw-semibold">Hide this item from the public
                                                                                    website</label>

                                            </div>
                                            <WickSwitch
                                                name="hide"
                                                onChangeHandler={(e) => {
                                                    e.stopPropagation();
                                                    formik.setFieldValue('hide', formik.values.hide ? 0 : 1);
                                                }}
                                                defaultValue={Boolean(formik.values.hide)}
                                            />
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

export default HeroSection;
