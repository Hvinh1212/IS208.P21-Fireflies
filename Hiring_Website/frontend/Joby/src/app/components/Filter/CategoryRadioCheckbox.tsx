"use client";

import { useState, useEffect } from "react";

type Option = {
    id: number;
    category_name: string;
};

type RadioCheckBoxProps = {
    dropdownName: string;
    options: Option[];
    selectedOption: Option | null;
    setSelectedOption: (option: Option) => void;
};

const CategoryRadioCheckBox = ({
    dropdownName,
    options,
    selectedOption,
    setSelectedOption,
}: RadioCheckBoxProps) => {
    const [localSelectedOption, setLocalSelectedOption] = useState<Option | null>(null);

    useEffect(() => {
        setLocalSelectedOption(selectedOption || null);
    }, [selectedOption]);

    const handleOptionClick = (option: Option) => {
        setLocalSelectedOption(option);
        setSelectedOption(option);
    };

    return (
        <div className="w-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{dropdownName}</h3>
                    <div className="space-y-2">
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className={`flex items-center p-2 rounded-md transition-colors duration-200 ${localSelectedOption?.id === option.id
                                    ? 'bg-green-100 border border-green-500'
                                    : 'hover:bg-gray-100'
                                    }`}
                            >
                                <label className="flex items-center w-full cursor-pointer">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-green-500 border-gray-300 focus:ring-green-500"
                                        checked={localSelectedOption?.id === option.id}
                                        onChange={() => handleOptionClick(option)}
                                    />
                                    <span className="ml-3 text-gray-700">
                                        {option.category_name}
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryRadioCheckBox; 