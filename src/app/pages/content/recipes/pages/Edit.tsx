import {Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator";
import {getErrorPage, submitRequest} from '../../../../helpers/requests';
import {Sections} from "../../../../helpers/sections";
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import FormErrors from "../../../../components/forms/FormErrors.tsx";
import {defaultFormFields, fillEditForm, FormFields, recipeSchema} from "../core/form.ts";
import WickFormFooter from "../../../../components/forms/WickFormFooter.tsx";
import RecipeThumbnail from "../partials/RecipeThumbnail.tsx";
import RecipeGeneralDetails from "../partials/RecipeGeneralDetails.tsx";
import RecipeRelatedProduct from "../partials/RecipeRelatedProduct.tsx";
import {getRecipe, updateRecipe} from "../../../../requests/content/Recipe.ts";
import {Recipe} from "../../../../models/content/Recipe.ts";
import {scrollToTop} from "../../../../helpers/general.ts";
import {useMain} from "../../../shared/MainContext.loader.tsx";
import RecipeCollection from "../partials/RecipeCollection.tsx";
import RecipeBanner from "../partials/RecipeBanner.tsx";
import RecipeMetaOptions from "../partials/RecipeMetaOptions.tsx";


const RecipeEdit: React.FC = () => {
    const {id} = useParams();
    const wickApp = useWickApp();
    const navigate = useNavigate();
    const {options} = useMain()

    const {languages} = options

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [form, setForm] = useState<FormFields>(defaultFormFields)
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<string>('general');

    useEffect(() => {
        if (id) {
            submitRequest(getRecipe, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    setRecipe(response);
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (recipe) {
            wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_RECIPES, PageTypes.EDIT, recipe?.title.en))

            setForm(fillEditForm(recipe))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipe]);

    const handleEdit = (values: FormFields, fns: any) => {
        if (recipe) {
            submitRequest(
                updateRecipe,
                [recipe.id, values],
                (response) => {
                    wickApp.setAlert({
                        message: new AlertMessageGenerator('recipe', Actions.EDIT, WickToastType.SUCCESS)
                            .message,
                        type: WickToastType.SUCCESS,
                    })

                    setRecipe(response)

                    setFormErrors([])

                    window.location.reload()
                },
                setFormErrors,
                fns
            )

            scrollToTop()
        }
    };

    return (
        <>
            <FormErrors errorMessages={formErrors}/>

            <Formik initialValues={form} validationSchema={recipeSchema} onSubmit={handleEdit}
                    enableReinitialize>
                {
                    (formik) => (
                        <Form placeholder={undefined}
                              className="form d-flex flex-column flex-lg-row">
                            {/*Aside column*/}
                            <div className="d-flex flex-column gap-7 mb-7 me-lg-10"
                                 style={{width: '300px', flexShrink: 0}}>
                                <RecipeThumbnail form={form} setForm={setForm} formik={formik}/>
                                <RecipeBanner form={form} setForm={setForm} formik={formik}/>
                            </div>
                            {/*Main column*/}
                            <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
                                <ul className="nav nav-wick nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2"
                                    role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            type="button"
                                            className={`nav-link text-active-twfirm pb-4 ${activeTab === 'general' ? 'active border-twfirm' : ''}`}
                                            onClick={() => setActiveTab('general')}
                                            role="tab"
                                        >
                                            General
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button
                                            type="button"
                                            className={`nav-link text-active-twfirm pb-4 ${activeTab === 'advanced' ? 'active border-twfirm' : ''}`}
                                            onClick={() => setActiveTab('advanced')}
                                            role="tab"
                                        >
                                            Advanced
                                        </button>
                                    </li>
                                </ul>

                                <div className="tab-content">
                                    {activeTab === 'general' && (
                                        <div className="tab-pane fade active show" id="kt_ecommerce_add_product_general"
                                             role="tabpanel">
                                            <div className="d-flex flex-column gap-7 gap-lg-10">
                                                <div className="accordion" id="kt_accordion_1">
                                                    {languages.map((language, index) => (
                                                        <div className="accordion-item"
                                                             key={`recipes-accordion-item-${index}`}>
                                                            <h2 className="accordion-header"
                                                                id="kt_accordion_1_header_1">
                                                                <button
                                                                    className={`accordion-button fs-4 fw-bold`}
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target={`#kt_accordion_1_body_${index}`}
                                                                    aria-expanded={false}
                                                                    aria-controls={`kt_accordion_1_body_${index}`}
                                                                    style={{color: "#36563D"}}
                                                                >
                                                                    {language.name} Details
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id={`kt_accordion_1_body_${index}`}
                                                                className={`accordion-collapse collapse show`}
                                                                aria-labelledby={`kt_accordion_${index}_header_${index}`}
                                                                data-bs-parent={`#kt_accordion_${index}`}
                                                            >
                                                                <div className="accordion-body">
                                                                    <RecipeGeneralDetails formik={formik}
                                                                                          language={language}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'advanced' && (
                                        <div className="tab-pane fade active show"
                                             id="kt_ecommerce_add_product_advanced"
                                             role="tabpanel">
                                            <div className="d-flex flex-column gap-7 gap-lg-10">
                                                <RecipeCollection form={form} setForm={setForm} formik={formik}/>
                                                <RecipeRelatedProduct formik={formik}/>
                                                <RecipeMetaOptions form={form} setForm={setForm} formik={formik}
                                                                   languages={languages}/>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="d-flex justify-content-end">
                                    <WickFormFooter cancelUrl={'/content/recipes'}/>
                                </div>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}

export default RecipeEdit;
