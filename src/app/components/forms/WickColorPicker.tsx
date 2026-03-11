import React, {useRef, useState} from 'react';
import {Chrome} from '@uiw/react-color';
import useOutsideClickHandler from "../../hooks/useOutsideClickHandler.ts";

interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
}

const WickColorPicker: React.FC<ColorPickerProps> = ({value, onChange}) => {
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const colorPickerRef = useRef<HTMLDivElement>(null);

    // Use custom hook to close the color picker when clicking outside
    useOutsideClickHandler(colorPickerRef, () => setShowColorPicker(false));

    return (
        <div>
            <input
                type="text"
                readOnly
                className="form-control fs-base"
                value={value}
                onClick={() => setShowColorPicker(!showColorPicker)}
                placeholder="Select color"
            />
            {showColorPicker && (
                <div ref={colorPickerRef} style={{position: "absolute", zIndex: 1000}}>
                    <Chrome color={value} onChange={(color) => onChange(color.hex)}/>
                </div>
            )}
        </div>
    );
};

export default WickColorPicker;