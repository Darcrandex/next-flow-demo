import { FlowData, NodeData, db } from '@/db'
import { nanoid } from 'nanoid'
import { Node } from 'reactflow'

export const flowService = {
  flows: async () => {
    const res = await db.flows.toArray()
    return res
  },

  getFlow: async (id: string) => {
    return await db.flows.get(id)
  },

  createFlow: async (data: Omit<FlowData, 'id'>) => {
    const id = nanoid()
    await db.flows.add({ ...data, id })
    return id
  },

  updateFlow: async (data: FlowData) => {
    await db.flows.put(data)
    return data.id
  },

  removeFlow: async (id: string) => {
    await db.flows.delete(id)
    await db.nodes.where('flowId').equals(id).delete()
  },

  getNodeById: async (id: string) => {
    return db.nodes.get(id)
  },

  createNode: async (node: Omit<Node, 'id'>, data: Omit<NodeData, 'id'>) => {
    const id = nanoid()
    await db.nodes.add({ ...data, id })
    const flow = await db.flows.get(data.flowId)
    await db.flows.update(data.flowId, { nodes: flow?.nodes.concat({ ...node, id }) || [] })

    return id
  },

  updateNode: async (data: NodeData) => {
    db.nodes.put(data)
    return data.id
  },

  removeNode: async (id: string) => {
    const node = await db.nodes.get(id)
    const flow = node?.flowId ? await db.flows.get(node?.flowId) : undefined
    await db.nodes.delete(id)

    if (flow) {
      await db.flows.update(flow.id, { nodes: flow.nodes.filter((n) => n.id !== id) })
    }
  },
}
