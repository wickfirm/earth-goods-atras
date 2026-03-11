import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {Dispatch, useEffect, useState} from 'react';
import {Col, Collapse, Row} from 'react-bootstrap';

import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider.loader.ts';
import {defaultFilterFields, FilterFields, FilterSchema} from '../core/filterForm';
import {
    genericFilterHandler,
    genericOnChangeHandler,
    genericSingleSelectOnChangeHandler
} from "../../../../helpers/form.ts";
import FilterFormFooter from "../../../../components/forms/FilterFormFooter.tsx";
import WickFormLabel from "../../../../components/forms/WickFormLabel.tsx";
import {useProduct} from "../../products/core/ProductContext.loader.tsx";
import Select from "react-select";

interface Props {
    showFilter: boolean,
    setExportQuery: Dispatch<React.SetStateAction<string>>
}

const DiscountCodeIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();
    const {options} = useProduct()
    const {discountTypes} = options

    // const [filters, setFilters] = useState<FilterFields>();
    const [reset, setReset] = useState<boolean>(false);
    const [filters, setFilters] = useState<FilterFields>(defaultFilterFields);

    const onChangeHandler = (e: React.FormEvent<HTMLFormElement>) => {
        genericOnChangeHandler(e, filters, setFilters);
    };

    const handleFilter = () => {
        genericFilterHandler(setExportQuery, filters, updateState, reset);
    }

    useEffect(() => {
        handleFilter();
        setReset(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    const resetFilter = () => {
        setFilters(defaultFilterFields);
        setReset(true);
    }

    return (
        <Collapse in={showFilter}>
            <Row id='#discount-codes-list-filter'>
                <Col>
                    <div className="card-rounded bg-twfirm bg-opacity-5 p-10 mb-15">
                        <Formik initialValues={defaultFilterFields} validationSchema={FilterSchema}
                                onSubmit={handleFilter}
                                enableReinitialize>
                            {
                                (formik) => (
                                    <Form onChange={onChangeHandler} placeholder={undefined}>
                                        <Row>
                                            <Col md={4}>
                                                <WickFormLabel text="Code" isRequired={false}/>

                                                <Field className="form-control fs-base" type="text"
                                                       placeholder="Filter by code" name="code"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="code" className="mt-2"/>
                                                </div>
                                            </Col>

                                            <Col md={4}>
                                                <WickFormLabel text="Type" isRequired={false}/>

                                                <Select name="type"
                                                        options={discountTypes}
                                                        getOptionLabel={(discountType) => discountType.name}
                                                        getOptionValue={(discountType) => discountType.id.toString()}
                                                        onChange={(e) => genericSingleSelectOnChangeHandler(e, formik, filters, setFilters, 'type')}
                                                        className="mb-2"/>


                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="type" className="mt-2"/>
                                                </div>
                                            </Col>
                                        </Row>

                                        <FilterFormFooter resetFilter={resetFilter}/>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </Col>
            </Row>
        </Collapse>
    );
}

export default DiscountCodeIndexFilter;