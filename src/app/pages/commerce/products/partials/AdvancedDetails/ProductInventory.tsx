import {FormFields} from "../../core/form.ts";
import React from "react";
import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import {Field, FormikProps} from "formik";

interface Props {
    form: FormFields
    setForm: React.Dispatch<React.SetStateAction<FormFields>>
    formik: FormikProps<FormFields>;
}

const ProductInventory: React.FC<Props> = ({form, setForm, formik}) => {
    return (
        <KTCard className="py-4">
            <KTCardHeader text="Inventory" className="border-0"/>

            <KTCardBody className="pt-0">
                <div className="row">
                    <div className="col-6">
                        <div className="mb-10 fv-row fv-plugins-icon-container">
                            <label className="required form-label">SKU</label>

                            <Field
                                className="form-control fs-base mb-2"
                                type="text"
                                placeholder="Enter SKU number"
                                name="sku"
                            />

                            <div className="mt-2 mb-2 text-danger">
                                {formik.errors?.sku ? formik.errors?.sku : null}
                            </div>

                            <div className="text-muted fs-7">Enter the product SKU.</div>
                        </div>
                    </div>

                    {/*<div className="col-6">*/}
                    {/*    <div className="mb-10 fv-row fv-plugins-icon-container">*/}
                    {/*        <label className="required form-label">Quantity</label>*/}

                    {/*        <Field*/}
                    {/*            className="form-control fs-base mb-2"*/}
                    {/*            type="number"*/}
                    {/*            placeholder="On shelf"*/}
                    {/*            name="quantity"*/}
                    {/*        />*/}

                    {/*        <div className="mt-2 mb-2 text-danger">*/}
                    {/*            {formik.errors?.quantity ? formik.errors?.quantity : null}*/}
                    {/*        </div>*/}

                    {/*        <div className="text-muted fs-7">Enter the product quantity.</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </KTCardBody>
        </KTCard>
    )
}

export default ProductInventory;