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
import {Collection} from "../../../../models/misc/Collection.ts";
import {getErrorPage, submitRequest} from "../../../../helpers/requests.ts";
import {getAllCollections} from "../../../../requests/misc/Collection.ts";
import {useNavigate} from "react-router-dom";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";
import Select from "react-select";

interface Props {
    showFilter: boolean,
    setExportQuery: Dispatch<React.SetStateAction<string>>
}

const RecipeIndexFilter: React.FC<Props> = ({showFilter, setExportQuery}) => {
    const {updateState} = useQueryRequest();
    const navigate = useNavigate()

    // const [filters, setFilters] = useState<FilterFields>();
    const [reset, setReset] = useState<boolean>(false);
    const [filters, setFilters] = useState<FilterFields>(defaultFilterFields);
    const [collections, setCollections] = useState<Collection[]>([])

    useEffect(() => {
        submitRequest(getAllCollections, [], (response) => {
            const errorPage = getErrorPage(response)

            if (errorPage) {
                navigate(errorPage)
            } else {
                setCollections(response)
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

        collectionsSelectRef.current?.clearValue()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    const resetFilter = () => {
        setFilters(defaultFilterFields);
        setReset(true);
    }

    const collectionsSelectRef = useRef<any>(null)

    return (
        <Collapse in={showFilter}>
            <Row id='#recipes-list-filter'>
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
                                                <WickFormLabel text="Title" isRequired={false}/>

                                                <Field className="form-control fs-base" type="text"
                                                       placeholder="Filter by title" name="title"/>

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="title" className="mt-2"/>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <WickFormLabel text="Collection(s)" isRequired={false}/>

                                                <Select
                                                    isMulti
                                                    name='collection_ids'
                                                    options={collections}
                                                    getOptionLabel={(instance) => instance.name[DEFAULT_LANGUAGE]}
                                                    getOptionValue={(instance) => instance.id.toString()}
                                                    onChange={(e) => multiSelectChangeHandler(e, 'collection_ids')}
                                                    ref={collectionsSelectRef}
                                                    placeholder='Filter by collection(s)'
                                                    isClearable={true}
                                                />

                                                <div className="mt-1 text-danger">
                                                    <ErrorMessage name="collection_ids" className="mt-2"/>
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

export default RecipeIndexFilter;