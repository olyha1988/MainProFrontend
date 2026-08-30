import {

    FolderKanban,

    Pencil,

} from "lucide-react";


import Modal from "@/components/common/Modal";

import ProjectForm from "./ProjectForm";


export default function ProjectModal({

    open,

    onClose,

    loading = false,

    project,

}) {

    const isEditing = Boolean(

        project?._id

    );


    return (

        <Modal

            open={open}

            onClose={onClose}

            loading={loading}

            title={

                isEditing

                    ? "Edit Project"

                    : "Create Project"

            }

            icon={

                isEditing

                    ? Pencil

                    : FolderKanban

            }

        >

            <div className="space-y-6">

                <div className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800/50">

                    <p className="text-sm text-gray-600 dark:text-gray-400">

                        {isEditing

                            ? "Update the project details, status, and color."

                            : "Create a new project to organize tasks and team members."}

                    </p>

                </div>


                <ProjectForm

                    project={project}

                    onSuccess={onClose}

                />

            </div>

        </Modal>

    );

}