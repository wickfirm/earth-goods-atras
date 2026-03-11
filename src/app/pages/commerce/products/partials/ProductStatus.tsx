import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import React from "react";
import {useProduct} from "../core/ProductContext.loader.tsx";
import Select from "react-select";
import {genericSingleSelectOnChangeHandler} from "../../../../helpers/form.ts";
import {FormFields} from "../core/form.ts";
import {ProductStatusEnum} from "../../../../enum/ProductStatusEnum.ts";
import {FormikProps} from "formik";

interface Props {
    form: FormFields;
    setForm: React.Dispatch<React.SetStateAction<FormFields>>;
    formik: FormikProps<FormFields>;
}

const ProductStatus: React.FC<Props> = ({form, setForm, formik}) => {
    const {options} = useProduct()
    const {productStatuses} = options

    return (
        <KTCard className="py-4">
            <div className="card-header border-0">
                <div className="card-title">
                    <h3 className={`card-label required`}>Status</h3>
                </div>

                <div className="card-toolbar">
                    {
                        form.status === ProductStatusEnum.IN_STOCK ? (
                                <div className="rounded-circle bg-success w-15px h-15px"></div>
                            )
                            :
                            (
                                form.status === ProductStatusEnum.OUT_STOCK ? (
                                        <div className="rounded-circle bg-danger w-15px h-15px"></div>
                                    ) :
                                    (
                                        <div className="rounded-circle bg-warning w-15px h-15px"></div>
                                    )
                            )
                    }

                </div>
            </div>

            <KTCardBody className="pt-0">
                <Select name="status"
                        value={productStatuses.find((status) => status.id === form.status)}
                        options={productStatuses}
                        getOptionLabel={(status) => status.name}
                        getOptionValue={(status) => status.id.toString()}
                        onChange={(e) => genericSingleSelectOnChangeHandler(e, formik, form, setForm, 'status')}
                        className="mb-2"/>

                <div className="text-muted fs-7">Set the product status.</div>
                <div className="mt-2 mb-2 text-danger">
                    {formik.errors?.status ? formik.errors?.status : null}
                </div>
            </KTCardBody>
        </KTCard>
    )
}

export default ProductStatus;