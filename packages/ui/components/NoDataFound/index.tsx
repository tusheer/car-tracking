import React from 'react';
import { SadEmojiIcon } from '../../icons/SadEmojiIcon';

const NoDataFound = () => {
    return (
        <div className="bg-white w-full flex flex-col items-center justify-center py-20">
            <SadEmojiIcon className="w-20 h-20 stroke-1 text-ct-purple-700 stroke-current" />
            <h2 className="text-3xl text-center font-semibold">No Data Found</h2>
        </div>
    );
};

export default NoDataFound;
