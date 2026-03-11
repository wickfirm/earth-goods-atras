import React, {useCallback, useEffect, useState} from 'react'
import {KTCard, KTCardBody} from "../../../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import FormErrors from "../../../../../../components/forms/FormErrors.tsx";
import {ErrorMessage, Field, Form, Formik} from "formik";
import WickFormLabel from "../../../../../../components/forms/WickFormLabel.tsx";
import WickFormFooter from "../../../../../../components/forms/WickFormFooter.tsx";
import {OurStoryHeroSectionFormFields, OurStoryMapSectionFormFields, ourStorySectionSchema} from "../../core/form.ts";
import {submitRequest} from "../../../../../../helpers/requests.ts";
import {useWickApp} from "../../../../../../modules/general/WickApp.loader.ts";
import {AlertMessageGenerator} from "../../../../../../helpers/AlertMessageGenerator.ts";
import {Actions, WickToastType} from "../../../../../../helpers/variables.ts";
import {SectionTypeEnum} from "../../../../../../enum/SectionTypeEnum.ts";
import {usePageEdit} from "../../core/PageEditContext.loader.tsx";
import {storeSectionDatum} from '../../../../../../requests/content/site/SectionData.ts';
import {useMain} from "../../../../../shared/MainContext.loader.tsx";
import {DEFAULT_LANGUAGE} from "../../../../../../helpers/settings.ts";
import {Language} from "../../../../../../models/Options.ts";
import {defaultSectionDatum, SectionData} from "../../../../../../models/content/Site.ts";

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

interface StoryProps {
    pageId: number;
    sectionId: number;
}

const MapSection = ({pageId, sectionId}: StoryProps) => {
    const {getSectionDatum, page} = usePageEdit();
    const wickApp = useWickApp();
    const {options} = useMain()
    const {languages} = options

    const [formErrors, setFormErrors] = useState<string[]>([])
    const [data, setData] = useState<SectionData>(defaultSectionDatum);

    const handleStore = useCallback((values: OurStoryMapSectionFormFields, fns: any) => {
        submitRequest(
            storeSectionDatum,
            [pageId, sectionId, {...values, type: SectionTypeEnum.MAP}],
            () => {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('map section settings', Actions.EDIT, WickToastType.SUCCESS).message,
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
            }

            setData(datum)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionId, getSectionDatum, page]);

    return (
        <>
            <KTCard className="mb-8">
                <KTCardHeader text="Map Settings"/>

                <KTCardBody>
                    <FormErrors errorMessages={formErrors}/>

                    <Formik
                        initialValues={data}
                        validationSchema={ourStorySectionSchema({})}
                        onSubmit={handleStore}
                        enableReinitialize
                    >
                        {() => (
                            <Form placeholder={undefined}>
                                <div className="row">
                                    <LanguageFields field="title" placeholder="Title" isRequired={true}
                                                    languages={languages}/>
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

export default MapSection;
