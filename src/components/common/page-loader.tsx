import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const PageLoader: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full animate-in fade-in duration-500">
      <div className="space-y-2 mb-8">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-5 w-[350px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-[300px] w-full col-span-1 md:col-span-2 rounded-xl" />
        <Skeleton className="h-[300px] w-full rounded-xl" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <Skeleton className="h-[120px] w-full rounded-xl" />
        <Skeleton className="h-[120px] w-full rounded-xl" />
        <Skeleton className="h-[120px] w-full rounded-xl" />
        <Skeleton className="h-[120px] w-full rounded-xl" />
      </div>
      <div className="space-y-4 mt-8">
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-[95%] rounded-md" />
        <Skeleton className="h-8 w-[90%] rounded-md" />
      </div>
    </div>
  );
}

export default PageLoader;