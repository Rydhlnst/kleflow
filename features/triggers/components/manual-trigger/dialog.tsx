"use client"

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React from 'react'

const ManualTriggerDialog = ({onOpenChange, open}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Manual Trigger
                </DialogTitle>
                <DialogDescription>
                    Configure settings for the manual trigger
                </DialogDescription>
            </DialogHeader>
            <div className='py-4'>
                <p className='text-sm text-muted-foreground'>
                    Fine-tune your workflow before hitting run — total control, zero hassle.
                </p>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ManualTriggerDialog
