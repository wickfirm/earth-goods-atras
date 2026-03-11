import {FormFields} from "../../core/form.ts";
import React, {useEffect, useState} from "react";
import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";
import {Field, FormikProps} from "formik";
import {useProduct} from "../../core/ProductContext.loader.tsx";
import Select from "react-select";
import {DEFAULT_LANGUAGE} from "../../../../../helpers/settings.ts";

interface Props {
    form: FormFields
    setForm: React.Dispatch<React.SetStateAction<FormFields>>
    formik: FormikProps<FormFields>;
}

interface AttributeRow {
    attribute_id: number | null;
    quantity: string;
}

const NutritionDetails: React.FC<Props> = ({form, setForm, formik}) => {
    const {options} = useProduct();
    const {attributes} = options;

    const [rows, setRows] = useState<AttributeRow[]>(form.attributes || [{attribute_id: null, quantity: ''}]);

    // Update form state whenever rows change
    useEffect(() => {
        setForm((prevForm: any) => ({
            ...prevForm,
            attributes: rows,
        }));
        formik.setFieldValue('attributes', rows)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rows, setForm]);

    const handleAddRow = () => {
        setRows((prevRows) => [...prevRows, {attribute_id: null, quantity: ''}]);
    };

    const handleRemoveRow = (index: number) => {
        if (rows.length === 1) {
            // Reset values if there's only one row left
            setRows([{attribute_id: null, quantity: ''}]);
        } else {
            setRows((prevRows) => prevRows.filter((_, rowIndex) => rowIndex !== index));
        }
    };

    const handleAttributeChange = (selectedOption: any, index: number) => {
        const newRows = [...rows];
        newRows[index].attribute_id = selectedOption ? selectedOption.id : null;
        setRows(newRows);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newRows = [...rows];
        newRows[index].quantity = e.target.value;
        setRows(newRows);
    };

    return (
        <KTCard className="py-4">
            <div className="card-header border-0">
                <div className="card-title">
                    <h3 className={`card-label`}>Nutrition Details</h3>
                </div>
            </div>

            <KTCardBody className="pt-0">
                <div className="row">
                    <div className="col-12">
                        <label className="form-label">Serving Size <small><b>(g)</b></small></label>

                        <div className="row">
                            <div className="col-4">
                                <div className="mb-10">
                                    <Field className="form-control fs-base mb-2" type="number"
                                           placeholder="Enter the serving size" name="serving_size"/>

                                    <div className="mt-2 mb-2 text-danger">
                                        {formik.errors?.serving_size ? formik.errors?.serving_size : null}
                                    </div>

                                    <div className="text-muted fs-7">Enter the serving size (in g).</div>
                                </div>
                            </div>
                            <div className="col-8">
                                {rows.map((row, index) => (
                                    <div key={index} className="row form-group">
                                        <div className="col-5">
                                            <Select
                                                name={`attributes[${index}].attribute_id`}
                                                options={attributes}
                                                getOptionLabel={(attribute) => attribute.name[DEFAULT_LANGUAGE]}
                                                getOptionValue={(attribute) => attribute.id.toString()}
                                                value={attributes.find((attr) => attr.id === row.attribute_id) || null}
                                                onChange={(selectedOption) => handleAttributeChange(selectedOption, index)}
                                                className="mb-2"
                                                placeholder="Select attribute"
                                            />
                                        </div>
                                        <div className="col-5">
                                            <input
                                                className="form-control fs-base mb-2"
                                                type="text"
                                                placeholder="Enter the quantity"
                                                name={`attributes[${index}].quantity`}
                                                value={row.quantity}
                                                onChange={(e) => handleQuantityChange(e, index)}
                                            />
                                        </div>
                                        <div className="col-2">
                                            <button
                                                type="button"
                                                className="btn btn-icon btn-sm btn-active-light-danger"
                                                onClick={() => handleRemoveRow(index)}
                                            >
                                                <i className="fa fa-trash fs-5 text-danger"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button type="button" className="btn btn-light-primary btn-sm" onClick={handleAddRow}>
                                    <i
                                        className="ki-duotone ki-plus fs-2"></i> Add Attribute
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </KTCardBody>
        </KTCard>
    )
}

export default NutritionDetails;