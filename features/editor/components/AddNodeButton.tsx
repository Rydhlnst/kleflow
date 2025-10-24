"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { memo } from "react"

export const AddNodeButton = memo(() => {
    return (
        <Button className="bg-primary" onClick={() => {}} size={"icon"} variant={"outline"}>
            <PlusIcon className="text-background"/>
        </Button>
    )
})

AddNodeButton.displayName = "AddNodeButton"