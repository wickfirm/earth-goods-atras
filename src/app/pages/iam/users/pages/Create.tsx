import {ErrorMessage, Field, Form, Formik, FormikProps} from 'formik';
import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {useNavigate} from 'react-router-dom';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import WickFormFooter from '../../../../components/forms/WickFormFooter.tsx';
import WickFormLabel from '../../../../components/forms/WickFormLabel.tsx';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {
    genericHandleSingleFile,
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler
} from '../../../../helpers/form';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {storeUser} from '../../../../requests/iam/User';
import FormErrors from "../../../../components/forms/FormErrors.tsx";
import {defaultFormFields, FormFields, userSchema} from "../core/form.ts";
import {Role} from "../../../../models/iam/Role.ts";
import {getAllRoles} from "../../../../requests/iam/Role.ts";


const UserCreate: React.FC = () => {
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    const wickApp = useWickApp();
    const navigate = useNavigate();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.IAM_USERS, PageTypes.CREATE))

        // get the roles so we can edit the user's roles
        submitRequest(getAllRoles, [], (response) => {
            setRoles(response);
        }, setFormErrors);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e: React.FormEvent<HTMLFormElement>) => {
        // if (e.target.name !== 'image') {
        genericOnChangeHandler(e, form, setForm);
        // }
    };

    const multiSelectChangeHandler = (e: any, key: string) => {
        genericMultiSelectOnChangeHandler(e, undefined, form, setForm, key);
    };

    const handleFile = (e: any, formik: FormikProps<any>, key: string) => {
        genericHandleSingleFile(e, formik, form, setForm, key);
    };

    const handleCreate = () => {
        // send API request to create the user
        submitRequest(storeUser, [form], () => {
            // it's user for sure
            wickApp.setAlert({
                message: new AlertMessageGenerator('user', Actions.CREATE, WickToastType.SUCCESS).message,
                type: WickToastType.SUCCESS
            })

            navigate(`/iam/users`);
        }, setFormErrors);
    };

    return (
        <KTCard>
            <KTCardHeader text="Create New User"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={userSchema} onSubmit={handleCreate} enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler} placeholder={undefined}>
                                <div className="mb-7">
                                    <WickFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter user name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <WickFormLabel text="Email address" isRequired={true}/>

                                    <Field className="form-control fs-base" type="email"
                                           placeholder="Enter email address" name="email"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="email" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <WickFormLabel text="Password" isRequired={true}/>

                                    <Field className="form-control fs-base" type="password" value={undefined}
                                           placeholder="Enter user password" name="password"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="password" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <WickFormLabel text="Confirm password" isRequired={true}/>

                                    <Field className="form-control fs-base" type="password" value={undefined}
                                           placeholder="Confirm user password" name="password_confirmation"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="password_confirmation" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <WickFormLabel text="Profile picture" isRequired={false}/>

                                    <Field className="form-control fs-base" type="file" name="image" value={undefined}
                                           onChange={(e: any) => handleFile(e, formik, 'image')}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="image" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <WickFormLabel text="Roles" isRequired={true}/>

                                    <Select isMulti name="role_ids"
                                            options={roles}
                                            getOptionLabel={(role) => role.name}
                                            getOptionValue={(role) => role.id.toString()}
                                            onChange={(e) => multiSelectChangeHandler(e, 'role_ids')}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="role_ids" className="mt-2"/>
                                    </div>
                                </div>

                                <WickFormFooter cancelUrl={'/iam/users'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default UserCreate;
