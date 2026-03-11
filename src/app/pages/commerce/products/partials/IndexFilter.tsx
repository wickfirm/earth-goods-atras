import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {Dispatch, useEffect, useRef, useState} from 'react';
import {Col, Collapse, Row} from 'react-bootstrap';

import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider.loader.ts';
import {defaultFilterFields, FilterFields, FilterSchema} from '../core/filterForm';
import {
    genericFilterHandler,
    genericMultiSelectOnChangeHandler,
    genericOnChangeHandler
} from "../../../../helpers/form.ts";
import FilterFormFooter from "../../../../components/forms/FilterFormFooter.tsx";
import WickFormLabel from "../../../../components/forms/WickFormLabel.tsx";
import Select from "react-select";
import {useProduct} from "../core/ProductContext.loader.tsx";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";
import {TagsInput} from "react-tag-input-component";
import TagsSelector from "../../../../components/forms/TagsSelector.tsx";

interface Props {
    showFilter: boolean,
    setExportQuery: Dispatch<React.SetStateAction<string>>
}

const ProductIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();
    const {options} = useProduct()
    const {categories, productStatuses} = options

    // const [filters, setFilters] = useState<FilterFields>();
    const [reset, setReset] = useState<boolean>(false);
    const [filters, setFilters] = useState<FilterFields>(defaultFilterFields);

    const multiSelectChangeHandler = (e: any, key: string) => {
        genericMultiSelectOnChangeHandler(e, undefined, filters, setFilters, key)
    }

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

        statusesSelectRef.current?.clearValue()
        categoriesSelectRef.current?.clearValue()
    }

    const statusesSelectRef = useRef<any>(null)
    const categoriesSelectRef = useRef<any>(null)


    return (
        <Collapse in={showFilter}>
            <Row id='#products-list-filter'>
                <Col>
                    <div className="card-rounded bg-twfirm bg-opacity-5 p-10 mb-15">
                        <Formik initialValues={defaultFilterFields} validationSchema={FilterSchema}
                                onSubmit={handleFilter}
                                enableReinitialize>
                            {
                                () => (
                                    <Form onChange={onChangeHandler} placeholder={undefined}>
                                        <Row>
                                            <Col md={6}>
                                                <WickFormLabel text="Name" isRequired={false}/>

                                                <Field className="form-control fs-base" type="text"
                                                       placeholder="Filter by name" name="name"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="name" className="mt-2"/>
                                                </div>
                                            </Col>

                                            <Col md={6}>
                                                <WickFormLabel text='Category(ies)' isRequired={false}/>

                                                <Select
                                                    isMulti
                                                    name='category_ids'
                                                    options={categories}
                                                    getOptionLabel={(instance) => instance.name[DEFAULT_LANGUAGE]}
                                                    getOptionValue={(instance) => instance.id.toString()}
                                                    onChange={(e) => multiSelectChangeHandler(e, 'category_ids')}
                                                    ref={categoriesSelectRef}
                                                    placeholder='Filter by category(ies)'
                                                    isClearable={true}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <WickFormLabel text="SKU" isRequired={false}/>

                                                <Field className="form-control fs-base" type="text"
                                                       placeholder="Filter by sku" name="sku"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="sku" className="mt-2"/>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <WickFormLabel text='Status(es)' isRequired={false}/>

                                                <Select
                                                    isMulti
                                                    name='status_ids'
                                                    options={productStatuses}
                                                    getOptionLabel={(instance) => instance.name}
                                                    getOptionValue={(instance) => instance.id.toString()}
                                                    onChange={(e) => multiSelectChangeHandler(e, 'status_ids')}
                                                    ref={statusesSelectRef}
                                                    placeholder='Filter by status(es)'
                                                    isClearable={true}
                                                />
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

export default ProductIndexFilter;