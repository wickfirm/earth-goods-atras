import React, {useEffect} from "react";
import {FormFields} from "../../core/form.ts";
import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import {Field, FormikProps} from "formik";
import Slider from "rsuite/esm/Slider/Slider";
import {InputGroup, OverlayTrigger, Tooltip} from "react-bootstrap";
import {DiscountTypeEnum} from "../../../../../enum/DiscountTypeEnum.ts";
import {useProduct} from "../../core/ProductContext.loader.tsx";
import {DiscountType} from "../../../../../models/commerce/Options.ts";

interface Props {
    form: FormFields;
    setForm: React.Dispatch<React.SetStateAction<FormFields>>;
    formik: FormikProps<FormFields>;
}

const ProductPricing: React.FC<Props> = ({form, setForm, formik}) => {
    const {options} = useProduct()
    const {discountTypes} = options

    // Memoized handler to avoid unnecessary re-renders
    const handleDiscountChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prevForm: any) => ({
            ...prevForm,
            discount_type: event.target.value,
        }));

        formik.setFieldValue('discount_type', event.target.value)
    }, []);

    useEffect(() => {

    }, []);

    return (
        <KTCard className="py-4">
            <KTCardHeader text="Pricing" className="border-0"/>

            <KTCardBody className="pt-0">
                <div className="mb-10 fv-row fv-plugins-icon-container">
                    <label className="required form-label">Base Price</label>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>AED</InputGroup.Text>
                        <Field
                            className="form-control"
                            type="number"
                            placeholder="Price"
                            name="price"
                        />
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>

                    <div className="mt-2 mb-2 text-danger">
                        {formik.errors?.price ? formik.errors?.price : null}
                    </div>

                    <div className="text-muted fs-7">Set the product price.</div>
                </div>

                <div className="fv-row mb-10">
                    <label className="fs-6 fw-semibold mb-2">
                        Discount Type
                        <OverlayTrigger
                            placement='top'
                            overlay={<Tooltip>Select a discount type that will be applied to this product</Tooltip>}
                        >
                            <i className="ki-duotone ki-information-5 text-gray-500 fs-6 ms-1 cursor-pointer">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                            </i>
                        </OverlayTrigger>
                    </label>

                    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-1 row-cols-xl-3 g-9"
                         data-kt-buttons="true">
                        {discountTypes.map((discountType: DiscountType) => (
                            <div className="col" key={discountType.id}>
                                <label
                                    className={`btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6 ${form.discount_type === discountType.id ? "active" : ""}`}
                                    data-kt-button="true"
                                >
                                    <span
                                        className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="discount_type"
                                            value={discountType.id}
                                            checked={form.discount_type === discountType.id}
                                            onChange={handleDiscountChange}
                                        />
                                    </span>
                                    <span className="ms-5">
                                        <span className="fs-4 fw-bold text-gray-800 d-block">
                                            {discountType.id === DiscountTypeEnum.NO_DISCOUNT ? "No Discount" : discountType.id === DiscountTypeEnum.PERCENTAGE ? "Percentage %" : "Fixed Price"}
                                        </span>
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {form.discount_type === DiscountTypeEnum.PERCENTAGE && (
                    <>
                        <div className="mb-10 fv-row">
                            <label className="form-label">Set Discount Percentage</label>
                            <div className="d-flex flex-column text-center mb-5">
                                <div className="d-flex align-items-start justify-content-center mb-7">
                                    <span className="fw-bold fs-3x">{form.discount_percentage}</span>
                                    <span className="fw-bold fs-4 mt-1 ms-2">%</span>
                                </div>
                                <Slider
                                    progress
                                    defaultValue={form.discount_percentage ?? 0}
                                    onChange={value => {
                                        setForm({...form, ['discount_percentage']: value})
                                        formik.setFieldValue('discount_percentage', value)
                                    }}
                                />
                            </div>

                            <div className="mt-2 mb-2 text-danger">
                                {formik.errors?.discount_percentage ? formik.errors?.discount_percentage : null}
                            </div>

                            <div className="text-muted fs-7">Set a percentage discount to be applied on this product.
                            </div>
                        </div>
                    </>
                )}

                {form.discount_type === DiscountTypeEnum.FIXED && (
                    <>
                        <div className="mb-10 fv-row">
                            <label className="form-label">Fixed Discounted Price</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>AED</InputGroup.Text>
                                <Field
                                    className="form-control"
                                    type="number"
                                    placeholder="Discounted price"
                                    name="discount_fixed_price"
                                />
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>

                            <div className="mt-2 mb-2 text-danger">
                                {formik.errors?.discount_fixed_price ? formik.errors?.discount_fixed_price : null}
                            </div>

                            <div className="text-muted fs-7">Set the discounted product price. The product will be
                                reduced at the determined fixed price.
                            </div>
                        </div>
                    </>
                )}
            </KTCardBody>
        </KTCard>
    );
};

export default ProductPricing;
