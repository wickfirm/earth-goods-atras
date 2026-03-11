import {Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {getProduct, updateProduct} from '../../../../requests/commerce/Product.ts';
import {defaultFormFields, fillEditForm, FormFields, productSchema} from "../core/form.ts";
import ProductThumbnail from "../partials/ProductThumbnail.tsx";
import ProductStatus from "../partials/ProductStatus.tsx";
import ProductDetails from "../partials/ProductDetails.tsx";
import ProductGeneralDetails from "../partials/GeneralDetails/ProductGeneralDetails.tsx";
import ProductMedia from "../partials/GeneralDetails/ProductMedia.tsx";
import ProductPricing from "../partials/GeneralDetails/ProductPricing.tsx";
import ProductInventory from "../partials/AdvancedDetails/ProductInventory.tsx";
import ProductMetaOptions from "../partials/AdvancedDetails/ProductMetaOptions.tsx";
import ProductClaims from "../partials/NutritionDetails/ProductClaims.tsx";
import WickFormFooter from "../../../../components/forms/WickFormFooter.tsx";
import NutritionDetails from "../partials/NutritionDetails/NutritionDetails.tsx";
import ProductPairedWith from "../partials/PairedWith/ProductPairedWith.tsx";
import FormErrors from "../../../../components/forms/FormErrors.tsx";
import {Product} from "../../../../models/commerce/Product.ts";
import {scrollToTop} from "../../../../helpers/general.ts";
import {useMain} from "../../../shared/MainContext.loader.tsx";
import ProductIngredients from "../partials/NutritionDetails/ProductIngredients.tsx";
import ProductHighlights from "../partials/AdvancedDetails/ProductHighlights.tsx";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";


const ProductEdit: React.FC = () => {
    const {id} = useParams();
    const {options} = useMain()
    const wickApp = useWickApp();
    const navigate = useNavigate();

    const {languages} = options

    const [product, setProduct] = useState<Product | null>(null);

    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<string>('general');

    useEffect(() => {
        if (id) {
            submitRequest(getProduct, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    setProduct(response);
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (product) {
            setForm(fillEditForm(product))

            wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_PRODUCTS, PageTypes.EDIT, product.name[DEFAULT_LANGUAGE]))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product])

    const handleEdit = (values: FormFields, fns: any) => {
        if (product) {
            // send API request to update the product
            submitRequest(
                updateProduct,
                [product.id, values],
                (response) => {
                    // we were able to store the product
                    wickApp.setAlert({
                        message: new AlertMessageGenerator('product', Actions.EDIT, WickToastType.SUCCESS)
                            .message,
                        type: WickToastType.SUCCESS,
                    })

                    // set the updated product so that the overview will be updated
                    setProduct(response)

                    setFormErrors([])
                },
                setFormErrors,
                fns
            )

            scrollToTop()
        }
    };

    return (
        <>
            <FormErrors errorMessages={formErrors}/>

            <Formik initialValues={form} validationSchema={productSchema} onSubmit={handleEdit}
                    enableReinitialize>
                {
                    (formik) => (
                        <Form placeholder={undefined}
                              className="form d-flex flex-column flex-lg-row">
                            {/*Aside column*/}
                            <div className="d-flex flex-column gap-7 mb-7 me-lg-10"
                                 style={{width: '300px', flexShrink: 0}}>
                                {/*<div className="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10 fixed">*/}
                                <ProductThumbnail form={form} setForm={setForm} formik={formik}/>
                                <ProductStatus form={form} setForm={setForm} formik={formik}/>
                                <ProductDetails form={form} setForm={setForm} formik={formik}/>
                            </div>
                            {/*Main column*/}
                            <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
                                <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2"
                                    role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            type="button"
                                            className={`nav-link text-active-primary pb-4 ${activeTab === 'general' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('general')}
                                            role="tab"
                                        >
                                            General
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button
                                            type="button"
                                            className={`nav-link text-active-primary pb-4 ${activeTab === 'advanced' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('advanced')}
                                            role="tab"
                                        >
                                            Advanced
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button
                                            type="button"
                                            className={`nav-link text-active-primary pb-4 ${activeTab === 'nutrition_details' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('nutrition_details')}
                                            role="tab"
                                        >
                                            Nutrition Details
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button
                                            type="button"
                                            className={`nav-link text-active-primary pb-4 ${activeTab === 'paired_with' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('paired_with')}
                                            role="tab"
                                        >
                                            Paired With
                                        </button>
                                    </li>
                                </ul>

                                <div className="tab-content">
                                    {activeTab === 'general' && (
                                        <div className="tab-pane fade active show" id="kt_ecommerce_add_product_general"
                                             role="tabpanel">
                                            <div className="d-flex flex-column gap-7 gap-lg-10">
                                                <ProductGeneralDetails form={form} setForm={setForm} formik={formik}
                                                                       languages={languages}/>
                                                <ProductMedia form={form} setForm={setForm} formik={formik}/>
                                                <ProductPricing form={form} setForm={setForm} formik={formik}/>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'advanced' && (
                                        <div className="tab-pane fade active show"
                                             id="kt_ecommerce_add_product_advanced"
                                             role="tabpanel">
                                            <div className="d-flex flex-column gap-7 gap-lg-10">
                                                <ProductInventory form={form} setForm={setForm} formik={formik}/>
                                                <ProductHighlights form={form} setForm={setForm} formik={formik}/>
                                                <ProductMetaOptions form={form} setForm={setForm} formik={formik}
                                                                    languages={languages}/>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'nutrition_details' && (
                                        <div className="tab-pane fade active show"
                                             id="kt_ecommerce_add_product_nutrition_details" role="tabpanel">
                                            <div className="d-flex flex-column gap-7 gap-lg-10">
                                                <NutritionDetails form={form} setForm={setForm} formik={formik}/>
                                                <ProductClaims form={form} setForm={setForm} formik={formik}/>
                                                <ProductIngredients form={form} setForm={setForm} formik={formik}/>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'paired_with' && (
                                        <div className="tab-pane fade active show"
                                             id="kt_ecommerce_add_product_paired_with"
                                             role="tabpanel">
                                            <div className="d-flex flex-column gap-7 gap-lg-10">
                                                <ProductPairedWith form={form} setForm={setForm} formik={formik}/>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="d-flex justify-content-end">
                                    <WickFormFooter cancelUrl={'/commerce/products'}/>
                                </div>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}

export default ProductEdit;
