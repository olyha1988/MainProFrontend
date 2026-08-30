import {

    useEffect,

    useRef,

    useState,

} from "react";

import {

    Camera,

    ImagePlus,

    LoaderCircle,

    Trash2,

    Upload,

    X,

} from "lucide-react";

import toast from "react-hot-toast";

import {

    useDispatch,

} from "react-redux";

import {

    updateAuthUser,

} from "@/redux/slices/authSlice";

import useProfile from "@/hooks/useProfile";

// import useNotifications from "@/hooks/useNotifications";

import getErrorMessage from "@/utils/getErrorMessage";


const MAX_FILE_SIZE =

    5 *

    1024 *

    1024;


const ALLOWED_IMAGE_TYPES = [

    "image/jpeg",

    "image/jpg",

    "image/png",

    "image/webp",

];


export default function AvatarUploader({

    profile,

}) {

    const fileInputRef = useRef(null);

    const dispatch = useDispatch();

    const {

        uploadProfileAvatar,

        removeProfileAvatar,

        avatarUploading,

        avatarRemoving,

    } = useProfile();


    // const {

    //     notify,

    // } = useNotifications();


    const [

        selectedFile,

        setSelectedFile,

    ] = useState(null);


    const [

        previewUrl,

        setPreviewUrl,

    ] = useState("");


    const [

        uploadProgress,

        setUploadProgress,

    ] = useState(0);


    const apiUrl =

        import.meta.env.VITE_API_URL?.replace(

            /\/api\/?$/,

            ""

        ) || "";


    const currentAvatar = profile?.avatar

        ? profile.avatar.startsWith("http")

            ? profile.avatar

            : `${apiUrl}${profile.avatar}`

        : "";


    const displayedAvatar =

        previewUrl ||

        currentAvatar;


    useEffect(() => {

        return () => {

            if (previewUrl) {

                URL.revokeObjectURL(

                    previewUrl

                );

            }

        };

    }, [previewUrl]);


    const clearSelection = () => {

        if (previewUrl) {

            URL.revokeObjectURL(

                previewUrl

            );

        }


        setSelectedFile(

            null

        );


        setPreviewUrl(

            ""

        );


        setUploadProgress(

            0

        );


        if (fileInputRef.current) {

            fileInputRef.current.value = "";

        }

    };


    const handleFileChange = (event) => {

        const file = event.target.files?.[0];


        if (!file) {

            return;

        }


        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {

            toast.error(

                "Only JPG, JPEG, PNG, and WEBP images are allowed."

            );


            event.target.value = "";

            return;

        }


        if (file.size > MAX_FILE_SIZE) {

            toast.error(

                "Avatar image must not exceed 5 MB."

            );


            event.target.value = "";

            return;

        }


        if (previewUrl) {

            URL.revokeObjectURL(

                previewUrl

            );

        }


        setSelectedFile(

            file

        );


        setPreviewUrl(

            URL.createObjectURL(

                file

            )

        );


        setUploadProgress(

            0

        );

    };


   const handleUpload = async () => {

    if (!selectedFile) {

        toast.error(

            "Please select an image."

        );

        return;

    }


    try {

        const response = await uploadProfileAvatar(

            selectedFile,

            setUploadProgress

        ).unwrap();


        const updatedProfile =

            response?.data?.user ||

            response?.data?.profile ||

            response?.user ||

            response?.profile ||

            response?.data ||

            response;


        dispatch(

            updateAuthUser({

                ...updatedProfile,

                avatarVersion: Date.now(),

            })

        );


        // notify({

        //     title: "Profile Picture Updated",

        //     message: "Your profile picture was updated successfully.",

        //     type: "success",

        //     entityType: "profile",

        //     entityId:

        //         updatedProfile?._id ||

        //         profile?._id,

        // });


        clearSelection();

    }

    catch (error) {

        toast.error(

            getErrorMessage(error)

        );

    }

};


   const handleRemove = async () => {

    if (!profile?.avatar) {

        return;

    }


    try {

        const response = await removeProfileAvatar().unwrap();


        const updatedProfile =

            response?.data?.user ||

            response?.data?.profile ||

            response?.user ||

            response?.profile ||

            response?.data ||

            response;


        dispatch(

            updateAuthUser({

                ...updatedProfile,

                avatar: null,

                avatarVersion: Date.now(),

            })

        );


        // notify({

        //     title: "Profile Picture Removed",

        //     message: "Your profile picture was removed successfully.",

        //     type: "success",

        //     entityType: "profile",

        //     entityId:

        //         updatedProfile?._id ||

        //         profile?._id,

        // });


        clearSelection();

    }

    catch (error) {

        toast.error(

            getErrorMessage(error)

        );

    }

};

    const busy =

        avatarUploading ||

        avatarRemoving;


    return (

      <section
    className="
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        dark:border-gray-800
        dark:bg-gray-900
    "
>

            <div
                className="
                    border-b
                    border-gray-200
                    px-6
                    py-5
                    dark:border-gray-800
                "
            >

                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">

                    Profile Picture

                </h2>


                <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">

                    Upload a JPG, PNG, or WEBP image up to 5 MB.

                </p>

            </div>


            <div className="p-6">

                <div
                    className="
                        flex
                        flex-col
                        gap-6
                        sm:flex-row
                        sm:items-center
                    "
                >

                    <div className="relative mx-auto shrink-0 sm:mx-0">

                        {displayedAvatar ? (

                            <img

                                src={displayedAvatar}

                                alt={profile?.name || "Profile"}

                                className="
                                    h-32
                                    w-32
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    object-cover
                                    shadow-sm
                                    dark:border-gray-700
                                "

                            />

                        ) : (

                            <div
                                className="
                                    flex
                                    h-32
                                    w-32
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-dashed
                                    border-gray-300
                                    bg-gray-50
                                    dark:border-gray-700
                                    dark:bg-gray-800/60
                                "
                            >

                                <Camera

                                    size={34}

                                    className="text-gray-400 dark:text-gray-500"

                                />

                            </div>

                        )}


                        <button

                            type="button"

                            disabled={busy}

                            onClick={() =>

                                fileInputRef.current?.click()

                            }

                            className="
                                absolute
                                -bottom-2
                                -right-2
                                inline-flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                border-4
                                border-white
                                bg-indigo-600
                                text-white
                                shadow-lg
                                transition-all
                                duration-200
                                hover:bg-indigo-700
                                hover:shadow-xl
                                focus:outline-none
                                focus:ring-2
                                focus:ring-indigo-500/40
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                                dark:border-gray-900
                            "

                            aria-label="Select profile picture"

                        >

                            <ImagePlus size={18} />

                        </button>

                    </div>


                    <div className="min-w-0 flex-1">

                        <input

                            ref={fileInputRef}

                            type="file"

                            accept="image/jpeg,image/jpg,image/png,image/webp"

                            onChange={handleFileChange}

                            className="hidden"

                        />


                        {selectedFile && (

                            <div
                                className="
                                    mb-5
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    bg-gray-50
                                    p-4
                                    dark:border-gray-700
                                    dark:bg-gray-800/70
                                "
                            >

                                <div className="flex items-start justify-between gap-4">

                                    <div className="min-w-0">

                                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">

                                            {selectedFile.name}

                                        </p>


                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">

                                            {(

                                                selectedFile.size /

                                                1024 /

                                                1024

                                            ).toFixed(2)} MB

                                        </p>

                                    </div>


                                    <button

                                        type="button"

                                        disabled={busy}

                                        onClick={clearSelection}

                                        className="
                                            inline-flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            text-gray-400
                                            transition-colors
                                            hover:bg-gray-200
                                            hover:text-gray-700
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                            dark:hover:bg-gray-700
                                            dark:hover:text-white
                                        "

                                        aria-label="Clear selected image"

                                    >

                                        <X size={18} />

                                    </button>

                                </div>


                                {avatarUploading && (

                                    <div className="mt-4">

                                        <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400">

                                            <span>

                                                Uploading

                                            </span>

                                            <span>

                                                {uploadProgress}%

                                            </span>

                                        </div>


                                        <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">

                                            <div

                                                className="
                                                    h-full
                                                    rounded-full
                                                    bg-indigo-600
                                                    transition-all
                                                    duration-300
                                                "

                                                style={{

                                                    width: `${uploadProgress}%`,

                                                }}

                                            />

                                        </div>

                                    </div>

                                )}

                            </div>

                        )}


                        <div className="flex flex-wrap gap-3">

                            <button

                                type="button"

                                disabled={busy}

                                onClick={() =>

                                    fileInputRef.current?.click()

                                }

                                className="
                                    inline-flex
                                    h-11
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-gray-300
                                    bg-white
                                    px-4
                                    text-sm
                                    font-medium
                                    leading-none
                                    text-gray-700
                                    shadow-sm
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:bg-gray-50
                                    hover:shadow-md
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-indigo-500/30
                                    disabled:translate-y-0
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                    dark:border-gray-700
                                    dark:bg-gray-900
                                    dark:text-gray-200
                                    dark:hover:bg-gray-800
                                "

                            >

                                <ImagePlus

                                    size={17}

                                    className="shrink-0"

                                />

                                {profile?.avatar

                                    ? "Replace Image"

                                    : "Select Image"

                                }

                            </button>


                            {selectedFile && (

                                <button

                                    type="button"

                                    disabled={busy}

                                    onClick={handleUpload}

                                    className="
                                        inline-flex
                                        h-11
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-indigo-600
                                        px-4
                                        text-sm
                                        font-medium
                                        leading-none
                                        text-white
                                        shadow-sm
                                        transition-all
                                        duration-200
                                        hover:-translate-y-0.5
                                        hover:bg-indigo-700
                                        hover:shadow-md
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-indigo-500/40
                                        disabled:translate-y-0
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "

                                >

                                    {avatarUploading ? (

                                        <LoaderCircle

                                            size={17}

                                            className="shrink-0 animate-spin"

                                        />

                                    ) : (

                                        <Upload

                                            size={17}

                                            className="shrink-0"

                                        />

                                    )}

                                    {avatarUploading

                                        ? "Uploading..."

                                        : "Upload Avatar"

                                    }

                                </button>

                            )}


                            {profile?.avatar && !selectedFile && (

                                <button

                                    type="button"

                                    disabled={busy}

                                    onClick={handleRemove}

                                    className="
                                        inline-flex
                                        h-11
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-red-200
                                        bg-white
                                        px-4
                                        text-sm
                                        font-medium
                                        leading-none
                                        text-red-600
                                        shadow-sm
                                        transition-all
                                        duration-200
                                        hover:-translate-y-0.5
                                        hover:bg-red-50
                                        hover:shadow-md
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-red-500/30
                                        disabled:translate-y-0
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                        dark:border-red-900/70
                                        dark:bg-gray-900
                                        dark:text-red-400
                                        dark:hover:bg-red-950/30
                                    "

                                >

                                    {avatarRemoving ? (

                                        <LoaderCircle

                                            size={17}

                                            className="shrink-0 animate-spin"

                                        />

                                    ) : (

                                        <Trash2

                                            size={17}

                                            className="shrink-0"

                                        />

                                    )}

                                    {avatarRemoving

                                        ? "Removing..."

                                        : "Remove"

                                    }

                                </button>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}