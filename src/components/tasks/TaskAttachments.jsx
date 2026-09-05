import {

    useRef,

    useState,

} from "react";

import {

    Download,

    ExternalLink,

    FileText,

    LoaderCircle,

    Paperclip,

    Trash2,

    Upload,

    X,

} from "lucide-react";

import toast from "react-hot-toast";

import useTasks from "@/hooks/useTasks";

 import useNotifications from "@/hooks/useNotifications";

import ConfirmDialog from "@/components/common/ConfirmDialog"

/*
|--------------------------------------------------------------------------
| Constants
|--------------------------------------------------------------------------
*/

const MAX_FILE_SIZE =

    5 *

    1024 *

    1024;


const ALLOWED_FILE_TYPES = [

    "image/jpeg",

    "image/jpg",

    "image/png",

    "image/webp",

    "application/pdf",

];


const API_BASE_URL =

    import.meta.env.VITE_API_URL

        ?.replace(

            /\/api\/?$/,

            ""

        ) || "";


/*
|--------------------------------------------------------------------------
| Format File Size
|--------------------------------------------------------------------------
*/

const formatFileSize = (bytes = 0) => {

    if (!bytes) {

        return "0 KB";

    }


    const units = [

        "Bytes",

        "KB",

        "MB",

    ];


    const unitIndex = Math.min(

        Math.floor(

            Math.log(bytes) /

            Math.log(1024)

        ),

        units.length - 1

    );


    const value =

        bytes /

        1024 ** unitIndex;


    return `${value.toFixed(

        unitIndex === 0

            ? 0

            : 1

    )} ${units[unitIndex]}`;

};


/*
|--------------------------------------------------------------------------
| Build Attachment URL
|--------------------------------------------------------------------------
*/

const getAttachmentUrl = (fileUrl) => {

    if (!fileUrl) {

        return "";

    }


    if (

        fileUrl.startsWith("http://") ||

        fileUrl.startsWith("https://")

    ) {

        return fileUrl;

    }


    return `${API_BASE_URL}${fileUrl}`;

};


/*
|--------------------------------------------------------------------------
| Get Error Message
|--------------------------------------------------------------------------
*/

const getErrorMessage = (

    error,

    fallbackMessage

) => {

    if (

        typeof error === "string"

    ) {

        return error;

    }


    return (

        error?.response?.data?.message ||

        error?.message ||

        fallbackMessage

    );

};


/*
|--------------------------------------------------------------------------
| Task Attachments
|--------------------------------------------------------------------------
*/

