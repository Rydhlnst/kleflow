"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  FolderOpenIcon,
  KeyIcon,
  HistoryIcon,
  StarIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react"
import { authClient } from "@/lib/auth-client"

const menuItems = [
  {
    title: "Workflows",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions",
      },
    ],
  },
]

export default function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-3 h-10 px-4">
            <Link href="/workflows" prefetch>
              <Image
                src="/"
                alt="App Icon"
                width={30}
                height={30}
                className="rounded-md"
              />
              <span className="font-semibold text-sm">Kevflow</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive =
                    item.url === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.url)

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={isActive}
                        asChild
                        className="gap-x-3 h-10 px-4"
                      >
                        <Link href={item.url} prefetch>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Upgrade to Pro"
            className="gap-x-3 h-10 px-4"
            onClick={() => {}}
          >
            <StarIcon className="size-4" />
            <span>Upgrade to Pro</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Billing Portal"
            className="gap-x-3 h-10 px-4"
            onClick={() => {}}
          >
            <CreditCardIcon className="size-4" />
            <span>Billing Portal</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Sign Out"
            className="gap-x-3 h-10 px-4"
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => router.push("/login"),
                },
              })
            }
          >
            <LogOutIcon className="size-4" />
            <span>Sign Out</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  )
}
