import {FormFields} from "../../core/form.ts";
import React from "react";
import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import {FormikProps} from "formik";

interface Props {
    form: FormFields
    setForm: React.Dispatch<React.SetStateAction<FormFields>>
    formik: FormikProps<FormFields>;
}

const ProductStripe: React.FC<Props> = ({form, setForm, formik}) => {
    return (
        <KTCard className="py-4">
            <KTCardHeader text="Stripe Details" className="border-0"/>

            <KTCardBody className="pt-0">
                <div className="row">
                    {/*<div className="col-6">*/}
                    {/*    <div className="mb-10 fv-row fv-plugins-icon-container">*/}
                    {/*        <label className="form-label">Product Stripe ID</label>*/}

                    {/*        <Field*/}
                    {/*            className="form-control fs-base mb-2"*/}
                    {/*            type="text"*/}
                    {/*            placeholder="Enter product stripe ID"*/}
                    {/*            name="product_stripe_id"*/}
                    {/*        />*/}

                    {/*        <div className="mt-2 mb-2 text-danger">*/}
                    {/*            {formik.errors?.product_stripe_id ? formik.errors?.product_stripe_id : null}*/}
                    {/*        </div>*/}

                    {/*        <div className="text-muted fs-7">Enter the product stripe ID.</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="col-6">*/}
                    {/*    <div className="mb-10 fv-row fv-plugins-icon-container">*/}
                    {/*        <label className="form-label">Price Stripe ID</label>*/}

                    {/*            <Field*/}
                    {/*                className="form-control fs-base mb-2"*/}
                    {/*                type="text"*/}
                    {/*                placeholder="Enter price stripe ID"*/}
                    {/*                name="price_stripe_id"*/}
                    {/*            />*/}

                    {/*        <div className="mt-2 mb-2 text-danger">*/}
                    {/*            {formik.errors?.price_stripe_id ? formik.errors?.price_stripe_id : null}*/}
                    {/*        </div>*/}

                    {/*        <div className="text-muted fs-7">Enter the price stripe ID.</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </KTCardBody>
        </KTCard>
    )
}

export default ProductStripe;