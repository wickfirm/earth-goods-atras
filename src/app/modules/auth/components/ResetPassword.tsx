import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useNavigate} from 'react-router-dom'
import {ErrorMessage, Field, Form, Formik, useFormik} from 'formik'
import {getUserByToken, login, requestPassword, resetPassword} from '../core/_requests'
import {
    defaultForgotPasswordFormFields,
    defaultLoginFormFields, defaultResetPasswordFormFields,
    loginSchema,
    resetPasswordSchema
} from "../core/_forms.ts";
import {Alert} from "react-bootstrap";
import {generatePageTitle} from "../../../helpers/pageTitleGenerator.ts";
import {Sections} from "../../../helpers/sections.ts";
import {PageTypes} from "../../../helpers/variables.ts";
import {useWickApp} from "../../general/WickApp.loader.ts";
import {toAbsoluteUrl} from "../../../../_metronic/helpers";
import {string} from "yup";
import {AxiosError} from "axios";

// const initialValues = {
//     email: 'admin@demo.com',
// }

const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Wrong email format')
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Email is required'),
})

export function ResetPassword() {
    const wickApp = useWickApp();
    const navigate = useNavigate();

    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)
    const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        // Extract token and email from the URL
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        const email = queryParams.get('email');

        if (token && email) {
            setToken(token);
        }
    }, [location]);
    // const formik = useFormik({
    //     initialValues,
    //     validationSchema: forgotPasswordSchema,
    //     onSubmit: (values, {setStatus, setSubmitting}) => {
    //         setLoading(true)
    //         setHasErrors(undefined)
    //         setTimeout(() => {
    //             requestPassword(values.email)
    //                 .then(() => {
    //                     setHasErrors(false)
    //                     setLoading(false)
    //                 })
    //                 .catch(() => {
    //                     setHasErrors(true)
    //                     setLoading(false)
    //                     setSubmitting(false)
    //                     setStatus('The login detail is incorrect')
    //                 })
    //         }, 1000)
    //     },
    // })

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.FORGOT_PASSWORD, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleSubmit = async (values: any, {setSubmitting}: any) => {
        setLoading(true)

        try {
            const res = await resetPassword({...values, ['token']: token})

            if (res && typeof res !== 'string' && (res as AxiosError<{ message: string }>).response?.data?.message) {
                setHasErrors(true);
                setErrorMessage((res as AxiosError<{ message: string }>).response?.data.message as string);
            } else {
                setHasErrors(false);
                navigate('/auth/login');
            }

            setLoading(false)
        } catch (error) {
            setHasErrors(true)
            // setErrorMessage('These credentials do not match our records.')
            setSubmitting(false)
            setLoading(false)
        }
    }

    return (
        <Formik initialValues={{
            token: token ?? '--',
            email: '',
            password: '',
            password_confirmation: ''
        }} onSubmit={handleSubmit} validationSchema={resetPasswordSchema}>
            {(formik) => (
                <Form className='form w-100' placeholder={''}>
                    {/*// <form*/}
                    {/*//     className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'*/}
                    {/*//     noValidate*/}
                    {/*//     id='kt_login_password_reset_form'*/}
                    {/*//     onSubmit={formik.handleSubmit}*/}
                    {/*// >*/}
                    {/*    <div className='text-center mb-10'>*/}
                    {/*        /!* begin::Title *!/*/}
                    {/*        <h1 className='text-gray-900 fw-bolder mb-3'>Forgot Password ?</h1>*/}
                    {/*        /!* end::Title *!/*/}

                    {/*        /!* begin::Link *!/*/}
                    {/*        <div className='text-gray-500 fw-semibold fs-6'>*/}
                    {/*            Enter your email to reset your password.*/}
                    {/*        </div>*/}
                    {/*        /!* end::Link *!/*/}
                    {/*    </div>*/}

                    <div className='text-center mb-11'>
                        <div
                            className='d-flex align-items-center text-center justify-content-center flex-grow-1 flex-lg-grow-0'>
                            <Link to='/dashboard'>
                                <img
                                    alt='Logo'
                                    src={toAbsoluteUrl('/media/logos/logo.svg', true)}
                                    className='h-80px'
                                />
                            </Link>
                        </div>

                        <h1 className='fw-bolder mb-3' style={{
                            fontFamily: "Autumn Voyage, sans-serif",
                            color: "#36563D",
                            fontSize: "50px",
                            lineHeight: "50px"
                        }}>Reset Password</h1>
                    </div>

                    {hasErrors && <Alert variant={'danger'}> {errorMessage} </Alert>}

                    {hasErrors === false && (
                        <Alert variant={'success'} className="text-center">Sent password reset. Please check your
                            email</Alert>
                    )}
                    {/* end::Title */}

                    {/* begin::Form group */}
                    <div className='fv-row mb-8'>
                        <label className='form-label fs-6 fw-bolder'
                               style={{fontFamily: "Montserrat, sans-serif", color: "#525252"}}>Email</label>
                        <Field
                            type='email'
                            name='email'
                            placeholder='Email'
                            className='form-control form-control-lg form-control-solid'
                            autoComplete='off'
                        />

                        <div className='text-danger mt-2'>
                            <ErrorMessage name='email'/>
                        </div>
                    </div>
                    {/* end::Form group */}

                    <div className='fv-row mb-8'>
                        <label className='form-label fs-6 fw-bolder'
                               style={{fontFamily: "Montserrat, sans-serif", color: "#525252"}}>Password</label>
                        <Field
                            type='password'
                            name='password'
                            placeholder='Password'
                            className='form-control form-control-lg form-control-solid'
                            autoComplete='off'
                        />

                        <div className='text-danger mt-2'>
                            <ErrorMessage name='password'/>
                        </div>
                    </div>

                    <div className='fv-row mb-8'>
                        <label className='form-label fs-6 fw-bolder'
                               style={{fontFamily: "Montserrat, sans-serif", color: "#525252"}}>Password Confirmation</label>
                        <Field
                            type='password'
                            name='password_confirmation'
                            placeholder='Password Confirmation'
                            className='form-control form-control-lg form-control-solid'
                            autoComplete='off'
                        />

                        <div className='text-danger mt-2'>
                            <ErrorMessage name='password_confirmation'/>
                        </div>
                    </div>
                    {/* begin::Form group */}
                    <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
                    <button type='submit' id='kt_password_reset_submit' className='btn btn-twfirm me-4'>
                            <span className='indicator-label'>Submit</span>
                            {loading && (
                                <span className='indicator-progress'>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
                            )}
                        </button>
                        <Link to='/auth/login'>
                            <button
                                type='button'
                                id='kt_login_password_reset_form_cancel_button'
                                className='btn btn-light'
                                disabled={formik.isSubmitting || !formik.isValid}
                            >
                                Cancel
                            </button>
                        </Link>{' '}
                    </div>
                    {/* end::Form group */}
                </Form>
                // </form>
            )}
        </Formik>
    )
}
