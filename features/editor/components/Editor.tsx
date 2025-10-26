"use client"

import { ErrorView, LoadingView } from '@/components/entiity-components'
import { useSuspenseWorkflow } from '@/features/workflows/hooks/use-workflow'
import React, { useCallback, useState } from 'react'
import { applyNodeChanges, ReactFlow, applyEdgeChanges, addEdge, type Node, type Edge,
  type EdgeChange, type NodeChange, type Connection,
  Background,
  Controls,
  MiniMap,
  Panel
} from "@xyflow/react"
import '@xyflow/react/dist/style.css';
import { NodeComponents } from '@/config/node-components'
import { AddNodeButton } from './AddNodeButton'
import { useSetAtom } from 'jotai'
import { editorAtom } from '../store/atoms'

export const EditorLoading = () => {
    return <LoadingView message='Loading editor...'/>
}

export const EditorError = () => {
    return <ErrorView message='Editor error'/>
}

const Editor = ({workflowId}: {workflowId: string}) => {

    const {data: workflow} = useSuspenseWorkflow(workflowId);

    const setEditor = useSetAtom(editorAtom)

    const [nodes, setNodes] = useState<Node[]>(workflow.nodes);
    const [edges, setEdges] = useState<Edge[]>(workflow.edges);

    const onNodesChange = useCallback(
      (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
      [],
    );
    const onEdgesChange = useCallback(
      (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
      [],
    );
    const onConnect = useCallback(
      (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
      [],
    );

    

  return (
    <div className='size-full'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={NodeComponents}
          onInit={setEditor}
          fitView
          snapGrid={[10, 10]}
          snapToGrid
          panOnScroll
          panOnDrag={false}
          selectionOnDrag
        >
          <Background/>
          <Controls/>
          <MiniMap/>
          <Panel position='top-right'>
            <AddNodeButton/>
          </Panel>
        </ReactFlow>
    </div>
  )
}

export default Editor