export default function TaskAttachments({

    task,

    onActivityChange,

}) {



    const fileInputRef =

        useRef(null);


    const [

        selectedFile,

        setSelectedFile,

    ] = useState(null);


    const [

        deletingAttachmentId,

        setDeletingAttachmentId,

    ] = useState(null);


    const {

        uploadAttachment,

        deleteAttachment,

        attachmentLoading,

    } = useTasks();

    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        attachment: null,
    });


    const {

     notify,

    } = useNotifications();


    const attachments =

        task?.attachments || [];


    /*
    |--------------------------------------------------------------------------
    | Select File
    |--------------------------------------------------------------------------
    */

    const handleFileChange = (event) => {

        const file =

            event.target.files?.[0];


        if (!file) {

            return;

        }


        if (

            !ALLOWED_FILE_TYPES.includes(

                file.type

            )

        ) {

            toast.error(

                "Only JPG, JPEG, PNG, WEBP, and PDF files are allowed."

            );

            event.target.value = "";

            return;

        }


        if (

            file.size >

            MAX_FILE_SIZE

        ) {

            toast.error(

                "The file must not exceed 5 MB."

            );

            event.target.value = "";

            return;

        }


        setSelectedFile(

            file

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Clear Selected File
    |--------------------------------------------------------------------------
    */

    const clearSelectedFile = () => {

        setSelectedFile(null);


        if (

            fileInputRef.current

        ) {

            fileInputRef.current.value = "";

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Upload File
    |--------------------------------------------------------------------------
    */

    const handleUpload = async () => {

        if (

            !task?._id

        ) {

            toast.error(

                "Task information is unavailable."

            );

            return;

        }


        if (

            !selectedFile

        ) {

            toast.error(

                "Please select a file."

            );

            return;

        }


        try {

            await uploadAttachment(

                task._id,

                selectedFile

            );

            await onActivityChange?.();

             notify({

                title: "Attachment Uploaded",

             message: `${selectedFile.name} was added to ${task.title || "the task"}.`,

             type: "success",

            entityType: "task",
entityId: task._id,

            });


            clearSelectedFile();

        }

        catch (error) {

            toast.error(

                getErrorMessage(

                    error,

                    "Failed to upload attachment."

                )

            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Delete File
    |--------------------------------------------------------------------------
    */

  /*
|--------------------------------------------------------------------------
| Open Delete Confirmation
|--------------------------------------------------------------------------
*/

const handleDelete = (attachment) => {

    if (

        !task?._id ||

        !attachment?._id

    ) {

        return;

    }


    setDeleteDialog({

        open: true,

        attachment,

    });

};


/*
|--------------------------------------------------------------------------
| Close Delete Confirmation
|--------------------------------------------------------------------------
*/

const closeDeleteDialog = () => {

    if (deletingAttachmentId) {

        return;

    }


    setDeleteDialog({

        open: false,

        attachment: null,

    });

};


/*
|--------------------------------------------------------------------------
| Confirm Delete
|--------------------------------------------------------------------------
*/

const confirmDelete = async () => {

    const attachment =

        deleteDialog.attachment;


    if (

        !task?._id ||

        !attachment?._id

    ) {

        return;

    }


    try {

        setDeletingAttachmentId(

            attachment._id

        );


        await deleteAttachment(

            task._id,

            attachment._id

        );


        await onActivityChange?.();


        notify({

           title: "Attachment Deleted",

           message: `${attachment.fileName || "The attachment"} was removed from ${task.title || "the task"}.`,

           type: "success",

           entityType: "task",

           entityId: task._id,

    });


        setDeleteDialog({

            open: false,

            attachment: null,

        });

    }

    catch (error) {

        toast.error(

            getErrorMessage(

                error,

                "Failed to delete attachment."

            )

        );

    }

    finally {

        setDeletingAttachmentId(null);

    }

};


    /*
    |--------------------------------------------------------------------------
    | Download File
    |--------------------------------------------------------------------------
    */

    const handleDownload = async (

        attachment

    ) => {

        const fileUrl =

            getAttachmentUrl(

                attachment.fileUrl

            );


        if (

            !fileUrl

        ) {

            toast.error(

                "The attachment URL is unavailable."

            );

            return;

        }


        try {

            const response =

                await fetch(

                    fileUrl

                );


            if (

                !response.ok

            ) {

                throw new Error(

                    "Download failed."

                );

            }


            const blob =

                await response.blob();


            const blobUrl =

                URL.createObjectURL(

                    blob

                );


            const link =

                document.createElement(

                    "a"

                );


            link.href = blobUrl;

            link.download =

                attachment.fileName ||

                "attachment";


            document.body.appendChild(

                link

            );


            link.click();

            link.remove();


            URL.revokeObjectURL(

                blobUrl

            );

        }

        catch (error) {

            toast.error(

                getErrorMessage(

                    error,

                    "Failed to download attachment."

                )

            );

        }

    };


    return (

        <section className="space-y-5">

            {/*
            |--------------------------------------------------------------------------
            | Heading
            |--------------------------------------------------------------------------
            */}

            <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">

                    <Paperclip

                        className="h-5 w-5"

                    />

                </div>


                <div>

                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">

                        Attachments

                    </h3>


                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                        Upload an image or PDF file up to 5 MB.

                    </p>

                </div>

            </div>


            {/*
            |--------------------------------------------------------------------------
            | File Selection
            |--------------------------------------------------------------------------
            */}

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">

                <input

                    ref={fileInputRef}

                    type="file"

                    accept=".jpg,.jpeg,.png,.webp,.pdf"

                    onChange={handleFileChange}

                    disabled={attachmentLoading}

                    className="hidden"

                />


                {!selectedFile ? (

                    <button

                        type="button"

                        onClick={() =>

                            fileInputRef.current?.click()

                        }

                        disabled={attachmentLoading}

                        className="flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-sm font-medium text-gray-600 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:bg-blue-950/20 dark:hover:text-blue-400"

                    >

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-300">

                            <Upload

                                className="h-5 w-5"

                            />

                        </div>

                        Select Attachment

                    </button>

                ) : (

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">

                                <FileText

                                    className="h-5 w-5"

                                />

                            </div>


                            <div className="min-w-0">

                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">

                                    {selectedFile.name}

                                </p>


                                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">

                                    {formatFileSize(

                                        selectedFile.size

                                    )}

                                </p>

                            </div>

                        </div>


                        <div className="flex flex-wrap items-center gap-2">

                            <button

                                type="button"

                                onClick={clearSelectedFile}

                                disabled={attachmentLoading}

                                className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"

                            >

                                <X

                                    className="h-4 w-4"

                                />

                                Remove

                            </button>


                            <button

                                type="button"

                                onClick={handleUpload}

                                disabled={attachmentLoading}

                                className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"

                            >

                                {attachmentLoading ? (

                                    <LoaderCircle

                                        className="h-4 w-4 animate-spin"

                                    />

                                ) : (

                                    <Upload

                                        className="h-4 w-4"

                                    />

                                )}


                                {attachmentLoading

                                    ? "Uploading..."

                                    : "Upload"}

                            </button>

                        </div>

                    </div>

                )}

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Attachment List
            |--------------------------------------------------------------------------
            */}

            <div className="space-y-3">

                {attachments.length === 0 ? (

                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">

                            <Paperclip

                                className="h-6 w-6"

                            />

                        </div>


                        <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">

                            No Attachments

                        </p>


                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                            Files uploaded to this task will appear here.

                        </p>

                    </div>

                ) : (

                    attachments.map((attachment) => {

                        const attachmentUrl =

                            getAttachmentUrl(

                                attachment.fileUrl

                            );


                        const isDeleting =

                            deletingAttachmentId ===

                            attachment._id;


                        return (

                            <div

                                key={attachment._id}

                                className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600 sm:flex-row sm:items-center sm:justify-between"

                            >

                                <div className="flex min-w-0 items-center gap-3">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">

                                        <FileText

                                            className="h-5 w-5"

                                        />

                                    </div>


                                    <div className="min-w-0">

                                        <p

                                            title={attachment.fileName}

                                            className="truncate text-sm font-medium text-gray-900 dark:text-white"

                                        >

                                            {attachment.fileName}

                                        </p>


                                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">

                                            <span>

                                                {formatFileSize(

                                                    attachment.fileSize

                                                )}

                                            </span>


                                            {attachment.uploadedAt && (

                                                <>

                                                    <span aria-hidden="true">

                                                        •

                                                    </span>

                                                    <span>

                                                        {new Date(

                                                            attachment.uploadedAt

                                                        ).toLocaleDateString()}

                                                    </span>

                                                </>

                                            )}

                                        </div>

                                    </div>

                                </div>


                                <div className="flex items-center gap-1 sm:justify-end">

                                    <a

                                        href={attachmentUrl}

                                        target="_blank"

                                        rel="noopener noreferrer"

                                        title="Open attachment"

                                        aria-label={`Open ${attachment.fileName}`}

                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"

                                    >

                                        <ExternalLink

                                            className="h-4 w-4"

                                        />

                                    </a>


                                    <button

                                        type="button"

                                        onClick={() =>

                                            handleDownload(

                                                attachment

                                            )

                                        }

                                        disabled={isDeleting}

                                        title="Download attachment"

                                        aria-label={`Download ${attachment.fileName}`}

                                        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"

                                    >

                                        <Download

                                            className="h-4 w-4"

                                        />

                                    </button>


                                    <button

                                        type="button"

                                        onClick={() =>

                                            handleDelete(

                                                attachment

                                            )

                                        }

                                        disabled={

                                            attachmentLoading ||

                                            isDeleting

                                        }

                                        title="Delete attachment"

                                        aria-label={`Delete ${attachment.fileName}`}

                                        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950/30 dark:hover:text-red-300"

                                    >

                                        {isDeleting ? (

                                            <LoaderCircle

                                                className="h-4 w-4 animate-spin"

                                            />

                                        ) : (

                                            <Trash2

                                                className="h-4 w-4"

                                            />

                                        )}

                                    </button>

                                </div>

                            </div>

                        );

                    })

                )}

            </div>

            <ConfirmDialog

    open={deleteDialog.open}

    title="Delete Attachment"

    description={`Are you sure you want to delete "${deleteDialog.attachment?.fileName || "this attachment"}"? This action cannot be undone.`}

    confirmText="Delete"

    cancelText="Cancel"

    confirmVariant="danger"

    loading={Boolean(

        deletingAttachmentId

    )}

    onCancel={closeDeleteDialog}

    onConfirm={confirmDelete}

/>

        </section>

    );

}

