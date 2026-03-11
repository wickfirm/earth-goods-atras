import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import React from "react";
import {useProduct} from "../core/ProductContext.loader.tsx";
import Select from "react-select";
import {genericMultiSelectOnChangeHandler, genericSingleSelectOnChangeHandler} from "../../../../helpers/form.ts";
import {FormFields} from "../core/form.ts";
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";
import {FormikProps} from "formik";
import WickSwitch from "../../../../components/forms/WickSwitch.tsx";

interface Props {
    form: FormFields;
    setForm: React.Dispatch<React.SetStateAction<FormFields>>;
    formik: FormikProps<FormFields>;
}

const ProductDetails: React.FC<Props> = ({form, setForm, formik}) => {
    const {options} = useProduct()
    const {categories, lifestyles} = options

    return (
        <KTCard className="py-4">
            <KTCardHeader text="Product Details" className="border-0"/>

            <KTCardBody className="pt-0">
                <div className="mb-8">
                    <label className="required form-label">Category</label>
                    <Select name="category_id"
                            value={categories.find((category) => category.id === form.category_id)}
                            options={categories}
                            getOptionLabel={(category) => category.name[DEFAULT_LANGUAGE]}
                            getOptionValue={(category) => category.id.toString()}
                            onChange={(e) => genericSingleSelectOnChangeHandler(e, formik, form, setForm, 'category_id')}
                            className="mb-2"/>

                    <div className="text-muted fs-7">Add product to a category.</div>

                    <div className="mt-2 mb-2 text-danger">
                        {formik.errors?.category_id ? formik.errors?.category_id : null}
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Lifestyle</label>
                    <Select isMulti name="lifestyle_ids"
                            options={lifestyles}
                            getOptionLabel={(lifestyle) => lifestyle.name[DEFAULT_LANGUAGE]}
                            getOptionValue={(lifestyle) => lifestyle.id.toString()}
                            onChange={(e) => genericMultiSelectOnChangeHandler(e, formik, form, setForm, 'lifestyle_ids')}
                            value={lifestyles.filter((lifestyle) => form.lifestyle_ids?.includes(lifestyle.id))}
                            className="mb-2"/>

                    <div className="text-muted fs-7">Set the product lifestyle(s).</div>

                    <div className="mt-2 mb-2 text-danger">
                        {formik.errors?.lifestyle_id ? formik.errors?.lifestyle_id : null}
                    </div>
                </div>

                <div className="d-flex flex-stack mb-5">
                    <div className="me-5">
                        <label className="fs-6 fw-semibold">Is Featured?</label>

                        <div className="fs-7 fw-semibold text-muted">
                            Specify whether the product should be highlighted and showcased in the Featured Products
                            carousel
                        </div>
                    </div>

                    <WickSwitch name="is_featured" onChangeHandler={(e) => {
                        e.stopPropagation();
                        setForm({...form, is_featured: Number(!form.is_featured)});
                        formik.setFieldValue("is_featured", Number(!form.is_featured))
                    }} defaultValue={Boolean(form.is_featured)}/>
                </div>

                <div className={'separator'} />
                <div className="d-flex flex-stack mt-5">
                    <div className="me-5">
                        <label className="fs-6 fw-semibold">Hide this product from the public website</label>

                        <div className="fs-7 fw-semibold text-muted">
                            Enable this option to prevent the product from being visible or accessible on the public-facing site. It will still be available in the admin panel.

                        </div>
                    </div>

                    <WickSwitch name="hide" onChangeHandler={(e) => {
                        e.stopPropagation();
                        setForm({...form, hide: Number(!form.hide)});
                        formik.setFieldValue("hide", Number(!form.hide))
                    }} defaultValue={Boolean(form.hide)}/>
                </div>

            </KTCardBody>
        </KTCard>
    )
}

export default ProductDetails;