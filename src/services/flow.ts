import { FlowConfig, NodeConfig, db } from '@/db'
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

  createFlow: async (data: Omit<FlowConfig, 'id'>) => {
    const id = nanoid()
    await db.flows.add({ ...data, id })
    return id
  },

  updateFlow: async (data: FlowConfig) => {
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

  createNode: async (node: Omit<Node, 'id'>, data: Omit<NodeConfig, 'id'>) => {
    const id = nanoid()
    await db.nodes.add({ ...data, id })
    await db.flows.update(data.flowId, { $push: { nodes: { ...node, id } } })

    return id
  },

  updateNode: async (data: NodeConfig) => {
    db.nodes.put(data)
    return data.id
  },

  removeNode: async (id: string) => {
    await db.nodes.delete(id)
    await db.flows.update(id, { $unset: { nodes: id } })
  },
}
