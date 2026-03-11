import {FormFields} from "../../core/form.ts";
import React from "react";
import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";
import Select from "react-select";
import {genericMultiSelectOnChangeHandler} from "../../../../../helpers/form.ts";
import {useProduct} from "../../core/ProductContext.loader.tsx";
import {DEFAULT_LANGUAGE} from "../../../../../helpers/settings.ts";
import {FormikProps} from "formik";

interface Props {
    form: FormFields;
    setForm: React.Dispatch<React.SetStateAction<FormFields>>;
    formik: FormikProps<FormFields>;
}

const ProductIngredients: React.FC<Props> = ({form, setForm, formik}) => {
    const {options} = useProduct()
    const {ingredients} = options

    return (
        <KTCard className="py-4">
            <div className="card-header border-0">
                <div className="card-title">
                    <h3 className={`card-label`}>Omitted Ingredients</h3>
                </div>
            </div>

            <KTCardBody className="pt-0">
                <Select isMulti name="omitted_ingredient_ids"
                        options={ingredients}
                        getOptionLabel={(ingredient) => ingredient.name[DEFAULT_LANGUAGE]}
                        getOptionValue={(ingredient) => ingredient.id.toString()}
                        onChange={(e) => genericMultiSelectOnChangeHandler(e, formik, form, setForm, 'omitted_ingredient_ids')}
                        value={ingredients.filter((ingredient) => form.omitted_ingredient_ids?.includes(ingredient.id))}
                        className="mb-2"/>

                <div className="text-muted fs-7">Specify the ingredients that are not present in the products.</div>
            </KTCardBody>
        </KTCard>
    )
}

export default ProductIngredients;