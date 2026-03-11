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
import {Tag} from '../../../../models/commerce/Tag.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {getTag, updateTag} from '../../../../requests/commerce/Tag.ts';
import {defaultFormFields, FormFields, tagSchema} from "../core/form.ts";
import {useMain} from "../../../shared/MainContext.loader.tsx";


const TagEdit: React.FC = () => {
    const {id} = useParams();
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {options} = useMain()

    const {languages} = options

    const [tag, setTag] = useState<Tag | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            submitRequest(getTag, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    setTag(response);
                    setForm(response)
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (tag) {
            wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_TAGS, PageTypes.EDIT, tag.name.en))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tag]);

    const handleEdit = (values: FormFields) => {
        if (tag) {
            submitRequest(updateTag, [tag.id, values], () => {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('tag', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                })

                navigate(`/commerce/tags`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Tag"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={tagSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        () => (
                            <Form placeholder={undefined}>
                                <div className="mb-7">
                                    <div className="row">
                                        {languages.map((language) => (
                                            <div className="col-4" key={`tag-${language.id}`}>
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
                                </div>

                                <WickFormFooter cancelUrl={'/commerce/tags'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default TagEdit;
