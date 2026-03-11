import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import WickFormFooter from '../../../../components/forms/WickFormFooter.tsx';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import FormErrors from "../../../../components/forms/FormErrors.tsx";
import {defaultFormFields, discountCodeSchema, FormFields} from "../core/form.ts";
import {submitRequest} from "../../../../helpers/requests.ts";
import {storeDiscountCode} from "../../../../requests/commerce/DiscountCode.ts";
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator.ts";
import WickFormLabel from "../../../../components/forms/WickFormLabel.tsx";
import {useProduct} from "../../products/core/ProductContext.loader.tsx";
import Select from "react-select";
import {genericSingleSelectOnChangeHandler} from "../../../../helpers/form.ts";
import {DatePicker} from 'rsuite'


const DiscountCodeCreate: React.FC = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {options} = useProduct()
    const {discountTypes, discountCodeStatuses} = options

    const [form, setForm] = useState<FormFields>(defaultFormFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_DISCOUNT_CODES, PageTypes.CREATE))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = (values: FormFields) => {
        submitRequest(storeDiscountCode, [values], () => {
            wickApp.setAlert({
                message: new AlertMessageGenerator('discount code', Actions.CREATE, WickToastType.SUCCESS).message,
                type: WickToastType.SUCCESS
            })

            navigate(`/commerce/discount-codes`);
        }, setFormErrors);
    };

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

    return (
        <KTCard>
            <KTCardHeader text="Create New Discount Code"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={defaultFormFields} validationSchema={discountCodeSchema} onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form placeholder={undefined}>
                                <div className="row mb-7">
                                    <div className="col-6">
                                        <WickFormLabel text={`Code`} isRequired={true}/>
                                        <Field
                                            className="form-control fs-base"
                                            type="text"
                                            placeholder={`Enter code`}
                                            name={`code`}
                                        />
                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name={`code`} component="div"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <WickFormLabel text={`Type`} isRequired={true}/>
                                        <Select name="type"
                                                options={discountTypes}
                                                getOptionLabel={(discountType) => discountType.name}
                                                getOptionValue={(discountType) => discountType.id.toString()}
                                                onChange={(e) => genericSingleSelectOnChangeHandler(e, formik, form, setForm, 'type')}
                                                className="mb-2"/>

                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name={`type`} component="div"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-7">
                                    <div className="col-6">
                                        <WickFormLabel text={`Value`} isRequired={true}/>
                                        <Field
                                            className="form-control fs-base"
                                            type="number"
                                            placeholder={`Enter value`}
                                            name={`value`}
                                        />
                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name={`value`} component="div"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <WickFormLabel text={`Expiration Date`} isRequired={true}/>

                                        <DatePicker
                                            name='expiration_date'
                                            className='krys-datepicker'
                                            oneTap={true}
                                            block
                                            isoWeek
                                            preventOverflow={false}
                                            placeholder='Select code expiration date'
                                            onChange={(date) => dateChangeHandler(date, 'expiration_date', formik)}
                                        />

                                        <div className="mt-1 text-danger">
                                            <ErrorMessage name={`expiration_date`} component="div"/>
                                        </div>
                                    </div>
                                    {/*<div className="col-6">*/}
                                    {/*    <WickFormLabel text={`Status`} isRequired={true}/>*/}
                                    {/*    <Select name="status"*/}
                                    {/*            options={discountCodeStatuses}*/}
                                    {/*            getOptionLabel={(discountCodeStatus) => discountCodeStatus.name}*/}
                                    {/*            getOptionValue={(discountCodeStatus) => discountCodeStatus.id.toString()}*/}
                                    {/*            onChange={(e) => genericSingleSelectOnChangeHandler(e, formik, form, setForm, 'status')}*/}
                                    {/*            className="mb-2"/>*/}

                                    {/*    <div className="mt-1 text-danger">*/}
                                    {/*        <ErrorMessage name={`status`} component="div"/>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>

                                <div className="row mb-7">
                                    {/*<div className="col-6">*/}
                                    {/*    <WickFormLabel text={`Start Date`} isRequired={true}/>*/}

                                    {/*    <DatePicker*/}
                                    {/*        name='start_date'*/}
                                    {/*        className='krys-datepicker'*/}
                                    {/*        oneTap={true}*/}
                                    {/*        block*/}
                                    {/*        isoWeek*/}
                                    {/*        preventOverflow={false}*/}
                                    {/*        placeholder='Select code start date'*/}
                                    {/*        onChange={(date) => dateChangeHandler(date, 'start_date', formik)}*/}
                                    {/*    />*/}

                                    {/*    <div className="mt-1 text-danger">*/}
                                    {/*        <ErrorMessage name={`start_date`} component="div"/>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                </div>

                                <WickFormFooter cancelUrl={'/commerce/discount-codes'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default DiscountCodeCreate;
