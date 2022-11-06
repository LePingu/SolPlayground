import Fastify, { FastifyInstance } from 'fastify'
import { fundWallet, getNewKeyPair, getVersion } from './solana-service/sol-environment-check';

const server: FastifyInstance = Fastify({})

server.get('/version', async (request, reply) => {
  try {
    const solVersion = await getVersion();
    reply.code(200).send({ version: solVersion });
  } catch (error) {
    reply.code(500).send(error);
  }
});

server.get('/keypair', (request, reply) => {
  try {
    const newKeyPair = getNewKeyPair();
    reply.code(200).send(newKeyPair);
  } catch (error) {
    reply.code(500).send(error);
  }
});

const opts = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        address: {
          type: 'string'
        },
      },
    }
  }
}

const queryStringJsonSchema = {
  type: 'object',
  properties: {
    address: { type: 'string' }
  }
}

type FundRequest = FastifyRequest<{
  Querystring: { address: string }
}>

const schema = {
  querystring: queryStringJsonSchema
}

server.get('/fund', { schema }, async (request: FundRequest, reply) => {
  try {
    const address = request.query.address;
    const newKeyPair = fundWallet(request.query.address<string>);
    reply.code(200).send(newKeyPair);
  } catch (error) {
    reply.code(500).send(error);
  }
});

const start = async () => {
  try {
    await server.listen({ port: 3053 })

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
