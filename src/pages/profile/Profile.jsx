import { useEffect } from "react";

import {

    FiAlertCircle,

    FiRefreshCw,

} from "react-icons/fi";

import useProfile from "@/hooks/useProfile";

import Button from "@/components/common/Button";

import ProfileHeader from "@/components/profile/ProfileHeader";

import ProfileStats from "@/components/profile/ProfileStats";

import ProfileSkeleton from "@/components/profile/ProfileSkeleton";

import ProfileForm from "@/components/profile/ProfileForm";

import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

import AvatarUploader from "@/components/profile/AvatarUploader";


export default function Profile() {

    const {

        profile,

        loading,

        error,

        fetchProfile,

    } = useProfile();


    useEffect(() => {

        fetchProfile();

    }, []); // fetching the data 


    if (

        loading &&

        !profile

    ) {

        return (

            <div className="mx-auto w-full ">

                <ProfileSkeleton />

            </div>

        );

    }


    if (

        error &&

        !profile

    ) {

        return (

            <div className="flex min-h-[65vh] items-center justify-center">

                <div
                    className="
                        w-full
                        max-w-lg
                        rounded-3xl
                        border
                        border-red-200
                        bg-white
                        p-8
                        text-center
                        shadow-sm
                        dark:border-red-900/50
                        dark:bg-gray-900
                    "
                >

                    <div
                        className="
                            mx-auto
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-red-100
                            text-red-600
                            dark:bg-red-950/40
                            dark:text-red-400
                        "
                    >

                        <FiAlertCircle size={26} />

                    </div>


                    <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">

                        Unable to load profile

                    </h2>


                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">

                        {typeof error === "string"
                            ? error
                            : error?.message ||
                              "Something went wrong while loading your profile."
                        }

                    </p>


                    <Button

                        type="button"

                        onClick={fetchProfile}

                        loading={loading}

                        className="mt-6"

                    >

                        {!loading && (

                            <FiRefreshCw

                                size={16}

                                className="shrink-0"

                            />

                        )}

                        Try Again

                    </Button>

                </div>

            </div>

        );

    }


    return (

        <div className="mx-auto w-full  space-y-6 pb-8">

            <ProfileHeader

                profile={profile}

            />


            <ProfileStats

                profile={profile}

            /> 


           <div
    className="
        grid
        grid-cols-1
        items-stretch
        gap-6
        xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)]
    "
>

                <div className="min-w-0">

                    <ProfileForm

                        profile={profile}

                    />

                </div>


               <div className="min-w-0 h-full">

                    <AvatarUploader

                        profile={profile}

                    /> 

                </div>

            </div>


            <ChangePasswordForm />

        </div>

    );

}