import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import WickFormFooter from '../../../../components/forms/WickFormFooter.tsx';
import WickFormLabel from '../../../../components/forms/WickFormLabel.tsx';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericOnChangeHandler} from '../../../../helpers/form';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {storePermission} from '../../../../requests/iam/Permission';
import FormErrors from "../../../../components/forms/FormErrors.tsx";
import {defaultFormFields, FormFields, permissionSchema} from "../core/form.ts";


const PermissionCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.IAM_PERMISSIONS, PageTypes.CREATE))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: React.FormEvent<HTMLFormElement>) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const navigate = useNavigate();

    const handleCreate = () => {
        // send API request to create the permission
        submitRequest(storePermission, [form], () => {
            // it's permission for sure
            wickApp.setAlert({
                message: new AlertMessageGenerator('permission', Actions.CREATE, WickToastType.SUCCESS).message,
                type: WickToastType.SUCCESS
            })

            navigate(`/iam/permissions`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Permission"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={permissionSchema} onSubmit={handleCreate}
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

export default PermissionCreate;
