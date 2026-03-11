import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {ErrorMessage, Field, Form, Formik, useFormik} from 'formik'
import {getUserByToken, login, requestPassword} from '../core/_requests'
import {defaultForgotPasswordFormFields, defaultLoginFormFields, loginSchema} from "../core/_forms.ts";
import {Alert} from "react-bootstrap";
import {generatePageTitle} from "../../../helpers/pageTitleGenerator.ts";
import {Sections} from "../../../helpers/sections.ts";
import {PageTypes} from "../../../helpers/variables.ts";
import {useWickApp} from "../../general/WickApp.loader.ts";
import {toAbsoluteUrl} from "../../../../_metronic/helpers";
import {AxiosError} from "axios";
import {string} from "yup";

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

export function ForgotPassword() {
    const wickApp = useWickApp();

    const [loading, setLoading] = useState(false)
    const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
    const [errorMessage, setErrorMessage] = useState<string>('');

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
            const res = await requestPassword(values)

            if (res && typeof res !== 'string' && (res as AxiosError<{ message: string }>).response?.data?.message) {
                setHasErrors(true);
                setErrorMessage((res as AxiosError<{ message: string }>).response?.data.message as string);
            } else {
                setHasErrors(false);
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
        <Formik initialValues={defaultForgotPasswordFormFields} onSubmit={handleSubmit} validationSchema={forgotPasswordSchema}>
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
                    <div className='d-flex align-items-center text-center justify-content-center flex-grow-1 flex-lg-grow-0'>
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
                    }}>Forgot Password?</h1>
                    <div className='fw-semibold fs-6'
                         style={{fontFamily: "Montserrat, sans-serif", color: "#525252"}}>
                        Enter your email to reset your password.
                    </div>
                </div>

                    {/*/!* begin::Title *!/*/}
                    {/*{hasErrors === true && (*/}
                    {/*    <div className='mb-lg-15 alert alert-danger'>*/}
                    {/*        <div className='alert-text font-weight-bold'>*/}
                    {/*            Sorry, looks like there are some errors detected, please try again.*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    {hasErrors && <Alert variant={'danger'}> {errorMessage} </Alert>}

                    {hasErrors === false && (
                        <Alert variant={'success'} className="text-center">Sent password reset. Please check your email</Alert>
                        // <div className='mb-10 bg-light-info p-8 rounded text-center'>
                        //     <div className='text-info'>Sent password reset. Please check your email</div>
                        // </div>
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
                        {/*<input*/}
                        {/*    type='email'*/}
                        {/*    placeholder=''*/}
                        {/*    autoComplete='off'*/}
                        {/*    {...formik.getFieldProps('email')}*/}
                        {/*    className={clsx(*/}
                        {/*        'form-control bg-transparent',*/}
                        {/*        {'is-invalid': formik.touched.email && formik.errors.email},*/}
                        {/*        {*/}
                        {/*            'is-valid': formik.touched.email && !formik.errors.email,*/}
                        {/*        }*/}
                        {/*    )}*/}
                        {/*/>*/}
                        <div className='text-danger mt-2'>
                            <ErrorMessage name='email'/>
                        </div>
                    </div>
                    {/* end::Form group */}

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
