import React, {useEffect, useState} from "react";
import Select from "react-select";
import {getErrorPage, submitRequest} from "../../../../helpers/requests.ts";
import {useNavigate} from "react-router-dom";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {genericMultiSelectOnChangeHandler} from "../../../../helpers/form.ts";
import {FormFields} from "../core/form.ts";
import {FormikProps} from "formik";
import {getAllCollections} from "../../../../requests/misc/Collection.ts";
import {Collection} from "../../../../models/misc/Collection.ts";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";

interface Props {
    formik: FormikProps<FormFields>;
    form: FormFields
    setForm: React.Dispatch<React.SetStateAction<FormFields>>
}

const RecipeCollection: React.FC<Props> = ({formik, form, setForm}) => {
    const navigate = useNavigate()
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

    return (
        <KTCard className="py-4">
            <div className="card-header border-0">
                <div className="card-title">
                    <h3 className={`card-label`}>Collections</h3>
                </div>
            </div>

            <KTCardBody className="pt-0">
                <Select isMulti name="collection_ids"
                        options={collections}
                        getOptionLabel={(collection) => collection.name[DEFAULT_LANGUAGE]}
                        getOptionValue={(collection) => collection.id.toString()}
                        onChange={(e) => genericMultiSelectOnChangeHandler(e, formik, form, setForm, 'collection_ids')}
                        value={collections.filter((collection) => form.collection_ids?.includes(collection.id))}
                        className="mb-2"/>

                {/*<Select name="collection_id"*/}
                {/*        value={collections.find((collection) => collection.id === form.collection_id)}*/}
                {/*        options={collections}*/}
                {/*        getOptionLabel={(collection) => collection.name[DEFAULT_LANGUAGE]}*/}
                {/*        getOptionValue={(collection) => collection.id.toString()}*/}
                {/*        onChange={(e) => genericSingleSelectOnChangeHandler(e, formik, form, setForm, 'collection_id')}*/}
                {/*        className="mb-2"/>*/}

                <div className="text-muted fs-7">Add recipe to a collection(s).</div>
            </KTCardBody>
        </KTCard>
    )
}

export default RecipeCollection;