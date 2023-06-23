import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { janaSenaValidationSchema } from 'validationSchema/jana-senas';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getJanaSenas();
    case 'POST':
      return createJanaSena();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getJanaSenas() {
    const data = await prisma.jana_sena
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'jana_sena'));
    return res.status(200).json(data);
  }

  async function createJanaSena() {
    await janaSenaValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.constituency?.length > 0) {
      const create_constituency = body.constituency;
      body.constituency = {
        create: create_constituency,
      };
    } else {
      delete body.constituency;
    }
    const data = await prisma.jana_sena.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
