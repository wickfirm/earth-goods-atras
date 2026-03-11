import React from 'react'
import {DEFAULT_LANGUAGE} from "../../helpers/settings.ts";
import {ErrorMessage, Field} from "formik";
import {Language} from "../../models/Options.ts";
import WickFormLabel from "./WickFormLabel.tsx";

type Props = {
    field: string;
    placeholder: string;
    isRequired?: boolean;
    languages: Language[];
}

const WickLanguageTextFields: React.FC<Props> = ({field, placeholder, isRequired, languages}) => {
    return (
        <>
            {languages.map((language) => (
                <div className="col-12" key={`${field}-language-${language.id}`}>
                    <div className="mb-3">
                        <WickFormLabel
                            text={`${placeholder}`}
                            isRequired={isRequired && language.id === DEFAULT_LANGUAGE}
                        />
                        <Field
                            className="form-control fs-base"
                            type="text"
                            placeholder={`Enter ${placeholder.toLowerCase()}`}
                            name={`${field}.${language.id}`}
                        />
                        <div className="mt-1 text-danger">
                            <ErrorMessage name={`${field}.${language.id}`} component="div"/>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default WickLanguageTextFields;