import React, { useEffect, useState } from 'react';
import { City, ImageType } from 'types';
import Button from 'ui/components/Button';
import Modal from 'ui/components/Modal';
import TextInput from 'ui/components/TextInput';
import useForm, { validator } from 'ui/hooks/useForm';
import useFileUpload from 'ui/hooks/useFileUpload';
import { CrossIcon, PlusIcon } from 'ui/icons';
import { imageUpload } from '../../../../api/upload';
import FileUploadInput from 'ui/components/FileUploadInput';
import RenderUploadedFileThumbs from 'ui/components/FileThumb';
import { useCreateCityMutation, useUpdateCityMutation } from '../../../../api/city';
import toast, { Toaster } from 'react-hot-toast';

interface ICreateCityModal {
    open: boolean;
    onClose: () => void;
    editMode?: boolean;
    city?: City | null;
}

type FormState = Pick<City, 'country' | 'name'> & {
    latitude: string;
    longitude: string;
    zoomLavel: string;
};

const initialState = {
    country: '',
    latitude: '',
    longitude: '',
    zoomLavel: '',
    name: '',
};

const CreateCityModal: React.FC<ICreateCityModal> = ({ open, onClose, editMode = false, city = null }) => {
    const [createCity] = useCreateCityMutation();
    const [updateCity] = useUpdateCityMutation();
    const [previousImage, setPreviousImage] = useState<[ImageType] | never[]>([]);

    const onSubmit = async () => {
        if (!files.length) {
            toast.error('No file selected');
            return;
        }
        const uploadedFiles = await onUpload();
        const payload = {
            ...state,
            latitude: Number(state.latitude),
            longitude: Number(state.longitude),
            zoomLavel: Number(state.zoomLavel),
            image: {
                url: uploadedFiles[0].url,
                name: uploadedFiles[0].name,
            },
        };

        if (editMode && city) {
            const updatedreponse = await updateCity({ ...payload, uid: city.uid });
            if ('data' in updatedreponse) {
                handleClose();
                toast.success('City updated!');
                return;
            }
        }

        const reponse = await createCity(payload);
        if ('data' in reponse) {
            handleClose();
            toast.success('City created!');
            return;
        }

        toast.error('Create action filed, try again');
    };

    const { handleSubmit, errors, state, getInputProps, onReset, setState } = useForm<FormState>({
        formState: initialState,
        onSubmit: onSubmit,
    });

    const { files, onChange, onRemove, onUpload, clear } = useFileUpload({
        uploadEvent: imageUpload,
        previousUploadedFiles: previousImage,
        multiple: false,
    });

    useEffect(() => {
        if (city && editMode) {
            setState({
                country: city.country,
                latitude: city.latitude.toString(),
                longitude: city.longitude.toString(),
                name: city.name,
                zoomLavel: city.zoomLavel.toString(),
            });
            setPreviousImage([city.image]);
        } else {
            setState(initialState);
            setPreviousImage([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city, editMode]);

    const handleClose = () => {
        clear();
        onReset();
        onClose();
    };

    return (
        <Modal className="max-w-3xl  rounded-md" open={open} onClose={handleClose}>
            <section className="w-full h-full">
                <header className="flex justify-between py-7 px-7 items-center">
                    <h2 className="text-xl font-semibold">Create car</h2>

                    <span onClick={handleClose}>
                        <CrossIcon className="h-7 w-7 cursor-pointer" />
                    </span>
                </header>
                <div className="overflow-y-auto px-7 pb-6 pt-2 max-h-[calc(100vh-160px)]">
                    <div className="flex mb-10 flex-wrap gap-5">
                        <FileUploadInput onChange={onChange}>
                            <div className="h-48 w-48 bg-ct-purple-400 bg-opacity-20 border p-5 rounded-md flex flex-col justify-center items-center border-dashed  border-ct-purple-700 ">
                                <div className="h-10 w-10 border-2 rounded-full border-ct-purple-700 flex justify-center items-center bg-ct-purple-700  ">
                                    <PlusIcon className="h-6 w-6 fill-current text-white " />
                                </div>
                                <h4 className="text-dh-gray-800 mt-3.5">Upload Image</h4>
                                <span className="text-dh-gray-600 text-center mt-2.5">
                                    Supported formats: PNG, JPG, JPEG
                                </span>
                            </div>
                        </FileUploadInput>
                        <RenderUploadedFileThumbs
                            className="h-48 w-48 rounded-md border "
                            removeIconClassName="-top-2 -right-2 bg-white border rounded-full"
                            onRemove={onRemove}
                            files={files}
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            className="mb-10"
                            label="City Name"
                            type="text"
                            error={errors.name?.error}
                            errorText={errors.name?.message[0]}
                            {...getInputProps({
                                name: 'name',
                                validate: validator.isRequire().withMessage('City Name  is required'),
                            })}
                        />
                        <div className="flex gap-10">
                            <TextInput
                                className="mb-10 w-full"
                                label="Country"
                                type="text"
                                error={errors.country?.error}
                                errorText={errors.country?.message[0]}
                                {...getInputProps({
                                    name: 'country',
                                    validate: validator.isRequire().withMessage('Country is required'),
                                })}
                            />
                            <TextInput
                                className="mb-10 w-full"
                                label="Latitude"
                                type="number"
                                error={errors.latitude?.error}
                                errorText={errors.latitude?.message[0]}
                                {...getInputProps({
                                    name: 'latitude',
                                    validate: validator.isRequire().withMessage('Latitude is required'),
                                })}
                            />
                        </div>
                        <div className="flex gap-10">
                            <TextInput
                                className="mb-10 w-full"
                                label="Longitude"
                                type="number"
                                error={errors.longitude?.error}
                                errorText={errors.longitude?.message[0]}
                                {...getInputProps({
                                    name: 'longitude',
                                    validate: validator.isRequire().withMessage('Longitude is required'),
                                })}
                            />
                            <TextInput
                                className="mb-10 w-full"
                                label="Map Zoom Lavel"
                                type="number"
                                error={errors.zoomLavel?.error}
                                errorText={errors.zoomLavel?.message[0]}
                                {...getInputProps({
                                    name: 'zoomLavel',
                                    validate: validator.isRequire().withMessage('Map Zoom Lavel is required'),
                                })}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button className="mt-12">
                                <> {editMode ? 'Update' : 'Create'}</>
                            </Button>
                        </div>
                    </form>
                </div>
                <Toaster position="bottom-left" />
            </section>
        </Modal>
    );
};

export default CreateCityModal;
