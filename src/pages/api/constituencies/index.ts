import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { constituencyValidationSchema } from 'validationSchema/constituencies';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getConstituencies();
    case 'POST':
      return createConstituency();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getConstituencies() {
    const data = await prisma.constituency
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'constituency'));
    return res.status(200).json(data);
  }

  async function createConstituency() {
    await constituencyValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.issue?.length > 0) {
      const create_issue = body.issue;
      body.issue = {
        create: create_issue,
      };
    } else {
      delete body.issue;
    }
    const data = await prisma.constituency.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
