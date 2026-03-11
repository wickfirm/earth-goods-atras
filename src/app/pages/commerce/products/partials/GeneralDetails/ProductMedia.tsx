import {FormFields} from "../../core/form.ts";
import React, {useEffect, useState} from "react";
import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import {useDropzone} from "react-dropzone";
import {FormikProps} from "formik";
import {storageUrl} from "../../../../../helpers/general.ts";
import {DEFAULT_RESPONSIVE_IMAGE_SIZE} from "../../../../../helpers/settings.ts";
import { v4 as uuidv4 } from 'uuid';

interface Props {
    form: FormFields;
    setForm: React.Dispatch<React.SetStateAction<FormFields>>;
    formik: FormikProps<FormFields>;
}

const ProductMedia: React.FC<Props> = ({form, setForm, formik}) => {
    const [files, setFiles] = useState<{ id: number|string, url: string }[]>([]);

    useEffect(() => {
        if (form.gallery) {
            const productFiles = form.gallery.filter((media) => !media.is_featured).map((item) => {
                return {id: item.id, url: storageUrl(item.media[DEFAULT_RESPONSIVE_IMAGE_SIZE])}
            })
            setFiles(productFiles)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.gallery]);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            setForm({...form, ['media']: acceptedFiles})

            formik.setFieldValue('media', acceptedFiles)

            const newFiles = acceptedFiles.map(file => ({
                id: uuidv4(),
                url: URL.createObjectURL(file),
                name: file.name,
                size: file.size
            }));
            setFiles(prevFiles => [...prevFiles, ...newFiles]);
        },
        maxFiles: 10 - files.length // Limit to 10 files
    });

    const removeFile = (fileId: number, fileUrl: string, event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();

        // Find the file by ID instead of URL
        const fileToRemove = files.find(file => file.id === fileId);
        if (!fileToRemove) return;

        // Remove only the targeted file
        const updatedFiles = files.filter(file => file.id !== fileId);
        setFiles(updatedFiles);

        // Handle gallery file removal
        const removedFile = form.gallery?.find(
            item => storageUrl(item.media[DEFAULT_RESPONSIVE_IMAGE_SIZE]) === fileToRemove.url
        );

        if (removedFile) {
            const updatedRemovedMedia = [...(form.removedMedia || []), fileId];
            setForm(prevForm => ({ ...prevForm, removedMedia: updatedRemovedMedia }));
            formik.setFieldValue('removedMedia', updatedRemovedMedia);
        }

        // const fileIndex = files.findIndex(file => file.url === fileUrl);
        // if (fileIndex === -1) return;
        //
        // const updatedFiles = [...files];
        // updatedFiles.splice(fileIndex, 1);
        //
        // setFiles(updatedFiles);
        //
        // const removedFile = form.gallery?.find(
        //     (item) => storageUrl(item.media[DEFAULT_RESPONSIVE_IMAGE_SIZE]) === fileUrl
        // );
        //
        // console.log(removedFile)
        //
        // if (removedFile) {
        //     const updatedRemovedMedia = [...(form.removedMedia || []), removedFile.id];
        //     setForm(prevForm => ({...prevForm, removedMedia: updatedRemovedMedia}));
        //     formik.setFieldValue('removedMedia', updatedRemovedMedia);
        // }
    };

    return (
        <KTCard className="py-4">
            <KTCardHeader text="Media" className="border-0"/>

            <KTCardBody className="pt-0">
                <div className="fv-row mb-2">
                    <div {...getRootProps({className: 'dropzone dz-clickable'})}>
                        <input {...getInputProps()} />

                        <div className="dz-message needsclick">
                            <i className="ki-duotone ki-file-up text-primary fs-3x">
                                <span className="path1"></span>
                                <span className="path2"></span>
                            </i>
                            <div className="ms-4">
                                <h3 className="fs-5 fw-bold text-gray-900 mb-1">Drop files here or click to upload.</h3>
                                <span className="fs-7 fw-semibold text-gray-500">Upload a maximum of 10 files simultaneously</span>
                            </div>
                        </div>

                        {files.map((file, index) => (
                            <div key={`${file.url}-${index}`}
                                 className="dz-preview dz-processing dz-error dz-complete dz-image-preview">
                                <div className="dz-image">
                                    <img data-dz-thumbnail="" alt={file.url} src={file.url}/>
                                </div>
                                <div className="dz-progress">
                                    <span className="dz-upload" data-dz-uploadprogress=""></span>
                                </div>
                                <div className="dz-remove" data-dz-remove=""
                                     onClick={(event) => removeFile(file.id as number, file.url, event)}>Remove file
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-muted fs-7">Set the product media gallery.</div>
            </KTCardBody>
        </KTCard>
    );
}

export default ProductMedia;
