import React, {useCallback, useEffect, useState} from "react";
import {ErrorMessage, Field, FormikProps} from "formik";
import {Editor} from "primereact/editor";
import {FormFields} from "../core/form.ts";
import {Language} from "../../../../models/Options.ts";
import WickFormLabel from "../../../../components/forms/WickFormLabel.tsx";

interface Props {
    formik: FormikProps<FormFields>;
    language: Language;
}

interface AttributeRow {
    key: string;
    value: string;
}

interface ContentRow {
    columns: number;  // Number of editors in the row (1 or 2)
    contents: string[];  // Content for each editor
}

const BlogGeneralDetails: React.FC<Props> = ({formik, language}) => {
    const description = formik.getFieldProps('description').value[language.id];

    const [rows, setRows] = useState<AttributeRow[]>(formik.values.tags ?? [{key: '', value: ''}]);
    const [contentRows, setContentRows] = useState<ContentRow[]>([]);

    useEffect(() => {
        setRows(formik.values.tags)
    }, [formik.values.tags]);

    useEffect(() => {
        setContentRows(formik.values.contentSections)
    }, [formik.values.contentSections]);

    // Update form state whenever rows change
    useEffect(() => {
        formik.setFieldValue('tags', rows);
    }, [rows]);

    useEffect(() => {
        formik.setFieldValue('content_sections', contentRows);
    }, [contentRows]);

    const handleAddRow = () => {
        setRows((prevRows) => [...prevRows, {key: '', value: ''}]);
    };

    const handleRemoveRow = (index: number) => {
        setRows((prevRows) =>
            prevRows.length === 1 ? [{key: '', value: ''}] : prevRows.filter((_, rowIndex) => rowIndex !== index)
        );
    };

    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newRows = [...rows];
        newRows[index].key = e.target.value;
        setRows(newRows);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newRows = [...rows];
        newRows[index].value = e.target.value;
        setRows(newRows);
    };

    const handleDescriptionChange = useCallback(
        (e: any) => {
            if (description !== e.htmlValue) {
                const attr = `description.${language.id}`;
                formik.setFieldValue(attr, e.htmlValue);
            }
        },
        [formik]
    );

    // Add new editor row based on column count
    const addContentRow = (columns: number) => {
        const newContentRow = {
            columns,
            contents: Array(columns).fill(''),  // Initial content as empty strings for each column
        };
        setContentRows((prevRows) => [...prevRows, newContentRow]);
    };

    // Handle editor content changes for dynamic rows
    const handleEditorContentChange = (rowIndex: number, colIndex: number, htmlValue: string) => {
        setContentRows((prevRows) =>
            prevRows.map((row, rIdx) =>
                rIdx === rowIndex
                    ? {...row, contents: row.contents.map((content, cIdx) => (cIdx === colIndex ? htmlValue : content))}
                    : row
            )
        );
    };

    // Remove an editor row based on its index
    const handleRemoveContentRow = (index: number) => {
        setContentRows((prevRows) => prevRows.filter((_, rowIndex) => rowIndex !== index));
    };

    return (
        <>
            <div className="mb-10">
                <WickFormLabel text="Title" isRequired={true}/>

                <Field
                    className="form-control fs-base mb-2"
                    type="text"
                    placeholder="Enter blog title"
                    name={`title.${language.id}`}
                />

                <div className="mt-1 text-danger">
                    <ErrorMessage name={`title.${language.id}`} component="div"/>
                </div>

                <div className="text-muted fs-7">
                    A blog title is required and recommended to be unique.
                </div>
            </div>

            <div className="d-flex flex-column mb-4">
                <span className="fs-5 text-gray-700 fw-medium">Blog Content</span>
                <small className="text-muted">
                    Provide detailed content for the blog.
                </small>
            </div>

            <div className="mb-10">
                <WickFormLabel text="Opening Paragraph" isRequired={false}/>
                <Editor value={description ?? ''} onTextChange={handleDescriptionChange} style={{height: '150px'}}
                        className="mb-2"/>
            </div>

            {/* Tags and Add Row buttons */}
            <div className="row mb-10">
                <WickFormLabel text="Tags" isRequired={false}/>
                <div className="col-12">
                    {rows.map((row, index) => (
                        <div key={index} className="row form-group">
                            <div className="col-5">
                                <input
                                    className="form-control fs-base mb-2"
                                    type="text"
                                    placeholder="Enter the tag key"
                                    value={row.key}
                                    onChange={(e) => handleKeyChange(e, index)}
                                />
                            </div>
                            <div className="col-2">
                                <button
                                    type="button"
                                    className="btn btn-icon btn-sm btn-active-light-danger"
                                    onClick={() => handleRemoveRow(index)}
                                >
                                    <i className="fa fa-trash fs-5 text-danger"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-light-primary btn-sm" onClick={handleAddRow}>
                        <i className="ki-duotone ki-plus fs-2"></i> Add Tag
                    </button>
                </div>
            </div>

            {/* Dynamic editor rows with remove buttons */}
            <div className="mb-10">
                <WickFormLabel text="Content" isRequired={false}/>

                {contentRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="row mb-3">
                        {Array.from({length: row.columns}).map((_, colIndex) => (
                            <div key={colIndex} className={`col-${12 / row.columns}`}>
                                <Editor
                                    value={row.contents[colIndex]}
                                    onTextChange={(e) => handleEditorContentChange(rowIndex, colIndex, e.htmlValue ?? '')}
                                    style={{height: '150px'}}
                                />
                            </div>
                        ))}
                        <div className="col-12 text-end">
                            <button
                                type="button"
                                className="btn btn-sm btn-active-light-danger mt-2"
                                onClick={() => handleRemoveContentRow(rowIndex)}
                            >
                                <i className="fa fa-trash fs-5 text-danger"></i> Remove Row
                            </button>
                        </div>
                    </div>
                ))}
                <button type="button" className="btn btn-light-twfirm btn-sm me-3" onClick={() => addContentRow(1)}>
                    <i className="ki-duotone ki-plus fs-2"></i> Add Row of 1 Column
                </button>
                <button type="button" className="btn btn-light-twfirm btn-sm me-3" onClick={() => addContentRow(2)}>
                    <i className="ki-duotone ki-plus fs-2"></i> Add Row of 2 Columns
                </button>
            </div>
        </>
    );
};

export default BlogGeneralDetails;
