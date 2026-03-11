import React, {useCallback, useState} from 'react';
import {ReactTags, Tag as ReactTag} from "react-tag-autocomplete";


interface Props {
    id: string;
    labelText: string;
    tags: any[];
    labelKey: string;
}

const TagSelector: React.FC<Props> = ({id, labelText, tags, labelKey}) => {
    const [selected, setSelected] = useState<ReactTag[]>([]);

    const tagsOptions = {
        activateFirstOption: false,
        allowBackspace: false,
        collapseOnSelect: false,
        isDisabled: false,
        isInvalid: false,
    };

    const onAdd = useCallback(
        (newTag: ReactTag) => {
            setSelected((prevSelected) => [...prevSelected, newTag]);
        },
        []
    );

    const onDelete = useCallback(
        (index: number) => {
            setSelected((prevSelected) => prevSelected.filter((_, i) => i !== index));
        },
        []
    );

    const suggestions = tags.map((tag, index) => ({
        value: index,
        label: tag[labelKey], // Dynamically access the labelKey property
    }));

    return (
        <ReactTags
            id={id}
            labelText={labelText}
            onAdd={onAdd}
            onDelete={onDelete}
            selected={selected}
            suggestions={suggestions}
            {...tagsOptions}
        />
    );
};

export default TagSelector;
