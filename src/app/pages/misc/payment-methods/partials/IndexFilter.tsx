import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {Dispatch, useEffect, useState} from 'react';
import {Col, Collapse, Row} from 'react-bootstrap';

import {useQueryRequest} from '../../../../modules/table/QueryRequestProvider.loader.ts';
import {defaultFilterFields, FilterFields, FilterSchema} from '../core/filterForm';
import {genericFilterHandler, genericOnChangeHandler} from "../../../../helpers/form.ts";
import FilterFormFooter from "../../../../components/forms/FilterFormFooter.tsx";
import WickFormLabel from "../../../../components/forms/WickFormLabel.tsx";

interface Props {
    showFilter: boolean,
    setExportQuery: Dispatch<React.SetStateAction<string>>
}

const PaymentMethodIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();

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
            <Row id='#payment-methods-list-filter'>
                <Col>
                    <div className="card-rounded bg-twfirm bg-opacity-5 p-10 mb-15">
                        <Formik initialValues={defaultFilterFields} validationSchema={FilterSchema}
                                onSubmit={handleFilter}
                                enableReinitialize>
                            {
                                () => (
                                    <Form onChange={onChangeHandler} placeholder={undefined}>
                                        <Row>
                                            <Col md={4}>
                                                <WickFormLabel text="Name" isRequired={false}/>

                                                <Field className="form-control fs-base" type="text"
                                                       placeholder="Filter by name" name="name"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="name" className="mt-2"/>
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

export default PaymentMethodIndexFilter;