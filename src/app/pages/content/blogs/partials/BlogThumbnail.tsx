import React, {useCallback, useEffect, useState} from 'react';
import {FormikProps} from 'formik';
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader";
import {FormFields} from "../core/form";
import {storageUrl} from "../../../../helpers/general.ts";
import {DEFAULT_RESPONSIVE_IMAGE_SIZE} from "../../../../helpers/settings.ts";

interface Props {
    formik: FormikProps<FormFields>;
    form?: FormFields;
    setForm?: React.Dispatch<React.SetStateAction<FormFields>>;
}

const BlogThumbnail: React.FC<Props> = ({form, setForm, formik}) => {
    const [initialPreview, setInitialPreview] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFile = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<FormFields>, key: string) => {
            const file = e.target.files?.[0];

            if (file) {
                // Check file type and size if needed
                if (file.type.startsWith('image/') && file.size > 0) {
                    const previewUrl = URL.createObjectURL(file);

                    formik.setFieldValue(key, file)
                    setPreview(previewUrl);
                } else {
                    console.error("Invalid file format or size");
                }
            }
        },
        [form, setForm]
    );

    useEffect(() => {
        const previewUrl: string | null = null;

        if (form?.featured_image) {
            setInitialPreview(storageUrl(form?.featured_image[DEFAULT_RESPONSIVE_IMAGE_SIZE]));
        }

        return () => {
            // Cleanup the URL object when the component unmounts or the image changes
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [form?.featured_image]);

    return (
        <KTCard>
            <KTCardHeader text="Featured Image" className="border-0"/>
            <KTCardBody className="text-center pt-0">
                <div
                    className="image-input image-input-empty image-input-outline image-input-placeholder mb-3"
                    style={{backgroundImage: `url(${preview ?? initialPreview ?? '/media/svg/files/blank-image.svg'})`}}
                >
                    <div className="image-input-wrapper w-150px h-150px"/>
                    <label
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                        data-kt-image-input-action="change"
                        data-bs-toggle="tooltip"
                        aria-label="Change avatar"
                        data-bs-original-title="Change avatar"
                        data-kt-initialized="1"
                    >
                        <i className="ki-duotone ki-pencil fs-7">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </i>
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={(e) => handleFile(e, formik, 'featured_image')}
                        />
                        <input type="hidden" name="avatar_remove"/>
                    </label>
                    <span
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                        data-kt-image-input-action="cancel"
                        data-bs-toggle="tooltip"
                        aria-label="Cancel avatar"
                        data-bs-original-title="Cancel avatar"
                        data-kt-initialized="1"
                    >
                        <i className="ki-duotone ki-cross fs-2">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </i>
                    </span>
                    <span
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                        data-kt-image-input-action="remove"
                        data-bs-toggle="tooltip"
                        aria-label="Remove avatar"
                        data-bs-original-title="Remove avatar"
                        data-kt-initialized="1"
                    >
                        <i className="ki-duotone ki-cross fs-2">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </i>
                    </span>
                </div>
                <div className="text-muted fs-7">
                    Set the blog featured image. Only *.png, *.jpg, and *.jpeg image files are accepted.
                </div>
            </KTCardBody>
        </KTCard>
    );
};

export default BlogThumbnail;
