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
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";
import {getErrorPage, submitRequest} from "../../../../helpers/requests.ts";
import {Subject} from "../../../../models/contact/Subject.ts";
import {getAllSubjects} from "../../../../requests/misc/Subject.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    showFilter: boolean,
    setExportQuery: Dispatch<React.SetStateAction<string>>
}

const ContactSubmissionIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();
    const navigate = useNavigate()

    // const [filters, setFilters] = useState<FilterFields>();
    const [reset, setReset] = useState<boolean>(false);
    const [filters, setFilters] = useState<FilterFields>(defaultFilterFields);
    const [subjects, setSubjects] = useState<Subject[]>([])

    useEffect(() => {
        submitRequest(getAllSubjects, [], (response) => {
            const errorPage = getErrorPage(response)

            if (errorPage) {
                navigate(errorPage)
            } else {
                setSubjects(response)
            }
        })

    }, []);

    const multiSelectChangeHandler = (e: any, key: string) => {
        if (!reset) {
            genericMultiSelectOnChangeHandler(e, undefined, filters, setFilters, key)
        }
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

        subjectsSelectRef.current?.clearValue()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    const resetFilter = () => {
        setFilters(defaultFilterFields);
        setReset(true);
    }

    const subjectsSelectRef = useRef<any>(null)

    return (
        <Collapse in={showFilter}>
            <Row id='#contact-submissions-list-filter'>
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
                                            <Col md={4}>
                                                <WickFormLabel text="Email" isRequired={false}/>

                                                <Field className="form-control fs-base" type="text"
                                                       placeholder="Filter by email" name="email"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="email" className="mt-2"/>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <WickFormLabel text="Subject(s)" isRequired={false}/>

                                                <Select
                                                    isMulti
                                                    name='subject_ids'
                                                    options={subjects}
                                                    getOptionLabel={(instance) => instance.name[DEFAULT_LANGUAGE]}
                                                    getOptionValue={(instance) => instance.id.toString()}
                                                    onChange={(e) => multiSelectChangeHandler(e, 'subject_ids')}
                                                    ref={subjectsSelectRef}
                                                    placeholder='Filter by subject(s)'
                                                    isClearable={true}
                                                />

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="subject_ids" className="mt-2"/>
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

export default ContactSubmissionIndexFilter;