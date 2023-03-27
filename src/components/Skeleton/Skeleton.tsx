import React from "react";

const Skeleton = ({ numbers }: { numbers: number }) => {
    const skeleton = () => {
        let skeletonCard: JSX.Element[] = [];
        for (let i = 0; i < numbers; i++) {
            skeletonCard.push(
                <div
                    key={i}
                    className="border rounded-lg shadow-md h-[437px] border-green-300  p-4"
                >
                    <div className="animate-pulse">
                        <div className="h-72 rounded-lg  bg-slate-500"></div>
                        <div className="flex-1 space-y-6 mt-4">
                            <div className="h-2 bg-slate-500 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-500 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-500 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-500 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return skeletonCard;
    };

    return <>{skeleton()}</>;
};

export default Skeleton;
