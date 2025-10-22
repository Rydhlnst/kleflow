import { ErrorView, LoadingView } from '@/components/entiity-components';
import Editor from '@/features/editor/components/Editor';
import EditorHeader from '@/features/editor/components/EditorHeader';
import { prefetchWorkflow } from '@/features/workflows/server/prefetch';
import { HydrateClient } from '@/trpc/server';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

interface PageProps {
    params: Promise<{
        workflowId: string
    }>
}

const ExecutionIDPage = async ({params}: PageProps) => {
    const {workflowId} = await params;

    prefetchWorkflow(workflowId);

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<ErrorView/>}>
        <Suspense fallback={<LoadingView/>}>
          <EditorHeader workflowId={workflowId}/>
          <main className='flex-1'>
            <Editor workflowId={workflowId}/>
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}

export default ExecutionIDPage
