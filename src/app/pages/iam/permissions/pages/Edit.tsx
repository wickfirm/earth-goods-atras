import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import * as Yup from 'yup';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import WickFormFooter from '../../../../components/forms/WickFormFooter.tsx';
import WickFormLabel from '../../../../components/forms/WickFormLabel.tsx';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericOnChangeHandler} from '../../../../helpers/form';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {Permission} from '../../../../models/iam/Permission';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {getPermission, updatePermission} from '../../../../requests/iam/Permission';
import {defaultFormFields, FormFields} from "../core/form.ts";


const PermissionEdit: React.FC = () => {
    const [permission, setPermission] = useState<Permission | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const wickApp = useWickApp();

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the permission we need to edit from the database
            submitRequest(getPermission, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current permission to edit
                    setPermission(response);
                    setForm(response)
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (permission) {
            wickApp.setPageTitle(generatePageTitle(Sections.IAM_PERMISSIONS, PageTypes.EDIT, permission.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [permission]);

    const EditPermissionSchema = Yup.object().shape({
        name: Yup.string().required()
    });

    const onChangeHandler = (e: React.FormEvent<HTMLFormElement>) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        // we need to update the permission's data by doing API call with form
        if (permission) {
            submitRequest(updatePermission, [permission.id, form], () => {
                // we got the updated permission so we're good
                wickApp.setAlert({
                    message: new AlertMessageGenerator('permission', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                })

                navigate(`/iam/permissions`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Permission"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={EditPermissionSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        () => (
                            <Form onChange={onChangeHandler} placeholder={undefined}>
                                <div className="mb-7">
                                    <WickFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter permission name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <WickFormFooter cancelUrl={'/iam/permissions'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default PermissionEdit;
