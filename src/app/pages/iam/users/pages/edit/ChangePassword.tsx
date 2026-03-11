import {ErrorMessage, Field, Form, Formik} from 'formik'
import React, {useState} from 'react'
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers'
import FormErrors from '../../../../../components/forms/FormErrors'
import {AlertMessageGenerator} from '../../../../../helpers/AlertMessageGenerator'
import {genericOnChangeHandler} from '../../../../../helpers/form'
import {submitRequest} from '../../../../../helpers/requests'
import {Actions, WickToastType} from '../../../../../helpers/variables'
import {User} from '../../../../../models/iam/User'
import {useAuth} from '../../../../../modules/auth'
import {changePassword} from '../../../../../requests/iam/User'
import {ChangePasswordSchema, defaultFormFields, FormFields} from '../../core/changePasswordForm'
import {useWickApp} from "../../../../../modules/general/WickApp.loader.ts";
import WickFormLabel from "../../../../../components/forms/WickFormLabel.tsx";
import WickFormFooter from "../../../../../components/forms/WickFormFooter.tsx";

interface Props {
    user: User | null
}

const ChangePassword: React.FC<Props> = ({user}) => {
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([])

    const wickApp = useWickApp();
    const {logout} = useAuth()

    const onChangeHandler = (e: React.FormEvent<HTMLFormElement>) => {
        genericOnChangeHandler(e, form, setForm)
    }

    const handleChangePassword = (e: FormFields, fns: any) => {
        // send API request to create the user

        submitRequest(
            changePassword,
            [user, form],
            () => {
                // we were able to store the user
                wickApp.setAlert({
                    message: new AlertMessageGenerator('user', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS,
                })

                // timeout and then logout
                setTimeout(() => {
                    logout()
                }, 3000)
            },
            setFormErrors, fns
        )
    }

    return (
        <KTCard className='card-bordered border-1'>
            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik
                    initialValues={form}
                    validationSchema={ChangePasswordSchema}
                    onSubmit={handleChangePassword}
                    enableReinitialize
                >
                    {() => (
                        <Form onChange={onChangeHandler} placeholder={undefined}>
                            <div className='mb-7'>
                                <WickFormLabel text='New password' isRequired={true}/>

                                <Field
                                    className='form-control fs-base'
                                    type='password'
                                    placeholder='Enter your new password'
                                    name='password'
                                />

                                <div className='mt-1 text-danger'>
                                    <ErrorMessage name='password' className='mt-2'/>
                                </div>
                            </div>

                            <div className='mb-7'>
                                <WickFormLabel text='Confirm new password' isRequired={true}/>

                                <Field
                                    className='form-control fs-base'
                                    type='password'
                                    placeholder='Confirm your new password'
                                    name='password_confirmation'
                                />

                                <div className='mt-1 text-danger'>
                                    <ErrorMessage name='password_confirmation' className='mt-2'/>
                                </div>
                            </div>

                            <WickFormFooter cancelUrl={'/iam/users'}/>
                        </Form>
                    )}
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default ChangePassword
