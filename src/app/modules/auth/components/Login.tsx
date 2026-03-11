import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {useAuth} from '../core/Auth'
import {defaultLoginFormFields, loginSchema} from "../core/_forms.ts";
import {Alert} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../../_metronic/helpers";
import {generatePageTitle} from "../../../helpers/pageTitleGenerator.ts";
import {Sections} from "../../../helpers/sections.ts";
import {PageTypes} from "../../../helpers/variables.ts";
import {useWickApp} from "../../general/WickApp.loader.ts";

export function Login() {
    const wickApp = useWickApp();

    const [loading, setLoading] = useState(false)

    const {saveAuth, setCurrentUser} = useAuth();
    const [hasErrors, setHasErrors] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.LOGIN, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (values: any, {setSubmitting}: any) => {
        setLoading(true)

        try {
            const {data: auth} = await login(values.email, values.password)

            saveAuth(auth)

            const {data: user} = await getUserByToken(auth.token)
            setCurrentUser(user)
        } catch (error) {
            saveAuth(undefined)
            setHasErrors(true)
            setErrorMessage('These credentials do not match our records.')
            setSubmitting(false)
            setLoading(false)
        }
    }

    return (
        <Formik initialValues={defaultLoginFormFields} onSubmit={handleSubmit} validationSchema={loginSchema}>
            {({isSubmitting, isValid}) => (
                <Form className='form w-100' placeholder={''}>
                    {/* begin::Heading */}
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
                        }}>Sign In</h1>
                        <div className='fw-semibold fs-6'
                             style={{fontFamily: "Montserrat, sans-serif", color: "#525252"}}>To Our Dashboard with
                            email
                        </div>
                    </div>
                    {/* begin::Heading */}

                    {hasErrors && <Alert variant={'danger'}> {errorMessage} </Alert>}

                    {/* end::Separator */}

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

                    {/* begin::Form group */}
                    <div className='fv-row mb-3'>
                        <label className='form-label fw-bolder fs-6 mb-0'
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
                    {/* end::Form group */}

                    {/* begin::Wrapper */}
                    <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
                        <div/>

                        {/* begin::Link */}
                        <Link to='/auth/forgot-password' style={{fontFamily: "Montserrat, sans-serif", color: "#36563D"}}>
                            Forgot Password ?
                        </Link>
                        {/* end::Link */}
                    </div>
                    {/* end::Wrapper */}

                    {/* begin::Action */}
                    <div className='d-grid mb-10'>
                        <button
                            type='submit'
                            id='kt_sign_in_submit'
                            className='btn btn-twfirm'
                            disabled={isSubmitting || !isValid}
                            style={{fontFamily: "Montserrat, sans-serif", backgroundColor: "#36563D"}}
                        >
                            {!loading && <span className='indicator-label'>Continue</span>}
                            {loading && (
                                <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
                            )}
                        </button>
                    </div>
                    {/* end::Action */}
                </Form>
            )}
        </Formik>
    )
}
