import React, {useCallback, useEffect, useState} from 'react'
import {KTCard, KTCardBody} from "../../../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import FormErrors from "../../../../../../components/forms/FormErrors.tsx";
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import WickFormLabel from "../../../../../../components/forms/WickFormLabel.tsx";
import WickFormFooter from "../../../../../../components/forms/WickFormFooter.tsx";
import {genericOnChangeHandler} from "../../../../../../helpers/form.ts";
import {
    defaultPromotionalStripSectionFormFields,
    PromotionalStripSectionFormFields,
    sectionSchema
} from "../../core/form.ts";
import {submitRequest} from "../../../../../../helpers/requests.ts";
import {useWickApp} from "../../../../../../modules/general/WickApp.loader.ts";
import {AlertMessageGenerator} from "../../../../../../helpers/AlertMessageGenerator.ts";
import {Actions, WickToastType} from "../../../../../../helpers/variables.ts";
import {TagsInput} from "react-tag-input-component";
import {SectionTypeEnum} from "../../../../../../enum/SectionTypeEnum.ts";
import {usePageEdit} from "../../core/PageEditContext.loader.tsx";
import {storeSectionDatum} from "../../../../../../requests/content/site/SectionData.ts";
import {storageUrl} from "../../../../../../helpers/general.ts";

interface Props {
    pageId: number;
    sectionId: number;
}

const PromotionalStripSection = ({pageId, sectionId}: Props) => {
    const {getSectionDatum, page} = usePageEdit();
    const wickApp = useWickApp();

    const [form, setForm] = useState<PromotionalStripSectionFormFields>(defaultPromotionalStripSectionFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([])
    const [selected, setSelected] = useState<never[] | string[]>([])
    const [iconPreview, setIconPreview] = useState<string | null>(null);

    const onChangeHandler = (e: any) => {
        genericOnChangeHandler(e, form, setForm);
    }

    const handleStore = useCallback((values: PromotionalStripSectionFormFields, fns: any) => {
        submitRequest(
            storeSectionDatum,
            [pageId, sectionId, {...values, type: SectionTypeEnum.PROMOTIONAL_STRIP}],
            () => {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('promotional strip section settings', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS,
                });
                setFormErrors([]);
            },
            setFormErrors,
            fns
        );
    }, [wickApp, pageId, sectionId]);
    // const handleStore = (e: any, fns: any) => {
    //     console.log(form)
    //     submitRequest(
    //         storeSectionDatum,
    //         [pageId, sectionId, {...form, type: SectionTypeEnum.PROMOTIONAL_STRIP}],
    //         () => {
    //             wickApp.setAlert({
    //                 message: new AlertMessageGenerator('promotional strip section settings', Actions.EDIT, WickToastType.SUCCESS).message,
    //                 type: WickToastType.SUCCESS,
    //             });
    //             setFormErrors([]);
    //         },
    //         setFormErrors,
    //         fns
    //     );
    // }

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

    useEffect(() => {
        setSelected(form.tags)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const data = getSectionDatum(sectionId)

        if (data && data.tags) {
            const tags: string[] = data.tags.split(', ')

            setSelected(tags)
            setForm({...form, tags: tags, icon: data.icon})
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionId, page]);

    return (
        <>
            <KTCard className="mb-8">
                <KTCardHeader text="Claims Block"/>

                <KTCardBody>
                    <FormErrors errorMessages={formErrors}/>

                    <Formik
                        initialValues={form}
                        validationSchema={sectionSchema({isStrip: true})}
                        onSubmit={handleStore}
                        enableReinitialize
                    >
                        {(formik) => (
                            <Form placeholder={undefined}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className='mb-7'>
                                            <WickFormLabel text='Tags' isRequired={false}/>

                                            <TagsInput
                                                value={selected}
                                                onChange={(tags) => {
                                                    setForm({...form, tags: tags})
                                                }}
                                                name="tags"
                                                placeHolder="Enter a tag"
                                            />

                                            <div className='mt-1 text-danger'>
                                                {formik.errors?.tags ? formik.errors?.tags : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <WickFormLabel text="Icon" isRequired={false}/>
                                            <Field
                                                className="form-control fs-base"
                                                type="file"
                                                name="icon"
                                                accept=".svg"
                                                value={undefined}
                                                onChange={(e: React.FormEvent) => handleFile(e, formik, 'icon')}
                                            />

                                            {iconPreview ? (
                                                <div style={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
                                                    <img src={iconPreview} alt="Icon Preview"
                                                         style={{width: '50px', marginRight: '10px'}}/>
                                                    <span
                                                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                                                        onClick={() => {
                                                            formik.setFieldValue('icon', null);  // Clear the form field value
                                                            setIconPreview(null); // Reset iconPreview state if you're using a state variable
                                                            setForm({...form, icon: ''})
                                                        }}
                                                    >
                                                            <i className="ki-duotone ki-cross fs-2">
                                                                <span className="path1"></span>
                                                                <span className="path2"></span>
                                                            </i>
                                                    </span>
                                                </div>
                                            ) : (
                                                form.icon !== '' && (
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'start',
                                                        marginTop: '10px'
                                                    }}>
                                                        <img src={storageUrl(form.icon as string)} alt="Icon Preview"
                                                             style={{width: '50px', marginRight: '10px'}}/>
                                                        <span
                                                            className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                                                            onClick={() => {
                                                                formik.setFieldValue('icon', null);  // Clear the form field value
                                                                setIconPreview(null); // Reset iconPreview state if you're using a state variable
                                                                setForm({...form, icon: ''})

                                                            }}
                                                        >
                                                            <i className="ki-duotone ki-cross fs-2">
                                                                <span className="path1"></span>
                                                                <span className="path2"></span>
                                                            </i>
                                                        </span>
                                                    </div>
                                                )
                                            )}

                                            <div className="text-muted fs-7 mt-1">
                                                Please note: only SVG files are accepted.
                                            </div>

                                            <div className="mt-1 text-danger">
                                                <ErrorMessage name="icon" component="div"/>
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

export default PromotionalStripSection;
