import React, {useCallback, useEffect, useState} from 'react'
import {KTCard, KTCardBody} from "../../../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import FormErrors from "../../../../../../components/forms/FormErrors.tsx";
import {ErrorMessage, Field, Form, Formik} from "formik";
import WickFormLabel from "../../../../../../components/forms/WickFormLabel.tsx";
import WickFormFooter from "../../../../../../components/forms/WickFormFooter.tsx";
import {SectionFormFields, sectionSchema} from "../../core/form.ts";
import {submitRequest} from "../../../../../../helpers/requests.ts";
import {useWickApp} from "../../../../../../modules/general/WickApp.loader.ts";
import {AlertMessageGenerator} from "../../../../../../helpers/AlertMessageGenerator.ts";
import {Actions, WickToastType} from "../../../../../../helpers/variables.ts";
import {SectionTypeEnum} from "../../../../../../enum/SectionTypeEnum.ts";
import {usePageEdit} from "../../core/PageEditContext.loader.tsx";
import {storeSectionDatum} from "../../../../../../requests/content/site/SectionData.ts";
import {useMain} from "../../../../../shared/MainContext.loader.tsx";
import {DEFAULT_LANGUAGE} from "../../../../../../helpers/settings.ts";
import {Language} from "../../../../../../models/Options.ts";
import {defaultSectionDatum, SectionData} from "../../../../../../models/content/Site.ts";
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

interface RecipesProps {
    pageId: number;
    sectionId: number;
}

const RecipesSection = ({pageId, sectionId}: RecipesProps) => {
    const {getSectionDatum, page} = usePageEdit();
    const wickApp = useWickApp();
    const {options} = useMain()
    const {languages} = options

    const [formErrors, setFormErrors] = useState<string[]>([])
    const [data, setData] = useState<SectionData>(defaultSectionDatum);

    const handleStore = useCallback((values: SectionFormFields, fns: any) => {
        submitRequest(
            storeSectionDatum,
            [pageId, sectionId, {...values, type: SectionTypeEnum.RECIPES}],
            () => {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('recipes section settings', Actions.EDIT, WickToastType.SUCCESS).message,
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
                <KTCardHeader text="Recipes Settings"/>

                <KTCardBody>
                    <FormErrors errorMessages={formErrors}/>

                    <Formik
                        initialValues={data}
                        validationSchema={sectionSchema({})}
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
                                    <LanguageFields field="cta_text" placeholder="CTA Text" isRequired={false}
                                                    languages={languages}/>
                                </div>

                                <div className="row">
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

                                    <div className="col-6">
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
    )
}

export default RecipesSection;
