import React, {useCallback, useEffect, useState} from 'react';
import {FormikProps} from 'formik';
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader";
import {FormFields} from "../core/form";
import {genericHandleSingleFile} from "../../../../helpers/form";
import {storageUrl} from "../../../../helpers/general.ts";
import {DEFAULT_RESPONSIVE_IMAGE} from "../../../../models/ResponsiveImage.ts";
import {DEFAULT_RESPONSIVE_IMAGE_SIZE} from "../../../../helpers/settings.ts";

interface Props {
    form: FormFields;
    setForm: React.Dispatch<React.SetStateAction<FormFields>>;
    formik: FormikProps<FormFields>;
}

const ProductThumbnail: React.FC<Props> = ({form, setForm, formik}) => {
    const [initialPreview, setInitialPreview] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFile = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<FormFields>, key: string) => {
            genericHandleSingleFile(e, formik, form, setForm, key);

            const file = e.target.files?.[0];

            if (file) {
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
            }
        },
        [form, setForm]
    );

    useEffect(() => {
        if (form.thumbnail) {
            setInitialPreview(storageUrl(form.thumbnail[DEFAULT_RESPONSIVE_IMAGE_SIZE]));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.thumbnail]);

    return (
        <KTCard>
            <KTCardHeader text="Thumbnail" className="border-0"/>
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
                            // name="thumbnail"
                            accept=".png, .jpg, .jpeg"
                            onChange={(e) => handleFile(e, formik, 'thumbnail')}
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
                    Set the product thumbnail image. Only *.png, *.jpg, and *.jpeg image files are accepted.
                </div>
            </KTCardBody>
        </KTCard>
    );
};

export default ProductThumbnail;
