import { InboxIcon } from "lucide-react"

import {
  PreviewKitGroup,
  PreviewKitSection,
  PreviewKitState,
} from "@/app/preview/kit/section"
import { Button } from "@/registry/xuan/ui/button"
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/xuan/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyIcon,
  EmptyTitle,
} from "@/registry/xuan/ui/empty"
import { Skeleton } from "@/registry/xuan/ui/skeleton"

function PreviewCardBox() {
  return (
    <PreviewKitSection id="card" label="Card, Skeleton & Empty">
      <PreviewKitGroup label="card">
        <PreviewKitState caption="With footer">
          <Card className="w-80 max-w-full">
            <CardHeader>
              <CardTitle>Date Picker</CardTitle>
              <CardDescription>Updated Aug 24 by An Nguyen</CardDescription>
            </CardHeader>
            <CardBody>
              Single and range selection with disabled dates and keyboard
              navigation.
            </CardBody>
            <CardFooter>
              <Button variant="plain" size="compact">
                View docs
              </Button>
              <Button size="compact">Open</Button>
            </CardFooter>
          </Card>
        </PreviewKitState>
        <PreviewKitState caption="Loading">
          <Card className="w-80 max-w-full">
            <CardHeader>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardBody className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-40" />
            </CardBody>
          </Card>
        </PreviewKitState>
      </PreviewKitGroup>
      <PreviewKitGroup label="empty state">
        <PreviewKitState caption="Inside a card">
          <Card className="w-80 max-w-full">
            <Empty>
              <EmptyIcon>
                <InboxIcon />
              </EmptyIcon>
              <EmptyHeader>
                <EmptyTitle>No components yet</EmptyTitle>
                <EmptyDescription>
                  Add your first component to see it listed here.
                </EmptyDescription>
              </EmptyHeader>
              <Button size="compact">Add component</Button>
            </Empty>
          </Card>
        </PreviewKitState>
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewCardBox }
