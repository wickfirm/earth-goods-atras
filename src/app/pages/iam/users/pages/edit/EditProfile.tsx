import {ErrorMessage, Field, Form, Formik, FormikProps} from 'formik';
import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers';
import FormErrors from '../../../../../components/forms/FormErrors';
import {AlertMessageGenerator} from '../../../../../helpers/AlertMessageGenerator';
import {
    genericHandleSingleFile,
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler
} from '../../../../../helpers/form';
import {submitRequest} from '../../../../../helpers/requests';
import {Actions, WickToastType} from '../../../../../helpers/variables';
import {Role} from '../../../../../models/iam/Role';
import {User} from '../../../../../models/iam/User';
import {getAllRoles} from '../../../../../requests/iam/Role';
import {updateUser} from '../../../../../requests/iam/User';
import {defaultFormFields, fillEditForm, FormFields, userSchema} from '../../core/form';
import {useWickApp} from "../../../../../modules/general/WickApp.loader.ts";
import WickFormLabel from "../../../../../components/forms/WickFormLabel.tsx";
import WickFormFooter from "../../../../../components/forms/WickFormFooter.tsx";
import {scrollToTop} from "../../../../../helpers/general.ts";

interface Props {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const EditProfile: React.FC<Props> = ({user, setUser}) => {
    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    const wickApp = useWickApp();

    useEffect(() => {
        if (user) {
            // const {image, roles, ...currentUser} = user

            // was able to get the user we want to edit
            // the form is the same as user but without the image
            setForm(fillEditForm(user));

            // get the roles so we can edit the user's roles
            submitRequest(getAllRoles, [], (response) => {
                setRoles(response);
            }, setFormErrors);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const onChangeHandler = (e: React.FormEvent<HTMLFormElement>) => {
        // in case of multi select, the element doesn't have a name because
        // we get only a list of values from the select and not an element with target value and name
        // if (e.target.name !== 'image') {
        //     genericOnChangeHandler(e, form, setForm);
        // }

        genericOnChangeHandler(e, form, setForm);
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<any>, key: string) => {
        genericHandleSingleFile(e, formik, form, setForm, key);
    };

    const handleEdit = (e: FormFields, fns: any) => {
        if (user) {
            // send API request to create the user
            submitRequest(updateUser, [user.id, form], (response) => {
                // we were able to store the user
                wickApp.setAlert({
                    message: new AlertMessageGenerator('user', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                });

                // set the updated user so that the overview will be updated
                setUser(response)

                setFormErrors([])

            }, setFormErrors, fns);

            scrollToTop()
        }
    };

    return (
        <KTCard className='card-bordered border-1'>
            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={userSchema(true)} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={onChangeHandler} placeholder={undefined}>
                                <div className="mb-7">
                                    <WickFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter full name" name="name"/>

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
                                    <WickFormLabel text="Profile picture" isRequired={false}/>

                                    <div className="mb-3">
                                        {
                                            user?.image && <img src={user?.image} className="w-25"
                                                                alt={`${user?.name} profile`}/>
                                        }
                                    </div>

                                    <Field className="form-control fs-base" type="file" name="image" value={undefined}
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e, formik, 'image')}/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="image" className="mt-2"/>
                                    </div>
                                </div>

                                <div className="mb-7">
                                    <WickFormLabel text="Roles" isRequired={true}/>

                                    <Select isMulti name={'role_ids'}
                                            value={roles.filter(
                                                (role) =>
                                                    form.role_ids?.includes(role.id)
                                            )}
                                            options={roles}
                                            getOptionLabel={(instance) => instance.name}
                                            getOptionValue={(instance) => instance.id.toString()}
                                            placeholder={`Select one or more roles`}
                                            onChange={(e) => {
                                                genericMultiSelectOnChangeHandler(e, formik, form, setForm, 'role_ids');
                                            }}/>

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
    );
}

export default EditProfile;