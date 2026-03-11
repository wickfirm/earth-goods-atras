import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from "../../../../helpers/variables";
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import FormErrors from "../../../../components/forms/FormErrors.tsx";
import {bannerSchema, defaultFormFields, FormFields} from "../core/form.ts";
import WickFormLabel from "../../../../components/forms/WickFormLabel.tsx";
import {DatePicker} from "rsuite";
import {useMain} from "../../../shared/MainContext.loader.tsx";
import Select from "react-select";
import {genericSingleSelectOnChangeHandler} from "../../../../helpers/form.ts";
import BannerBackground from "../partials/BannerBackground.tsx";
import WickColorPicker from "../../../../components/forms/WickColorPicker.tsx";
import BannerFloatingImageLeft from "../partials/BannerFloatingImageLeft.tsx";
import BannerFloatingImageRight from "../partials/BannerFloatingImageRight.tsx";
import WickFormFooter from "../../../../components/forms/WickFormFooter.tsx";
import {FormControl} from "react-bootstrap";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";
import WickSwitch from "../../../../components/forms/WickSwitch.tsx";
import {submitRequest} from "../../../../helpers/requests.ts";
import {storeBanner} from "../../../../requests/content/Banner.ts";
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator.ts";

const BannerCreate: React.FC = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {options} = useMain()
    const {pages, ctaTypes} = options

    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_PROMOTIONAL_BANNERS, PageTypes.CREATE))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dateChangeHandler = (date: Date | null, key: string, formik: any) => {
        if (date) {
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')

            const formattedDate = `${year}-${month}-${day}`

            setForm({...form, [key]: formattedDate})
            formik.setFieldValue(key, formattedDate)
        } else {
            // in case the user removed the date then we should reset it (date will be null)
            setForm({...form, [key]: date})
            formik.setFieldValue(key, date)
        }
    }

    const handleCreate = (values: FormFields) => {
        submitRequest(storeBanner, [values], () => {
            wickApp.setAlert({
                message: new AlertMessageGenerator("banner", Actions.CREATE, WickToastType.SUCCESS).message,
                type: WickToastType.SUCCESS
            })

            navigate(`/content/banners`);
        }, setFormErrors);
    };

    return (
        <>
            <FormErrors errorMessages={formErrors}/>

            <Formik initialValues={defaultFormFields} validationSchema={bannerSchema} onSubmit={handleCreate}
                    enableReinitialize>
                {
                    (formik) => (
                        <Form placeholder={undefined}
                              className="form d-flex flex-column flex-lg-row">
                            {/*Aside column*/}
                            <div className="d-flex flex-column gap-7 mb-7 me-lg-10"
                                 style={{width: '400px', flexShrink: 0}}>
                                <div className="flex-lg-row-fluid mb-10 mb-lg-0 me-lg-7 me-xl-10">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="card-title">
                                                <h3 className="card-label">Banner Details</h3>
                                            </div>
                                        </div>
                                        <div className="card-body p-12">
                                            <div className="mb-3">
                                                <WickFormLabel
                                                    text="Name"
                                                    isRequired={true}
                                                />
                                                <Field
                                                    className="form-control fs-base"
                                                    type="text"
                                                    placeholder="Enter banner name"
                                                    name="name.en"
                                                />
                                                <div className="mt-1 text-danger">
                                                    {formik.errors?.name ? formik.errors?.name['en'] : null}
                                                </div>
                                            </div>

                                            <div className="separator separator-dashed my-10"></div>
                                            <div className="mb-3">
                                                <WickFormLabel
                                                    text="Title"
                                                    isRequired={true}
                                                />
                                                <Field
                                                    className="form-control fs-base"
                                                    type="text"
                                                    placeholder="Enter banner title"
                                                    name="title.en"
                                                />
                                                <div className="mt-1 text-danger">
                                                    {formik.errors?.title ? formik.errors?.title['en'] : null}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <WickFormLabel
                                                    text="Description"
                                                    isRequired={true}
                                                />
                                                <FormControl
                                                    as='textarea'
                                                    rows={6}
                                                    name={`description.en`}
                                                    className='form-control fs-base mb-2'
                                                    placeholder='Enter the banner description'
                                                    defaultValue={formik.getFieldProps('description').value ? formik.getFieldProps('description').value[DEFAULT_LANGUAGE] : null}
                                                    onChange={(e) => {
                                                        const attr = `description.en`

                                                        formik.setFieldValue(attr, e.target.value)
                                                    }}
                                                />
                                                <div className="mt-1 text-danger">
                                                    {formik.errors?.description ? formik.errors?.description['en'] : null}
                                                </div>
                                            </div>
                                            <div className="separator separator-dashed my-10"></div>

                                            <div className="mb-3">
                                                <WickFormLabel text="Start Date" isRequired={true}/>

                                                <DatePicker
                                                    name='start_date'
                                                    className='krys-datepicker'
                                                    oneTap={true}
                                                    block
                                                    isoWeek
                                                    preventOverflow={false}
                                                    placeholder='Select banner start date'
                                                    onChange={(date) => dateChangeHandler(date, 'start_date', formik)}
                                                />

                                                <div className="mt-1 text-danger">
                                                    {formik.errors?.start_date ? formik.errors?.start_date : null}
                                                </div>
                                            </div>

                                            <div>
                                                <WickFormLabel text="End Date" isRequired={true}/>

                                                <DatePicker
                                                    name='end_date'
                                                    className='krys-datepicker'
                                                    oneTap={true}
                                                    block
                                                    isoWeek
                                                    preventOverflow={false}
                                                    placeholder='Select banner end date'
                                                    onChange={(date) => dateChangeHandler(date, 'end_date', formik)}
                                                />

                                                <div className="mt-1 text-danger">
                                                    {formik.errors?.end_date ? formik.errors?.end_date : null}
                                                </div>
                                            </div>

                                            <div className="separator separator-dashed my-10"></div>

                                            <div className="d-flex flex-stack">
                                                <div className="me-5">
                                                    <label className="fs-6 fw-semibold">Status of Banner</label>

                                                    <div className="fs-7 fw-semibold text-muted">
                                                        Indicate whether the banner is active or inactive.
                                                    </div>
                                                </div>

                                                <WickSwitch name="status" onChangeHandler={(e) => {
                                                    e.stopPropagation();
                                                    setForm({...form, status: Number(!form.status)});
                                                    formik.setFieldValue("status", Number(!form.status))
                                                }} defaultValue={Boolean(form.status)}/>
                                            </div>

                                            <div className="separator separator-dashed my-10"></div>

                                            <div>
                                                <WickFormLabel text="Page" isRequired={true}/>

                                                <Select name="page"
                                                        value={pages.find((page) => page.id === form?.page)}
                                                        options={pages}
                                                        getOptionLabel={(page) => page.name}
                                                        getOptionValue={(page) => page.id.toString()}
                                                        onChange={(e) => genericSingleSelectOnChangeHandler(e, formik, form, setForm, 'page')}
                                                        className="mb-2"/>

                                                <div className="text-muted fs-7">Specify the page where the banner
                                                    should be displayed.
                                                </div>
                                                <div className="mt-2 mb-2 text-danger">
                                                    {formik.errors?.page ? formik.errors?.page : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*Main column*/}
                            <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">
                                            <h3 className="card-label">Banner Media</h3>
                                        </div>
                                    </div>
                                    <div className="card-body p-12">
                                        <div className='mb-7'>
                                            <span className='fs-5 text-gray-700 d-flex fw-medium'>Media Upload</span>
                                            <span className='text-muted'>
                                                Upload images or media files to be displayed on the banner.
                                            </span>
                                        </div>

                                        <BannerBackground form={form} setForm={setForm} formik={formik}/>

                                        <div className="row mt-5">
                                            <div className="col-6">
                                                <BannerFloatingImageLeft form={form} setForm={setForm} formik={formik}/>
                                            </div>
                                            <div className="col-6">
                                                <BannerFloatingImageRight form={form} setForm={setForm}
                                                                          formik={formik}/>
                                            </div>
                                        </div>

                                        <div className="separator separator-dashed my-10"></div>

                                        <div className='mb-7'>
                                            <span
                                                className='fs-5 text-gray-700 d-flex fw-medium'>CTA Text & Styles</span>
                                            <span className='text-muted'>
                                                Define the text and appearance of the Call-to-Action button to align with the banner's design and purpose.
                                            </span>
                                        </div>

                                        <div className="row">
                                            <div className="col-4">
                                                <div className="mb-3">
                                                    <WickFormLabel
                                                        text="Text"
                                                        isRequired={true}
                                                    />
                                                    <Field
                                                        className="form-control fs-base"
                                                        type="text"
                                                        placeholder="Enter banner cta text"
                                                        name="cta_text.en"
                                                    />
                                                    <div className="mt-1 text-danger">
                                                        {formik.errors?.cta_text ? formik.errors?.cta_text['en'] : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="mb-3">
                                                    <WickFormLabel
                                                        text="Type of Link"
                                                        isRequired={true}
                                                    />
                                                    <Select name="cta_type"
                                                            value={ctaTypes.find((type) => type.id === form.cta_type)}
                                                            options={ctaTypes}
                                                            getOptionLabel={(type) => type.name}
                                                            getOptionValue={(type) => type.id.toString()}
                                                            onChange={(e) => genericSingleSelectOnChangeHandler(e, formik, form, setForm, 'cta_type')}
                                                            className="mb-2"/>

                                                    <div className="mt-1 text-danger">
                                                        {/*{formik.errors?.cta_type ? formik.errors?.cta_type : null}*/}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                {
                                                    form.cta_type && form?.cta_type === 'internal' ?
                                                        <div>
                                                            <WickFormLabel text="Internal Link" isRequired={true}/>

                                                            <Select name="cta_page_link"
                                                                    value={pages.find((page) => page.id === form.cta_page_link)}
                                                                    options={pages}
                                                                    getOptionLabel={(page) => page.name}
                                                                    getOptionValue={(page) => page.id.toString()}
                                                                    onChange={(e) => genericSingleSelectOnChangeHandler(e, formik, form, setForm, 'cta_page_link')}
                                                                    className="mb-2"/>

                                                            <div className="mt-2 mb-2 text-danger">
                                                                {formik.errors?.cta_page_link ? formik.errors?.cta_page_link : null}
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="mb-3">
                                                            <WickFormLabel
                                                                text="External"
                                                                isRequired={true}
                                                            />
                                                            <Field
                                                                className="form-control fs-base"
                                                                type="text"
                                                                placeholder="Enter banner cta link"
                                                                name="cta_link"
                                                            />
                                                            <div className="mt-1 text-danger">
                                                                {formik.errors?.cta_link ? formik.errors?.cta_link : null}
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="mb-7">
                                                    <WickFormLabel text="CTA Background Color" isRequired={false}/>
                                                    <WickColorPicker
                                                        value={formik.getFieldProps('cta_background_color').value}
                                                        onChange={(color) => formik.setFieldValue('cta_background_color', color)}
                                                    />
                                                    <div className="mt-1 text-danger">
                                                        {formik.errors?.cta_background_color ? formik.errors?.cta_background_color : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mb-7">
                                                    <WickFormLabel text="CTA Text Color" isRequired={false}/>
                                                    <WickColorPicker
                                                        value={formik.getFieldProps('cta_text_color').value}
                                                        onChange={(color) => formik.setFieldValue('cta_text_color', color)}
                                                    />
                                                    <div className="mt-1 text-danger">
                                                        {formik.errors?.cta_text_color ? formik.errors?.cta_text_color : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-end">
                                    <WickFormFooter cancelUrl={"/content/banners"}/>
                                </div>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}

export default BannerCreate;
