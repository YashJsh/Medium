export const Skeleton = () => {
    return (
        <div className="flex flex-col gap-1 max-w-[50vw] border-b-[1px] border-gray-400 p-4 cursor-pointer animate-pulse">
            <div className="flex items-center gap-2">
                <div className="rounded-full h-[3vh] w-[3vh] bg-gray-300"></div>
                <div className="h-4 w-1/5 bg-gray-300 rounded-md"></div>
                <div className="h-4 w-1/6 bg-gray-300 rounded-md"></div>
            </div>
            <div className="h-8 w-3/4 bg-gray-300 rounded-md mt-2"></div>
            <div className="h-4 w-full bg-gray-300 rounded-md mt-2"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded-md mt-1"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded-md mt-1"></div>
            <div className="h-3 w-1/5 bg-gray-300 rounded-md mt-3"></div>
        </div>
    );
};
