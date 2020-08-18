const { ObjectID } = require('mongodb')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    try {
      const collection = await this.mongo.db.collection('todo')
      const result = await collection.find({}).toArray()
      reply.send(result)
    } catch (err) {
      reply.send(err)
    }
  })

  fastify.post('/', async function (request, reply) {
    try {
      const collection = await this.mongo.db.collection('todo')
      const result = await collection.insertOne({ text: request.body.text, done: false })
      reply.send(result.ops[0])
    } catch (err) {
      reply.send(err)
    }
  })

  fastify.get('/:_id', async function (request, reply) {
    try {
      const collection = await this.mongo.db.collection('todo')
      const result = await collection.findOne({ _id: ObjectID(request.params._id) })
      reply.send(result)
    } catch (err) {
      reply.send(err)
    }
  })

  fastify.put('/:_id', async function (request, reply) {
    try {
      const collection = await this.mongo.db.collection('todo')
      const result = await collection.findOneAndUpdate({ _id: ObjectID(request.params._id) }, { $set: { done: request.body.done } }, { returnOriginal: false })
      reply.send(result.value)
    } catch (err) {
      reply.send(err)
    }
  })

  fastify.delete('/:_id', async function (request, reply) {
    try {
      const collection = await this.mongo.db.collection('todo')
      const result = await collection.deleteOne({ _id: ObjectID(request.params._id) })
      reply.send(null)
    } catch (err) {
      reply.send(err)
    }
  })
}
