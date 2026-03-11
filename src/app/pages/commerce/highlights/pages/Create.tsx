import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import WickFormFooter from '../../../../components/forms/WickFormFooter.tsx';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import FormErrors from "../../../../components/forms/FormErrors.tsx";
import {defaultFormFields, FormFields, highlightSchema} from "../core/form.ts";
import {submitRequest} from "../../../../helpers/requests.ts";
import {storeHighlight} from "../../../../requests/commerce/Highlight.ts";
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator.ts";
import WickFormLabel from "../../../../components/forms/WickFormLabel.tsx";
import {useMain} from "../../../shared/MainContext.loader.tsx";


const HighlightCreate: React.FC = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {options} = useMain()

    const {languages} = options

    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_HIGHLIGHT, PageTypes.CREATE))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = (values: FormFields) => {
        submitRequest(storeHighlight, [values], () => {
            wickApp.setAlert({
                message: new AlertMessageGenerator('highlight', Actions.CREATE, WickToastType.SUCCESS).message,
                type: WickToastType.SUCCESS
            })

            navigate(`/commerce/highlights`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Highlight"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={defaultFormFields} validationSchema={highlightSchema} onSubmit={handleCreate}
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

export default HighlightCreate;
