import {ErrorMessage, Field, Form, Formik, FormikProps} from 'formik';
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
import {claimSchema, defaultFormFields, FormFields} from "../core/form.ts";
import {submitRequest} from "../../../../helpers/requests.ts";
import {storeClaim} from "../../../../requests/commerce/Claim.ts";
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator.ts";
import WickFormLabel from "../../../../components/forms/WickFormLabel.tsx";
import {useMain} from "../../../shared/MainContext.loader.tsx";


const ClaimCreate: React.FC = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {options} = useMain()

    const {languages} = options

    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_CLAIMS, PageTypes.CREATE))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFile = (e: any, formik: FormikProps<any>, key: string) => {
        const file = e.target.files[0]

        formik.setFieldValue(key, file)
    };

    const handleCreate = (values: FormFields) => {
        submitRequest(storeClaim, [values], () => {
            wickApp.setAlert({
                message: new AlertMessageGenerator('claim', Actions.CREATE, WickToastType.SUCCESS).message,
                type: WickToastType.SUCCESS
            })

            navigate(`/commerce/claims`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Claim"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={defaultFormFields} validationSchema={claimSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form placeholder={undefined}>
                                <div className="row">
                                    <div className="col-6">
                                        {languages.map((language) => (
                                            <div className="col-12" key={`claim-language-${language.id}`}>
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
                                    {/*<div className="col-6">*/}
                                    {/*    {languages.map((language) => (*/}
                                    {/*        <div className="col-12" key={`claim-language-${language.id}`}>*/}
                                    {/*            <div className="mb-3">*/}
                                    {/*                <WickFormLabel text={`Icon`} isRequired={false}/>*/}
                                    {/*                <Field className="form-control fs-base" type="file"*/}
                                    {/*                       name={`icon.${language.id}`}*/}
                                    {/*                       value={undefined}*/}
                                    {/*                       onChange={(e: React.FormEvent) => handleFile(e, formik, `icon.${language.id}`)}/>*/}
                                    {/*                <div className="mt-1 text-danger">*/}
                                    {/*                    <ErrorMessage name={`icon.${language.id}`} component="div"/>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    ))}*/}
                                    {/*</div>*/}
                                </div>

                                <WickFormFooter cancelUrl={'/commerce/claims'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default ClaimCreate;
