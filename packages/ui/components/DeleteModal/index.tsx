import React from 'react';
import { TrashIcon } from '../../icons';
import Button from '../Button';
import Modal from '../Modal';

interface IDeleteModal {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<IDeleteModal> = ({ open, onClose, onDelete }) => {
    const handleDelete = () => {
        onDelete();
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} className="max-w-xl rounded-md">
            <div className="p-10">
                <div className="w-16 flex items-center justify-center h-16 mx-auto border-[3px] border-black rounded-full">
                    <TrashIcon className="w-10 h-10 " />
                </div>
                <h2 className="text-2xl mt-3 font-semibold text-center">Are you sure?</h2>
                <div className="flex mt-10 justify-center gap-5">
                    <Button size="sm" onClick={handleDelete} color="primary">
                        Yes
                    </Button>
                    <Button size="sm" color="gray">
                        No
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
