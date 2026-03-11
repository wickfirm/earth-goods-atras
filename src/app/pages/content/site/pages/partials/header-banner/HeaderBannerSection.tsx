import React, {useCallback, useEffect, useState} from 'react';
import {KTCard, KTCardBody, toAbsoluteUrl} from "../../../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import FormErrors from "../../../../../../components/forms/FormErrors.tsx";
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import WickFormLabel from "../../../../../../components/forms/WickFormLabel.tsx";
import WickFormFooter from "../../../../../../components/forms/WickFormFooter.tsx";
import {defaultHeaderBannerSectionFormFields, HeaderBannerSectionFormFields, sectionSchema} from "../../core/form.ts";
import {submitRequest} from "../../../../../../helpers/requests.ts";
import {AlertMessageGenerator} from "../../../../../../helpers/AlertMessageGenerator.ts";
import {Actions, WickToastType} from "../../../../../../helpers/variables.ts";
import {useWickApp} from "../../../../../../modules/general/WickApp.loader.ts";
import WickTableWithData from "../../../../../../components/tables/WickTableWithData.tsx";
import {SectionData} from "../../../../../../models/content/Site.ts";
import {HeaderBannerTableColumns} from "../../core/HeaderBannerTableColumns.tsx";
import {storeSectionDatum, updateSectionDatum} from "../../../../../../requests/content/site/SectionData.ts";
import {usePageEdit} from "../../core/PageEditContext.loader.tsx";
import {useMain} from "../../../../../shared/MainContext.loader.tsx";
import {SectionTypeEnum} from "../../../../../../enum/SectionTypeEnum.ts";
import {DEFAULT_LANGUAGE} from "../../../../../../helpers/settings.ts";
import WickColorPicker from "../../../../../../components/forms/WickColorPicker.tsx";
import {Language} from "../../../../../../models/Options.ts";
import {storageUrl} from "../../../../../../helpers/general.ts";
import * as Yup from "yup";

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

// Define props for the HeaderBannerSection component
interface HeaderBannerSectionProps {
    pageId: number;
    sectionId: number;
    onlyForm?: boolean;
    editSectionData?: SectionData;
}

const HeaderBannerSection: React.FC<HeaderBannerSectionProps> = ({pageId, sectionId, onlyForm, editSectionData}) => {
    const {getSectionData, page, handleRefresh} = usePageEdit();
    const wickApp = useWickApp();
    const {options} = useMain();
    const {languages} = options;

    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [data, setData] = useState<SectionData[]>([]);
    const [iconPreview, setIconPreview] = useState<string | null>(null);

    const handleFile = useCallback((e: any, formik: FormikProps<any>, key: string) => {
        const file = e.target.files[0]
        if (file) {
            formik.setFieldValue(key, file);

            // Set preview of the uploaded icon
            const reader = new FileReader();
            reader.onloadend = () => setIconPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    }, []);

    const handleStore = useCallback((values: HeaderBannerSectionFormFields, fns: any) => {
        if (editSectionData) {
            submitRequest(
                updateSectionDatum,
                [pageId, sectionId, editSectionData.id, {...values, type: SectionTypeEnum.HEADER_BANNER}],
                () => {
                    wickApp.setAlert({
                        message: new AlertMessageGenerator('top promotional strip', Actions.EDIT, WickToastType.SUCCESS).message,
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
                [pageId, sectionId, {...values, type: SectionTypeEnum.HEADER_BANNER}],
                () => {
                    wickApp.setAlert({
                        message: new AlertMessageGenerator('top promotional strip', Actions.EDIT, WickToastType.SUCCESS).message,
                        type: WickToastType.SUCCESS,
                    });
                    setFormErrors([]);
                    handleRefresh();
                    fns.resetForm(); // Reset form after successful submission
                    setIconPreview(null); // Reset icon preview
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
                        <KTCardHeader text="Top Promotional Strip"/>

                        <KTCardBody>
                            <WickTableWithData data={data} columnsArray={HeaderBannerTableColumns}/>
                        </KTCardBody>
                    </KTCard>
                )
            }

            <KTCard className="mb-8">
                {/*<KTCardHeader text="Add"/>*/}

                <KTCardBody>
                    <FormErrors errorMessages={formErrors}/>

                    <Formik
                        initialValues={editSectionData ?? defaultHeaderBannerSectionFormFields}
                        validationSchema={onlyForm ? Yup.object().shape({ title: Yup.object().shape({
                                en: Yup.string().required('title in English is required'),
                                // ar: Yup.string().notRequired(),
                                // fr: Yup.string().notRequired(),
                            })}) : sectionSchema({isHeaderBanner: true})}
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
                                    <LanguageFields field="cta_text" placeholder="CTA Text" isRequired={false}
                                                    languages={languages}/>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="mb-3">
                                            <WickFormLabel text="Icon" isRequired={false}/>
                                            <Field
                                                className="form-control fs-base"
                                                type="file"
                                                name="icon"
                                                value={undefined}
                                                onChange={(e: React.FormEvent) => handleFile(e, formik, "icon")}
                                            />

                                            {iconPreview ? (
                                                <div style={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
                                                    <img src={iconPreview} alt="Icon Preview"
                                                         style={{width: '50px', marginRight: '10px'}}/>
                                                </div>
                                            ) : (
                                                editSectionData && editSectionData.icon !== '' && editSectionData.icon.includes('/assets') ? (
                                                    <div className="bg-body-secondary" style={{
                                                        display: 'flex',
                                                        alignItems: 'start',
                                                        marginTop: '10px'
                                                    }}>
                                                        <img src={toAbsoluteUrl(editSectionData.icon as string)} alt="Icon Preview"
                                                             style={{width: '50px', marginRight: '10px'}}/>
                                                    </div>
                                                )
                                                    :
                                                    editSectionData && editSectionData.icon !== '' && (
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'start',
                                                            marginTop: '10px'
                                                        }}>
                                                            <img src={storageUrl(editSectionData.icon as string)}
                                                                 alt="Icon Preview"
                                                                 style={{width: '50px', marginRight: '10px'}}/>
                                                        </div>
                                                    )
                                            )}

                                            <div className="mt-1 text-danger">
                                                <ErrorMessage name="icon" component="div"/>
                                            </div>
                                        </div>
                                    </div>

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

                                <WickFormFooter/>
                            </Form>
                        )}
                    </Formik>
                </KTCardBody>
            </KTCard>
        </>
    );
};

export default HeaderBannerSection;
