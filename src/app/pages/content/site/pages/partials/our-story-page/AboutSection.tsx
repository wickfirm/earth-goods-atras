import React, {useCallback, useEffect, useState} from 'react'
import {KTCard, KTCardBody} from "../../../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import FormErrors from "../../../../../../components/forms/FormErrors.tsx";
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import WickFormLabel from "../../../../../../components/forms/WickFormLabel.tsx";
import WickFormFooter from "../../../../../../components/forms/WickFormFooter.tsx";
import {OurStoryAboutSectionFormFields, ourStorySectionSchema} from "../../core/form.ts";
import {submitRequest} from "../../../../../../helpers/requests.ts";
import {useWickApp} from "../../../../../../modules/general/WickApp.loader.ts";
import {AlertMessageGenerator} from "../../../../../../helpers/AlertMessageGenerator.ts";
import {Actions, WickToastType} from "../../../../../../helpers/variables.ts";
import {Editor} from "primereact/editor";
import {FormControl} from "react-bootstrap";
import {SectionTypeEnum} from "../../../../../../enum/SectionTypeEnum.ts";
import {usePageEdit} from "../../core/PageEditContext.loader.tsx";
import {storeSectionDatum} from '../../../../../../requests/content/site/SectionData.ts';
import {useMain} from "../../../../../shared/MainContext.loader.tsx";
import {DEFAULT_LANGUAGE, DEFAULT_RESPONSIVE_IMAGE_SIZE} from "../../../../../../helpers/settings.ts";
import {storageUrl} from "../../../../../../helpers/general.ts";
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

interface AttributeRow {
    claim: string | File;
}

