"use client"

import {
  ArchiveIcon,
  ChevronDownIcon,
  CopyIcon,
  InfoIcon,
  LinkIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/registry/xuan/ui/avatar"
import { Badge } from "@/registry/xuan/ui/badge"
import { Button } from "@/registry/xuan/ui/button"
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "@/registry/xuan/ui/menu"
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/xuan/ui/popover"
import {
  PreviewKitGroup,
  PreviewKitSection,
  PreviewKitState,
} from "@/app/preview/kit/section"

function PreviewMenuBox() {
  return (
    <PreviewKitSection id="menu" label="Menu & Popover">
      <PreviewKitGroup label="dropdown menu">
        <PreviewKitState caption="Action menu">
          <Menu>
            <MenuTrigger
              render={
                <Button variant="secondary" className="gap-2">
                  Options
                  <ChevronDownIcon
                    size={15}
                    strokeWidth={2.2}
                    className="transition-transform duration-150 ease-out group-data-popup-open/button:rotate-180"
                  />
                </Button>
              }
            />
            <MenuContent>
              <MenuItem>
                <PencilIcon strokeWidth={2} />
                Edit
                <MenuShortcut>⌘E</MenuShortcut>
              </MenuItem>
              <MenuItem>
                <CopyIcon strokeWidth={2} />
                Duplicate
                <MenuShortcut>⌘D</MenuShortcut>
              </MenuItem>
              <MenuItem>
                <LinkIcon strokeWidth={2} />
                Copy link
              </MenuItem>
              <MenuSeparator />
              <MenuItem>
                <ArchiveIcon strokeWidth={2} />
                Archive
              </MenuItem>
              <MenuItem variant="danger">
                <Trash2Icon strokeWidth={2} />
                Delete
                <MenuShortcut>⌫</MenuShortcut>
              </MenuItem>
            </MenuContent>
          </Menu>
        </PreviewKitState>
      </PreviewKitGroup>
      <PreviewKitGroup label="popover">
        <PreviewKitState caption="Info popover">
          <Popover>
            <PopoverTrigger
              render={
                <Button variant="secondary" className="gap-2">
                  <InfoIcon size={15} strokeWidth={2} />
                  About this component
                </Button>
              }
            />
            <PopoverContent>
              <PopoverBody>
                <div className="flex items-center justify-between gap-2">
                  <PopoverTitle>Date Picker</PopoverTitle>
                  <Badge variant="success" size="sm">
                    Stable
                  </Badge>
                </div>
                <PopoverDescription>
                  Single and range selection with disabled dates, hover preview
                  and keyboard navigation. Week starts on Monday.
                </PopoverDescription>
                <div className="mt-1 flex items-center gap-2">
                  <Avatar tone="tint" size="sm">
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <span className="text-[12.5px] text-ink-muted">
                    An Nguyen · updated Aug 24
                  </span>
                </div>
              </PopoverBody>
              <PopoverFooter>
                <Button variant="plain" size="compact">
                  View docs
                </Button>
                <Button size="compact">Open in editor</Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </PreviewKitState>
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewMenuBox }
