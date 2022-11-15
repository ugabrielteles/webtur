import { z } from "zod"
import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"

export async function rolesRoutes(fastify: FastifyInstance) {
    fastify.get('/roles', async () => {
        return await prisma.role.findMany();
    })

    fastify.get('/roles/:id', async (request) => {
        const roleParams = z.object({
            id: z.string()
        })

        const { id } = roleParams.parse(request.params);

        return await prisma.role.findUnique({
            where: {
                id
            }
        });
    })

    fastify.post('/roles', async (request, reply) => {
        const createRoleBody = z.object({
            name: z.string()
        })

        const { name } = createRoleBody.parse(request.body);

        try {
            await prisma.role.create({
                data: {
                    name
                }
            })
        } catch (error) {
            return reply.status(400).send({ error })
        }

        return reply.status(201).send({})
    })

    fastify.put('/roles/:id', async (request, reply) => {
        const updateRoleBody = z.object({
            name: z.string()
        })

        const updateRoleParams = z.object({
            id: z.string()
        })

        const { name } = updateRoleBody.parse(request.body);
        const { id } = updateRoleParams.parse(request.params)

        try {
            await prisma.role.update({
                data: {
                    name
                },
                where: {
                    id
                }
            })
        } catch (error) {
            return reply.status(400).send({ error })
        }

        return reply.status(201).send({})
    })
}