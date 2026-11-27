import { format } from 'date-fns';
import React from 'react';
import getDateDiff from '../lib/getDateDiff';
import { ArrowRight, Calendar, Clock4, Timer, Trash } from 'lucide-react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import axios from 'axios';

const ActivitiesCard = ({ task,refetch }) => {
    const handleDelete = () => {
        console.log(task);
        console.log(task?._id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Deleting")
                try {
                    const { data } = await axios.delete(`http://localhost:3000/activity/${task?._id}`)
                    if (data.deletedCount !== 1) {
                        throw new Error("Failed to delete")
                    }
                    await refetch()
                    toast.dismiss(toastId)
                    toast.success("Activity deleted successfully")

                } catch (error) {
                    toast.dismiss(toastId)
                    toast.error(error.message || "Something went wrong")


                }
            }



        });
    }


    const isReady = !!task?._id
    const isMultipleDate = isReady ? new Date(task.startTime).toDateString() !== new Date(task.endTime).toDateString() : false
    console.log(isMultipleDate);
    // console.log("i am in the component")
    return (
        <SkeletonTheme
            baseColor="#0f172a"
            highlightColor="#1e293b"
        >
            <div

                className="bg-[#182238] border border-slate-700/60 rounded-xl p-4 hover:border-cyan-500/40 transition duration-200 relative overflow-hidden"
            >
                <div className='absolute left-0 top-0 bottom-0 w-1 h-full bg-linear-to-b from-cyan-400 via-blue-500 to-indigo-500'>

                </div>
                {/* Date */}

                <div className='flex justify-between'>
                    <div className="flex items-center gap-2 text-sm text-white font-semibold">
                        {isReady ? <span className="text-cyan-400 p-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                            <Calendar size={16} /></span> : <Skeleton height={30} width={30} borderRadius={12}></Skeleton>
                        }
                        {
                            isReady ?

                                <span className='text-cyan-400  px-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg'>{format(new Date(task.endTime), "eeee")}</span>
                                : <Skeleton height={22} width={65} borderRadius={12}></Skeleton>
                        }
                        {
                            isReady ? <span>{format(new Date(task.startTime), "PP")}</span> : <Skeleton height={22} width={81} borderRadius={12}></Skeleton>

                        }
                        {
                            isMultipleDate &&
                            <>
                                <span className="text-slate-600">→</span>
                                <span>{format(new Date(task.endTime), " PP")}</span>
                            </>
                        }
                    </div>
                    <button onClick={handleDelete}><Trash size={20} className='text-red-800' /></button>

                </div>

                {/* Top section */}
                <div className="flex  justify-between items-center  mt-3 gap-3">
                    {/* Time */}
                    {
                        isReady ?
                            <div className="flex items-center  gap-2 px-3 border border-slate-700/60 py-1.5 rounded-xl bg-[#0f1629]">
                                <Clock4 className='text-cyan-400 ' size={14} />
                                <span className=" text-cyan-400  text-xs font-semibold">
                                    {format(new Date(task.startTime), "hh:mm a ")}
                                </span>

                                <span className="text-slate-500 text-xs"><ArrowRight size={14}></ArrowRight></span>

                                <span className=" text-purple-400 text-xs font-semibold">
                                    {format(new Date(task.endTime), "hh:mm a ")}
                                </span>
                            </div>
                            :
                            <Skeleton height={25} width={176} borderRadius={12}></Skeleton>
                    }

                    {
                        isReady ?
                            <p className=' text-xs rounded-xl inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-300 px-2.5 py-1.5'>
                                <Timer className='text-amber-300 ' size={14} />
                                {getDateDiff(task.startTime, task.endTime)}</p>
                            : <Skeleton height={30} width={65} borderRadius={12}></Skeleton>
                    }

                </div>

                {/* Divider */}
                <div className="border-t border-slate-700/60 my-3"></div>

                {/* Description */}

                {
                    isReady ?
                        <p className="text-sm text-slate-300 leading-relaxed gap-4 bg-[#0f1629]/80 block rounded-xl border border-slate-800/80  p-3">
                            {task.description}
                        </p>
                        :
                        <Skeleton height={48} width={'full'} borderRadius={12}></Skeleton>
                }
                {/* 
                <p className="text-sm text-slate-300 leading-relaxed gap-4 bg-[#0f1629]/80 block rounded-xl border border-slate-800/80  p-3">
                    {task?.description || <Skeleton></Skeleton>}
                </p> */}




            </div>
        </SkeletonTheme>
    );
};

export default ActivitiesCard;