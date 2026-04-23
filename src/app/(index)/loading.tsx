import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
    return ( 
        <div className="container flex items-center space-x-4 my-20">
            <div className="w-64 space-y-4">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="flex-1 space-y-4">
                <Skeleton className="h-4 w-[150px]" />
                <div className="grid-cols-3 gap-4">
                    {/* {三列空白} */}
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        </div>
     );
}

export default Loading;