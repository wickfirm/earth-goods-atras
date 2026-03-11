import React, {useCallback, useEffect, useState} from 'react'
import {useWickApp} from "../../../../../../modules/general/WickApp.loader.ts";
import {
    defaultReassuranceStripSectionFormFields,
    ReassuranceStripSectionFormFields,
    sectionSchema
} from "../../core/form.ts";
import {SectionData} from "../../../../../../models/content/Site.ts";
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import {submitRequest} from "../../../../../../helpers/requests.ts";
import {AlertMessageGenerator} from "../../../../../../helpers/AlertMessageGenerator.ts";
import {Actions, WickToastType} from "../../../../../../helpers/variables.ts";
import {KTCard, KTCardBody, toAbsoluteUrl} from "../../../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import WickTableWithData from "../../../../../../components/tables/WickTableWithData.tsx";
import {ReassuranceStripTableColumns} from "../../core/ReassuranceStripTableColumns.tsx";
import FormErrors from "../../../../../../components/forms/FormErrors.tsx";
import WickFormLabel from "../../../../../../components/forms/WickFormLabel.tsx";
import WickFormFooter from "../../../../../../components/forms/WickFormFooter.tsx";
import WickAlert from "../../../../../../components/alerts/WickAlert.tsx";
import {usePageEdit} from "../../core/PageEditContext.loader.tsx";
import {storeSectionDatum, updateSectionDatum} from "../../../../../../requests/content/site/SectionData.ts";
import {SectionTypeEnum} from "../../../../../../enum/SectionTypeEnum.ts";
import {Language} from "../../../../../../models/Options.ts";
import {DEFAULT_LANGUAGE} from "../../../../../../helpers/settings.ts";
import {useMain} from "../../../../../shared/MainContext.loader.tsx";
import {storageUrl} from "../../../../../../helpers/general.ts";
import * as Yup from "yup";

const MAXIMUM_BLOCKS = 3;

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

interface ReassuranceStripProps {
    pageId: number;
    sectionId: number;
    onlyForm?: boolean;
    editSectionData?: SectionData;
}

const ReassuranceStripSection = ({pageId, sectionId, onlyForm, editSectionData}: ReassuranceStripProps) => {
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

    const handleStore = useCallback((values: ReassuranceStripSectionFormFields, fns: any) => {
        if (editSectionData) {
            submitRequest(
                updateSectionDatum,
                [pageId, sectionId, editSectionData.id, {...values, type: SectionTypeEnum.REASSURANCE_STRIP}],
                () => {
                    wickApp.setAlert({
                        message: new AlertMessageGenerator('reassurance strip section settings', Actions.EDIT, WickToastType.SUCCESS).message,
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
                [pageId, sectionId, {...values, type: SectionTypeEnum.REASSURANCE_STRIP}],
                () => {
                    wickApp.setAlert({
                        message: new AlertMessageGenerator('reassurance strip section settings', Actions.EDIT, WickToastType.SUCCESS).message,
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
                        <KTCardHeader text="Reassurance Strip Block"/>

                        <KTCardBody>
                            <WickTableWithData data={data} columnsArray={ReassuranceStripTableColumns}/>
                        </KTCardBody>
                    </KTCard>
                )
            }

            <KTCard className="mb-8">
                {/*<KTCardHeader text="Reassurance Strip Blocks Settings"/>*/}

                <KTCardBody>
                    <FormErrors errorMessages={formErrors}/>

                    {
                        data.length >= MAXIMUM_BLOCKS && !editSectionData && (
                            <WickAlert
                                icon='fa-warning'
                                color='warning'
                                message={
                                    'This form is disabled because three blocks have already been entered, which is the maximum allowed.'
                                }
                            />
                        )
                    }

                    <Formik
                        initialValues={editSectionData ?? defaultReassuranceStripSectionFormFields}
                        validationSchema={onlyForm ? Yup.object().shape({
                            title: Yup.object().shape({
                                en: Yup.string().required('title in English is required'),
                                // ar: Yup.string().notRequired(),
                                // fr: Yup.string().notRequired(),
                            }),
                            description: Yup.object().shape({
                                en: Yup.string().required('description in English is required'),
                                // ar: Yup.string().notRequired(),
                                // fr: Yup.string().notRequired(),
                            }),
                        }) : sectionSchema({isReassuranceStrip: true})}
                        onSubmit={handleStore}
                        enableReinitialize
                    >
                        {(formik) => (
                            <Form placeholder={undefined}
                                  className={`${data.length >= MAXIMUM_BLOCKS && !editSectionData ? 'opacity-50 pointer-events-none' : ''}`}>

                                <div className="row">
                                    <LanguageFields field="title" placeholder="Title" isRequired={true}
                                                    languages={languages}/>
                                </div>

                                <div className="row">
                                    <LanguageFields field="description" placeholder="Description" isRequired={true}
                                                    languages={languages}/>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <WickFormLabel text="Icon" isRequired={true}/>
                                            <Field className="form-control fs-base" type="file"
                                                   name="icon"
                                                   value={undefined}
                                                   onChange={(e: React.FormEvent) => handleFile(e, formik, 'icon')}/>

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
                                                            <img src={toAbsoluteUrl(editSectionData.icon as string)}
                                                                 alt="Icon Preview"
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

                                <WickFormFooter/>
                            </Form>
                        )}
                    </Formik>
                </KTCardBody>
            </KTCard>
        </>
    )
}

export default ReassuranceStripSection;
