import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import WickFormFooter from '../../../../components/forms/WickFormFooter.tsx';
import WickFormLabel from '../../../../components/forms/WickFormLabel.tsx';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {Highlight} from '../../../../models/commerce/Highlight.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {getHighlight, updateHighlight} from '../../../../requests/commerce/Highlight.ts';
import {defaultFormFields, FormFields, highlightSchema} from "../core/form.ts";
import {useMain} from "../../../shared/MainContext.loader.tsx";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";


const HighlightEdit: React.FC = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {id} = useParams();
    const {options} = useMain()

    const {languages} = options

    const [highlight, setHighlight] = useState<Highlight | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            submitRequest(getHighlight, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    setHighlight(response);
                    setForm(response)
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (highlight) {
            wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_HIGHLIGHT, PageTypes.EDIT, highlight.name[DEFAULT_LANGUAGE]))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [highlight]);

    const handleEdit = (values: FormFields) => {
        if (highlight) {
            submitRequest(updateHighlight, [highlight.id, values], () => {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('highlight', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                })

                navigate(`/commerce/highlights`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Highlight"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={highlightSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        () => (
                            <Form placeholder={undefined}>
                                <div className="row">
                                    {languages.map((language) => (
                                        <div className="col-12" key={`highlight-language-${language.id}`}>
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

                                <WickFormFooter cancelUrl={'/commerce/highlights'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default HighlightEdit;
