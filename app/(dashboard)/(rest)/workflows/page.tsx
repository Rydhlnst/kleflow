
import { WorkflowsContainer, WorkflowsList } from '@/components/workflows/Workflows';
import { workflowsParamsLoader } from '@/features/workflows/server/params-loader';
import { prefetchWorkflows } from '@/features/workflows/server/prefetch';
import { requireAuth } from '@/lib/auth-utils'
import { HydrateClient } from '@/trpc/server';
import type { SearchParams } from 'nuqs/server';
import React, { Suspense } from 'react'
import {ErrorBoundary} from "react-error-boundary"

type Props = {
  searchParams: Promise<SearchParams>
}

const WorkflowPage = async ({searchParams}: Props) => {
  await requireAuth();

  const params = await workflowsParamsLoader(searchParams)

  prefetchWorkflows(params);

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error!</p>}>
          <Suspense fallback={<p>Loading...</p>}>
            <WorkflowsList/>
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  )
}

export default WorkflowPage