const AboutSection = ({pageId, sectionId}: StoryProps) => {
    const {getSectionDatum, page} = usePageEdit();
    const wickApp = useWickApp();
    const {options} = useMain()
    const {languages} = options

    const [formErrors, setFormErrors] = useState<string[]>([])
    const [data, setData] = useState<SectionData>(defaultSectionDatum);

    const [rows, setRows] = useState<AttributeRow[]>([{claim: ''}]);
    const [removedRows, setRemovedRows] = useState<string[]>(['']);
    const [files, setFiles] = useState<(File | null)[]>(Array(rows.length).fill(null));

    const handleAddRow = () => {
        setRows((prevRows) => [...prevRows, {claim: ''}]);
    };

    const handleRemoveRow = (index: number) => {
        setRemovedRows([...removedRows, rows[index].claim as string]);

        if (rows.length === 1) {
            setRows([{claim: ''}]);
            setFiles([null]); // Reset file input
        } else {
            const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
            const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
            setRows(updatedRows);
            setFiles(updatedFiles);
        }
    };

    const handleClaimChange = (e: any, index: number) => {
        const file = e.target.files[0]

        const newRows = [...rows];

        if (file) {
            newRows[index].claim = file ?? null;

            const updatedFiles = [...files];
            updatedFiles[index] = file;
            setFiles(updatedFiles);
        }

        setRows(newRows);
    };

    const handleFile = useCallback((e: any, formik: FormikProps<any>, key: string) => {
        const file = e.target.files[0]
        if (file) {
            formik.setFieldValue(key, file);
        }
    }, []);

    const handleStore = useCallback((values: OurStoryAboutSectionFormFields, fns: any) => {
        submitRequest(
            storeSectionDatum,
            [pageId, sectionId, {...values, type: SectionTypeEnum.STORY, claims: rows, removedClaims: removedRows}],
            (res) => {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('hero section settings', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS,
                });
                setFormErrors([]);
                if (res.tags) {
                    const tags = res.tags.split(', ').map((tag: string) => ({claim: tag}));

                    setRows(tags)
                }
            },
            setFormErrors,
            fns
        );
    }, [wickApp, pageId, sectionId, rows]);

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
                description: {
                    en: sectionDatum.description?.en || '',
                    ar: sectionDatum.description?.ar || '',
                    fr: sectionDatum.description?.fr || '',
                },
            }

            setData(datum)

            if (sectionDatum.tags) {
                const tags = sectionDatum.tags.split(', ').map(tag => ({claim: tag}));

                setRows(tags)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionId, getSectionDatum, page]);

    return (
        <>
            <KTCard className="mb-8">
                <KTCardHeader text="About Settings"/>

                <KTCardBody>
                    <FormErrors errorMessages={formErrors}/>

                    <Formik
                        initialValues={data}
                        validationSchema={ourStorySectionSchema({
                            mainImage: !!data.main_image
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
                                    <div className="col-12">
                                        {languages.map((language) => (
                                            <div className="col-12" key={`ps-description-language-${language.id}`}>
                                                <div className="mb-3">
                                                    <WickFormLabel text={`Description`}
                                                                   isRequired={true}/>

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
                                                        <ErrorMessage name={`description.${language.id}`}
                                                                      component="div"/>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className='mb-7'>
                                            <WickFormLabel text='Main Image' isRequired={true}/>

                                            <Field className="form-control fs-base" type="file"
                                                   name="main_image"
                                                   value={undefined}
                                                   onChange={(e: React.FormEvent) => handleFile(e, formik, 'main_image')}/>

                                            <div className="mt-3">
                                                {
                                                    data.main_image &&
                                                    <img
                                                        src={storageUrl((data.main_image[DEFAULT_RESPONSIVE_IMAGE_SIZE] as string))}
                                                        className="w-25"
                                                        alt={`Main Image`}/>
                                                }
                                            </div>

                                            <div className='mt-1 text-danger'>
                                                {/*{formik.errors?.main_image ? formik.errors?.main_image : null}*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <WickFormLabel text={`Claims`}
                                                       isRequired={true}/>


                                        <div className="mb-7">
                                            {rows.map((row, index) => (
                                                <div key={index} className="row form-group mb-2">
                                                    <div className="col-10">
                                                        <Field className="form-control fs-base mb-2" type="file"
                                                               name={`attributes[${index}].claim`}
                                                               value={undefined}
                                                               onChange={(e: React.FormEvent) => handleClaimChange(e, index)}
                                                               disabled={row && row.claim && typeof row.claim === 'string'}
                                                        />
                                                        {files[index] &&
                                                            <p className="mt-1 text-muted">{files[index]?.name}</p>}

                                                        <div className="mt-1">
                                                            {
                                                                row && row.claim && typeof row.claim === 'string' &&
                                                                <img
                                                                    src={storageUrl((row.claim as string))}
                                                                    className="w-25"
                                                                    alt={`Main Image`}/>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <button
                                                            type="button"
                                                            className="btn btn-icon btn-sm btn-active-light-danger"
                                                            onClick={() => handleRemoveRow(index)}
                                                        >
                                                            <i className="fa fa-trash fs-5 text-danger"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}

                                            <button type="button" className="btn btn-light-primary btn-sm"
                                                    onClick={handleAddRow}>
                                                <i
                                                    className="ki-duotone ki-plus fs-2"></i> Add Claim
                                            </button>

                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        {languages.map((language) => (
                                            <div className="col-12" key={`ps-content-language-${language.id}`}>
                                                <div className="mb-3">
                                                    <WickFormLabel text={`Content`}
                                                                   isRequired={language.id === DEFAULT_LANGUAGE ?? false}/>

                                                    <Editor
                                                        value={formik.getFieldProps('content').value[language.id] ?? ''}
                                                        onTextChange={(e) => {
                                                            if (formik.getFieldProps('content').value[language.id] !== e.htmlValue) {
                                                                const attr = `content.${language.id}`

                                                                formik.setFieldValue(attr, e.htmlValue)
                                                            }
                                                        }}
                                                        style={{height: '200px'}}
                                                        className="mb-2"/>

                                                    <div className="mt-1 text-danger">
                                                        <ErrorMessage name={`content.${language.id}`} component="div"/>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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

export default AboutSection;
