import {BulkFormFields} from "../../core/form.ts";
import React, {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {FormikProps} from "formik";
import {storageUrl} from "../../../../../helpers/general.ts";

interface Props {
    form: BulkFormFields;
    setForm: React.Dispatch<React.SetStateAction<BulkFormFields>>;
    formik: FormikProps<BulkFormFields>;
}

const UploadFile: React.FC<Props> = ({form, setForm, formik}) => {
    const [files, setFiles] = useState<{ url: string }[]>([]);

    useEffect(() => {
        if (form.fileUrl) {
            setFiles( [{url: storageUrl(form.fileUrl)}])
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.fileUrl]);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            setForm({...form, ['file']: acceptedFiles[0]})

            formik.setFieldValue('file', acceptedFiles[0])

            const newFiles = acceptedFiles.map(file => ({
                url: URL.createObjectURL(file),
                name: file.name,
                size: file.size
            }));
            setFiles(prevFiles => [...prevFiles, ...newFiles]);
        },
        maxFiles: 1, // Limit to 1 file
        accept: {
            'application/vnd.ms-excel': ['.xls'], // MIME type for older Excel files
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'], // MIME for newer Excel files
            'text/csv': ['.csv'], // CSV files, if needed
        },
        onDropRejected: (fileRejections) => {
            alert('Only one file can be uploaded at a time, and only Excel files are accepted')
        },
    });

    const removeFile = (fileUrl: string, event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation(); // Prevent the click event from propagating to the dropzone
        setFiles([]);

        setForm(prevForm => ({...prevForm, file: null}));
        formik.setFieldValue('file', null);
    };

    return (
        <div className="fv-row mb-10">
            <div {...getRootProps({className: 'dropzone dz-clickable'})}>
                <input {...getInputProps({accept: '.xls,.xlsx,.csv'})} />

                <div className="dz-message needsclick">
                    <i className="ki-duotone ki-file-up text-primary fs-3x">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>
                    <div className="ms-4">
                        <h3 className="fs-5 fw-bold text-gray-900 mb-1">Drag and drop your Excel file here, or click to
                            upload.</h3>
                        <span className="fs-7 fw-semibold text-gray-500">Only one file can be uploaded at a time.</span>
                    </div>
                </div>

                {files.map((file) => (
                    <div key={file.url}
                         className="dz-preview dz-processing dz-error dz-complete dz-image-preview">
                        {/*<div className="dz-image">*/}
                            <img data-dz-thumbnail="" src="/media/svg/files/doc.svg"
                                 alt={file.url}/>
                        {/*</div>*/}
                        <div className="dz-progress">
                            <span className="dz-upload" data-dz-uploadprogress=""></span>
                        </div>
                        <div className="dz-remove" data-dz-remove=""
                             onClick={(event) => removeFile(file.url, event)}>Remove file
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UploadFile;
