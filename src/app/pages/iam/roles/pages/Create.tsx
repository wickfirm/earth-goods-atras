import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import Select, {MultiValue} from 'react-select';
import {useNavigate} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import WickFormFooter from '../../../../components/forms/WickFormFooter.tsx';
import WickFormLabel from '../../../../components/forms/WickFormLabel.tsx';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {storeRole} from '../../../../requests/iam/Role';
import FormErrors from "../../../../components/forms/FormErrors.tsx";
import {defaultFormFields, FormFields, roleSchema} from "../core/form.ts";
import {Permission} from "../../../../models/iam/Permission.ts";
import {getAllPermissions} from "../../../../requests/iam/Permission.ts";


const RoleCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);

    const wickApp = useWickApp();
    const navigate = useNavigate();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.IAM_ROLES, PageTypes.CREATE))

        // get the permissions so we can edit the role's permissions
        submitRequest(getAllPermissions, [], (response) => {
            // if we were able to get the list of permissions, then we fill our state with them
            setPermissions(response);
        }, setFormErrors);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: React.FormEvent<HTMLFormElement>) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const multiSelectChangeHandler = (e: MultiValue<Permission>) => {
        genericMultiSelectOnChangeHandler(e, undefined, form, setForm, 'permission_ids');
    };

    const handleCreate = () => {
        // send API request to create the role
        submitRequest(storeRole, [form], () => {
            // it's role for sure
            wickApp.setAlert({
                message: new AlertMessageGenerator('role', Actions.CREATE, WickToastType.SUCCESS).message,
                type: WickToastType.SUCCESS
            })

            navigate(`/iam/roles`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New Role"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={roleSchema} onSubmit={handleCreate} enableReinitialize>
                    {
                        () => (
                            <Form onChange={onChangeHandler} placeholder={undefined}>
                                <div className="mb-7">
                                    <WickFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter role name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <WickFormLabel text="Permissions" isRequired={true}/>

                                    <Select isMulti name="permission_ids"
                                            options={permissions}
                                            getOptionLabel={(permission) => permission.name}
                                            getOptionValue={(permission) => permission.id.toString()}
                                            onChange={multiSelectChangeHandler}
                                            placeholder="Select one or more permissions"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="permission_ids" className="mt-2"/>
                                    </div>
                                </div>

                                <WickFormFooter cancelUrl={'/iam/roles'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default RoleCreate;
