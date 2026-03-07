"use client";
import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@ui/alert-dialog";
import { useModelStore } from '@/store';


const AlertDialogComponent: React.FC = () => {
    const { openModel, modelData, onAction, hideModel } = useModelStore();

    const handleAction = () => {
        onAction && onAction();
        hideModel();
    }
    

    return (
        <AlertDialog open={openModel} onOpenChange={hideModel}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {modelData?.title || 'Are you sure?'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {modelData?.description || 'This action cannot be undone.'}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        {modelData?.canclelText || 'Cancel'}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleAction}>
                        {modelData?.actionText || 'Continue'}
                    </AlertDialogAction>
                </AlertDialogFooter>
                
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDialogComponent