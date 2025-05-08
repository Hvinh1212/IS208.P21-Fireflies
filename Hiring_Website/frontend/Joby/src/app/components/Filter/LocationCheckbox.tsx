"use client";

import { useState, useEffect } from 'react';

type Option = {
    location: string;
};

type CheckboxProps = {
    dropdownName: string;
    options: Option[];
    selectedOptions: Option[];
    setSelectedOptions: (opts: Option[]) => void;
};

const LocationCheckbox = ({ dropdownName, options, selectedOptions, setSelectedOptions }: CheckboxProps) => {
    const [localSelectedOptions, setLocalSelectedOptions] = useState<Option[]>([]);

    useEffect(() => {
        setLocalSelectedOptions(selectedOptions || []);
    }, [selectedOptions]);

    const handleCheckboxClick = (option: Option) => {
        const isSelected = localSelectedOptions.some(
            (opt) => opt.location === option.location
        );

        const updatedOptions = isSelected
            ? localSelectedOptions.filter(
                (opt) => opt.location !== option.location
            )
            : [...localSelectedOptions, option];

        setLocalSelectedOptions(updatedOptions);
        setSelectedOptions(updatedOptions);
    };

    return (
        <div className="w-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{dropdownName}</h3>
                    <div className="space-y-2">
                        {options.map((option) => (
                            <div
                                key={option.location}
                                className={`flex items-center p-2 rounded-md transition-colors duration-200 ${localSelectedOptions.some(opt => opt.location === option.location)
                                    ? 'bg-green-50 border border-green-200'
                                    : 'hover:bg-gray-50'
                                    }`}
                            >
                                <label className="flex items-center w-full cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={localSelectedOptions.some(
                                            (opt) => opt.location === option.location
                                        )}
                                        onChange={() => handleCheckboxClick(option)}
                                        className="form-checkbox h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                                    />
                                    <span className="ml-3 text-gray-700">
                                        {option.location}
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

export default LocationCheckbox; 