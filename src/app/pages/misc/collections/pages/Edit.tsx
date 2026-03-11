import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import * as Yup from 'yup';

import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import {KTCardHeader} from '../../../../../_metronic/helpers/components/KTCardHeader';
import FormErrors from '../../../../components/forms/FormErrors';
import WickFormFooter from '../../../../components/forms/WickFormFooter.tsx';
import WickFormLabel from '../../../../components/forms/WickFormLabel.tsx';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {genericOnChangeHandler} from '../../../../helpers/form';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {Collection} from '../../../../models/misc/Collection';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {getCollection, updateCollection} from '../../../../requests/misc/Collection';
import {defaultFormFields, FormFields} from "../core/form.ts";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";


const CollectionEdit: React.FC = () => {
    const [collection, setCollection] = useState<Collection | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const wickApp = useWickApp();

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            // get the collection we need to edit from the database
            submitRequest(getCollection, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    // we were able to fetch current collection to edit
                    setCollection(response);
                    setForm(response)
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (collection) {
            wickApp.setPageTitle(generatePageTitle(Sections.MISC_COLLECTIONS, PageTypes.EDIT, collection.name[DEFAULT_LANGUAGE]))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collection]);

    const EditCollectionSchema = Yup.object().shape({
        name: Yup.string().required()
    });

    const onChangeHandler = (e: React.FormEvent<HTMLFormElement>) => {
        genericOnChangeHandler(e, form, setForm);
    };

    const handleEdit = () => {
        // we need to update the collection's data by doing API call with form
        if (collection) {
            submitRequest(updateCollection, [collection.id, form], () => {
                // we got the updated collection so we're good
                wickApp.setAlert({
                    message: new AlertMessageGenerator('collection', Actions.EDIT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS
                })

                navigate(`/misc/collections`);
            }, setFormErrors);
        }
    }

    return (
        <KTCard>
            <KTCardHeader text="Edit Collection"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={form} validationSchema={EditCollectionSchema} onSubmit={handleEdit}
                        enableReinitialize>
                    {
                        () => (
                            <Form onChange={onChangeHandler} placeholder={undefined}>
                                <div className="mb-7">
                                    <WickFormLabel text="Name" isRequired={true}/>

                                    <Field className="form-control fs-base" type="text"
                                           placeholder="Enter collection name" name="name"/>

                                    <div className="mt-1 text-danger">
                                        <ErrorMessage name="name" className="mt-2"/>
                                    </div>
                                </div>

                                <WickFormFooter cancelUrl={'/misc/collections'}/>
                            </Form>
                        )
                    }
                </Formik>
            </KTCardBody>
        </KTCard>
    )
}

export default CollectionEdit;
