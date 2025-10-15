import {headers} from "next/headers"
import {redirect} from "next/navigation"
import {auth} from "./auth"

export const requireAuth = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        redirect("/login")
    }
}

export const requireUnauth = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(session) {
        redirect("/")
    }
}