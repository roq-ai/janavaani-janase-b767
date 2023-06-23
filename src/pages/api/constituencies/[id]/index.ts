import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { constituencyValidationSchema } from 'validationSchema/constituencies';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.constituency
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getConstituencyById();
    case 'PUT':
      return updateConstituencyById();
    case 'DELETE':
      return deleteConstituencyById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getConstituencyById() {
    const data = await prisma.constituency.findFirst(convertQueryToPrismaUtil(req.query, 'constituency'));
    return res.status(200).json(data);
  }

  async function updateConstituencyById() {
    await constituencyValidationSchema.validate(req.body);
    const data = await prisma.constituency.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteConstituencyById() {
    const data = await prisma.constituency.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
