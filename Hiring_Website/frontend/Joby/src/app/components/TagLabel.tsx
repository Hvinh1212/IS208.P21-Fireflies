import React from "react";

interface TagLabelProps {
    text: string;
}

const TagLabel: React.FC<TagLabelProps> = ({ text }) => {
    return (
        <div className="relative inline-block">
            <div className="absolute -top-4 left-0 w-4 h-4 bg-green-600 clip-triangle rotate-180" />
            <div className="bg-green-400 text-white px-4 py-1 rounded-b-md rounded-r-md font-medium shadow-md">
                {text}
            </div>
        </div>
    );
};

export default TagLabel;