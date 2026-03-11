import {Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {PageTypes, WickToastType} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import FormErrors from "../../../../components/forms/FormErrors.tsx";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import {Link} from "react-router-dom";
import {Button, InputGroup, OverlayTrigger, Tooltip} from "react-bootstrap";
import {bulkDiscountSchema, defaultFormFields, FormFields} from "../core/form.ts";
import {DiscountType} from "../../../../models/commerce/Options.ts";
import {DiscountTypeEnum} from "../../../../enum/DiscountTypeEnum.ts";
import Slider from "rsuite/esm/Slider/Slider";
import Select from "react-select";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";
import {genericMultiSelectOnChangeHandler} from "../../../../helpers/form.ts";
import {useProduct} from "../../products/core/ProductContext.loader.tsx";
import {Product} from "../../../../models/commerce/Product.ts";
import {submitRequest} from "../../../../helpers/requests.ts";
import {getAllProducts} from "../../../../requests/commerce/Product.ts";
import {applyBulkDiscount} from "../../../../requests/commerce/Discount.ts";

const discountTargetTypes = [
    {
        id: "categories",
        name: "Categories"
    },
    {
        id: "products",
        name: "Products"
    }
]

const BulkDiscount: React.FC = () => {
    const wickApp = useWickApp();
    const {options} = useProduct()
    const {categories, discountTypes} = options

    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // New loading state
    const [products, setProducts] = useState<Product[]>([]);
    const [exceptedProducts, setExceptedProducts] = useState<Product[]>([]);

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle('Bulk ' + Sections.COMMERCE_DISCOUNT, PageTypes.INDEX))

        submitRequest(getAllProducts, [], (response) => {
            setProducts(response);
        }, setFormErrors);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = (values: FormFields, fns: any) => {
        setLoading(true); // Set loading to true
        // send API request to create the product
        submitRequest(applyBulkDiscount, [values], (response) => {
            // it's product for sure
            wickApp.setAlert({
                message: response.message,
                type: WickToastType.SUCCESS
            })

            setLoading(false);
            fns.resetForm()

            setTimeout(() => {
                window.location.reload()
            }, 2500)
        }, setFormErrors, fns);
    };

    useEffect(() => {
        setExceptedProducts(products.filter((product) => form.category_ids.includes(product.category.id)))
    }, [form.category_ids]);

    return (
        <KTCard>
            <KTCardHeader text="Bulk Discount"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={defaultFormFields} validationSchema={bulkDiscountSchema}
                        onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form placeholder={undefined}>
                                <div className="w-100">
                                    <div>
                                        <div className="pb-10 pb-lg-12">
                                            <h1 className="fw-bold text-gray-900">Apply Bulk Discounts to Specific
                                                Products
                                                or Entire Categories</h1>

                                            <div className="text-muted fw-semibold fs-4">
                                                Effortlessly apply bulk discounts to individual products or entire
                                                categories, streamlining your pricing strategy and enhancing promotional
                                                campaigns.
                                            </div>
                                        </div>

                                        <div className="fv-row mb-10">
                                            <label className="fs-6 fw-semibold mb-2">
                                                Discount Type
                                                <OverlayTrigger
                                                    placement='top'
                                                    overlay={<Tooltip>Select a discount type that will be applied to
                                                        this
                                                        product</Tooltip>}
                                                >
                                                    <i className="ki-duotone ki-information-5 text-gray-500 fs-6 ms-1 cursor-pointer">
                                                        <span className="path1"></span>
                                                        <span className="path2"></span>
                                                        <span className="path3"></span>
                                                    </i>
                                                </OverlayTrigger>
                                            </label>

                                            <div
                                                className="row row-cols-1 row-cols-md-3 row-cols-lg-1 row-cols-xl-3 g-9"
                                                data-kt-buttons="true">
                                                {discountTypes.map((discountType: DiscountType) => (
                                                    discountType.id !== 'no_discount' && (
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
                                                                onChange={(event) => {
                                                                    setForm((prevForm: any) => ({
                                                                        ...prevForm,
                                                                        discount_type: event.target.value,
                                                                    }));

                                                                    formik.setFieldValue('discount_type', event.target.value)
                                                                }}
                                                            />
                                                        </span>
                                                                <span className="ms-5">
                                                            <span className="fs-4 fw-bold text-gray-800 d-block">
                                                                {discountType.id === DiscountTypeEnum.NO_DISCOUNT ? "No Discount" : discountType.id === DiscountTypeEnum.PERCENTAGE ? "Percentage %" : "Fixed Price"}
                                                            </span>
                                                        </span>
                                                            </label>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </div>

                                        {form.discount_type === DiscountTypeEnum.PERCENTAGE && (
                                            <>
                                                <div className="mb-10 fv-row">
                                                    <label className="form-label">Set Discount Percentage</label>
                                                    <div className="d-flex flex-column text-center mb-5">
                                                        <div
                                                            className="d-flex align-items-start justify-content-center mb-7">
                                                        <span
                                                            className="fw-bold fs-3x">{form.discount_percentage}</span>
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
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="separator separator-dotted mb-10"></div>

                                    <div>
                                        <div className="fv-row mb-10">
                                            <label className="fs-6 fw-semibold mb-2">
                                                Apply To
                                                <OverlayTrigger
                                                    placement='top'
                                                    overlay={<Tooltip>Specify the categories/products to which the
                                                        discount should be applied</Tooltip>}
                                                >
                                                    <i className="ki-duotone ki-information-5 text-gray-500 fs-6 ms-1 cursor-pointer">
                                                        <span className="path1"></span>
                                                        <span className="path2"></span>
                                                        <span className="path3"></span>
                                                    </i>
                                                </OverlayTrigger>
                                            </label>

                                            <div
                                                className="row row-cols-1 row-cols-md-3 row-cols-lg-1 row-cols-xl-3 g-9"
                                                data-kt-buttons="true">
                                                {discountTargetTypes.map((discountTargetType) => (
                                                    <div className="col" key={discountTargetType.id}>
                                                        <label
                                                            className={`btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6 ${form.discount_target_type === discountTargetType.id ? "active" : ""}`}
                                                            data-kt-button="true"
                                                        >
                                                        <span
                                                            className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="discount_type"
                                                                value={discountTargetType.id}
                                                                checked={form.discount_target_type === discountTargetType.id}
                                                                onChange={(event) => {
                                                                    setForm((prevForm: any) => ({
                                                                        ...prevForm,
                                                                        discount_target_type: event.target.value,
                                                                    }));

                                                                    formik.setFieldValue('discount_target_type', event.target.value)
                                                                }}
                                                            />
                                                        </span>
                                                            <span className="ms-5">
                                                            <span className="fs-4 fw-bold text-gray-800 d-block">
                                                                {discountTargetType.name}
                                                            </span>
                                                        </span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {form.discount_target_type === "categories" && (
                                            <>
                                                <div className="mb-10 fv-row">
                                                    <label className="form-label mb-3">Select the categories to which
                                                        you
                                                        want to apply the discount for their products</label>

                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="d-flex flex-column mb-5">
                                                                <label
                                                                    className="form-label required">Categories</label>
                                                                <Select isMulti name="category_ids"
                                                                        options={categories}
                                                                        getOptionLabel={(category) => category.name[DEFAULT_LANGUAGE]}
                                                                        getOptionValue={(category) => category.id.toString()}
                                                                        onChange={(e) => genericMultiSelectOnChangeHandler(e, formik, form, setForm, 'category_ids')}
                                                                        value={categories.filter((category) => form.category_ids?.includes(category.id))}
                                                                        className="mb-2"/>

                                                                <div className="mt-2 mb-2 text-danger">
                                                                    {/*{formik.errors?.category_id ? formik.errors?.category_id : null}*/}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-6">
                                                            <div className="d-flex flex-column mb-5">
                                                                <label
                                                                    className="form-label required">Except
                                                                    Products</label>

                                                                <Select isMulti name="except_product_ids"
                                                                        options={exceptedProducts}
                                                                        getOptionLabel={(product) => product.name[DEFAULT_LANGUAGE]}
                                                                        getOptionValue={(product) => product.id.toString()}
                                                                        onChange={(e) => genericMultiSelectOnChangeHandler(e, formik, form, setForm, 'except_product_ids')}
                                                                        value={exceptedProducts.filter((product) => form.except_product_ids?.includes(product.id))}
                                                                        className="mb-2"/>

                                                                <div className="mt-2 mb-2 text-danger">
                                                                    {/*{formik.errors?.category_id ? formik.errors?.category_id : null}*/}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {form.discount_target_type === "products" && (
                                            <>
                                                <div className="mb-10 fv-row">
                                                    <label className="form-label mb-3">Select the categories to which
                                                        you
                                                        want to apply the discount for their products</label>

                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="d-flex flex-column mb-5">
                                                                <label
                                                                    className="form-label required">Products</label>

                                                                <Select isMulti name="product_ids"
                                                                        options={products}
                                                                        getOptionLabel={(product) => product.name[DEFAULT_LANGUAGE]}
                                                                        getOptionValue={(product) => product.id.toString()}
                                                                        onChange={(e) => genericMultiSelectOnChangeHandler(e, formik, form, setForm, 'product_ids')}
                                                                        value={products.filter((product) => form.product_ids?.includes(product.id))}
                                                                        className="mb-2"/>

                                                                <div className="mt-2 mb-2 text-danger">
                                                                    {/*{formik.errors?.category_id ? formik.errors?.category_id : null}*/}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {loading && (
                                    <span className="wick-loader mt-2 mb-4"></span>
                                )}

                                <>
                                    <div className="separator mb-6"></div>

                                    <div className="d-flex justify-content-end">
                                        <Button variant="twfirm" type="submit" className={'me-2'}
                                                disabled={formik.isSubmitting}>
                                            {
                                                formik.isSubmitting && (
                                                    <span className='indicator-progress' style={{display: 'inline-block'}}>
                                                        <span
                                                            className='spinner-border spinner-border-sm align-middle me-2'/> Please wait ...
                                                    </span>
                                                )
                                            }

                                            {
                                                !formik.isSubmitting && 'Submit'
                                            }
                                        </Button>

                                        <Link to="/commerce/products">
                                            <Button variant="light-secondary" type="submit">
                                                Cancel
                                            </Button>
                                        </Link>
                                    </div>
                                </>
                                {/*<WickFormFooter cancelUrl={'/commerce/products'}/>*/}
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default BulkDiscount;
