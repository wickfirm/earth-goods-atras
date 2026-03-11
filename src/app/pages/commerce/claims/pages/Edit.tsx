import {ErrorMessage, Field, Form, Formik, FormikProps} from 'formik';
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
import {Claim} from '../../../../models/commerce/Claim.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {getClaim, updateClaim} from '../../../../requests/commerce/Claim.ts';
import {claimSchema, defaultFormFields, FormFields} from "../core/form.ts";
import {useMain} from "../../../shared/MainContext.loader.tsx";
import {APP_URL, isValidLanguageKey} from "../../../../helpers/general.ts";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";


const ClaimEdit: React.FC = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {id} = useParams();
    const {options} = useMain()

    const {languages} = options

    const [claim, setClaim] = useState<Claim | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            submitRequest(getClaim, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    setClaim(response);
                    setForm(response)
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (claim) {
            wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_CLAIMS, PageTypes.EDIT, claim.name[DEFAULT_LANGUAGE]))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [claim]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<any>, key: string) => {
        const file = e.target.files?.[0]

        formik.setFieldValue(key, file)
    };
    const handleEdit = (values: FormFields) => {
        if (claim) {
            submitRequest(updateClaim, [claim.id, values], () => {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('claim', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                })

                navigate(`/commerce/claims`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Claim"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={claimSchema} onSubmit={handleEdit}
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
                                    {/*                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e, formik, `icon.${language.id}`)}/>*/}

                                    {/*                <div className="mt-3">*/}
                                    {/*                    {*/}
                                    {/*                        isValidLanguageKey(language.id) && claim?.icon?.[language.id] && (*/}
                                    {/*                            <img*/}
                                    {/*                                src={APP_URL + claim?.icon[language.id]}*/}
                                    {/*                                className="w-25"*/}
                                    {/*                                alt={`${claim?.name} icon`}*/}
                                    {/*                            />*/}
                                    {/*                        )*/}
                                    {/*                    }*/}
                                    {/*                </div>*/}

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

export default ClaimEdit;
