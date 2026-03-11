import {Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {BulkFormFields, defaultBulkFormFields, productAddBulkSchema} from "../core/form.ts";
import FormErrors from "../../../../components/forms/FormErrors.tsx";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import WickFormFooter from "../../../../components/forms/WickFormFooter.tsx";
import UploadFile from "../partials/AddBulk/UploadFile.tsx";
import {createFormData, getErrorPage, submitRequest} from "../../../../helpers/requests.ts";
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator.ts";
import {getAllProducts, getProductUploadedFiles, storeBulkProducts} from "../../../../requests/commerce/Product.ts";
import {Link, useNavigate} from "react-router-dom";
import {ProductUploadedFile} from "../../../../models/commerce/Product.ts";
import {storageUrl} from "../../../../helpers/general.ts";
import {Button} from "react-bootstrap";

const ProductAddBulk: React.FC = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate()

    const [productUploadedFiles, setProductUploadedFiles] = useState<ProductUploadedFile[]>([])
    const [form, setForm] = useState<BulkFormFields>(defaultBulkFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // New loading state

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle('Bulk ' + Sections.COMMERCE_PRODUCTS, PageTypes.CREATE))

        getAllProductUploadedFiles()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = (values: BulkFormFields,fns: any) => {
        setLoading(true); // Set loading to true
        // send API request to create the product
        submitRequest(storeBulkProducts, [values], () => {
            // it's product for sure
            wickApp.setAlert({
                message: new AlertMessageGenerator('product', Actions.CREATE, WickToastType.SUCCESS).message,
                type: WickToastType.SUCCESS
            })

            setLoading(false);
            getAllProductUploadedFiles()
            // navigate(`/commerce/products`);
        }, setFormErrors, fns);
    };

    const getAllProductUploadedFiles = () => {
        // get the list of all product uploaded files
        submitRequest(getProductUploadedFiles, [], (response) => {
            const errorPage = getErrorPage(response)

            if (errorPage) {
                navigate(errorPage)
            } else {
                setProductUploadedFiles(response)
            }
        })
    }

    return (
        <KTCard>
            <KTCardHeader text="Add Bulk Products"/>

            <KTCardBody>
                <FormErrors errorMessages={formErrors}/>

                <Formik initialValues={defaultBulkFormFields} validationSchema={productAddBulkSchema}
                        onSubmit={handleCreate}
                        enableReinitialize>
                    {
                        (formik) => (
                            <Form placeholder={undefined}>
                                <div className="w-100">
                                    <div className="pb-10 pb-lg-12">
                                        <h1 className="fw-bold text-gray-900">Bulk Product Upload</h1>

                                        <div className="text-muted fw-semibold fs-4">
                                            Easily upload an Excel file to quickly add multiple products to your
                                            inventory. For detailed instructions and formatting requirements, please
                                            review the&nbsp;<a
                                            href="https://docs.google.com/spreadsheets/d/1pOIkbWJwddImMhkMh2hctDQ46brPlmp_fN9WoZ687m0/edit?gid=0#gid=0"
                                            className="link-primary" target="_blank">Bulk Upload Template</a>.
                                        </div>
                                    </div>

                                    <UploadFile form={form} setForm={setForm} formik={formik}/>
                                </div>

                                {loading && (
                                    <span className="wick-loader mt-2 mb-4"></span>
                                )}

                                <>
                                    <div className="separator mb-6"></div>

                                    <div className="d-flex justify-content-end">
                                        <Button variant="twfirm" type="submit" className={'me-2'}
                                                disabled={formik.isSubmitting}>
                                            {
                                                formik.isSubmitting && (
                                                    <span className='indicator-progress' style={{display: 'inline-block'}}>
                                                        <span
                                                            className='spinner-border spinner-border-sm align-middle me-2'/> Please wait ...
                                                    </span>
                                                )
                                            }

                                            {
                                                !formik.isSubmitting && 'Submit'
                                            }
                                        </Button>

                                        <Link to="/commerce/products">
                                            <Button variant="light-secondary" type="submit">
                                                Cancel
                                            </Button>
                                        </Link>
                                    </div>
                                </>
                                {/*<WickFormFooter cancelUrl={'/commerce/products'}/>*/}
                            </Form>
                        )
                    }
                </Formik>

                <div className="mb-10">
                    <label className="fs-6 fw-semibold mb-2">Uploaded File(s)</label>

                    <div className="mh-300px scroll-y me-n7 pe-7">
                        {
                            productUploadedFiles && productUploadedFiles.length > 0 && productUploadedFiles.map((productUploadedFile) => {
                                return (
                                    <div className="d-flex flex-stack py-4 ">
                                        <div className="d-flex align-items-center">
                                            <div className="symbol symbol-35px">
                                                <img src="/media/svg/files/doc.svg"
                                                     alt="icon"/>
                                            </div>

                                            <div className="ms-6">
                                                <a href={storageUrl(productUploadedFile.file)}
                                                    className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
                                                    {productUploadedFile.file_name}
                                                </a>
                                                <div className="fw-semibold text-muted">{(productUploadedFile.file_size / (1024 * 1024)).toFixed(2)}MB</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </KTCardBody>
        </KTCard>
    )
}

export default ProductAddBulk;
