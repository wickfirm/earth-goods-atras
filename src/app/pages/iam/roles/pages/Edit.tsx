import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import WickFormFooter from '../../../../components/forms/WickFormFooter.tsx';
import WickFormLabel from '../../../../components/forms/WickFormLabel.tsx';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericMultiSelectOnChangeHandler, genericOnChangeHandler} from '../../../../helpers/form';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {Role} from '../../../../models/iam/Role';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {getRole, updateRole} from '../../../../requests/iam/Role';
import {defaultFormFields, fillEditForm, FormFields, roleSchema} from "../core/form.ts";
import Select from "react-select";
import {getAllPermissions} from "../../../../requests/iam/Permission.ts";
import {Permission} from "../../../../models/iam/Permission.ts";


const RoleEdit: React.FC = () => {
    const [role, setRole] = useState<Role | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);

    const wickApp = useWickApp();

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the role we need to edit from the database
            submitRequest(getRole, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current role to edit
                    setRole(response);

                    // we also set the form to be the role details
                    setForm(fillEditForm(response))
                }
            });

            // get the permissions so we can edit the role's permissions
            submitRequest(getAllPermissions, [], (response) => {
                // if we were able to get the list of permissions, then we fill our state with them
                setPermissions(response);
            }, setFormErrors);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (role) {
            wickApp.setPageTitle(generatePageTitle(Sections.IAM_ROLES, PageTypes.EDIT, role.name))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);

    const onChangeHandler = (e: React.FormEvent<HTMLFormElement>) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        // we need to update the role's data by doing API call with form
        if (role) {
            submitRequest(updateRole, [role.id, form], () => {
                // we got the updated role so we're good
                wickApp.setAlert({
                    message: new AlertMessageGenerator('role', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                })

                navigate(`/iam/roles`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Role"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={roleSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
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
                                    <WickFormLabel text="Roles" isRequired={true}/>

                                    <Select
                                        isMulti
                                        name='permission_ids'
                                        value={permissions.filter(
                                            (permission) =>
                                                form.permission_ids?.includes(permission.id)
                                        )}
                                        options={permissions}
                                        getOptionLabel={(instance) => instance.name}
                                        getOptionValue={(instance) => instance.id.toString()}
                                        placeholder={`Select one or more permissions`}
                                        onChange={(e) => {
                                            genericMultiSelectOnChangeHandler(e, formik, form, setForm, 'permission_ids')
                                        }}
                                    />

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

export default RoleEdit;
