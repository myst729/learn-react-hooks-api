const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./db/todo.db', sqlite3.OPEN_READWRITE, err => {
  console.error(err ? err.message : 'Connected to the chinook database.')
})

module.exports = async function (fastify, opts) {

  fastify.get('/', function (request, reply) {
    db.all('SELECT _id, text, done FROM todo', [], (err, rows) => {
      if (err) {
        reply.send(err)
      } else {
        rows.forEach(row => row.done = !!row.done)
        reply.send(rows)
      }
    })
  })

  fastify.post('/', function (request, reply) {
    db.run(`INSERT INTO todo (text, done) VALUES ('${request.body.text}', 0)`, [], function (err) {
      if (err) {
        reply.send(err)
      } else {
        reply.send({ _id: this.lastID, text: request.body.text, done: false })
      }
    })
  })

  fastify.get('/:_id', async function (request, reply) {
    db.get(`SELECT _id, text, done FROM todo WHERE _id = '${request.params._id}'`, [], function (err, row) {
      if (err) {
        reply.send(err)
      } else {
        row.done = !!row.done
        reply.send(row)
      }
    })
  })

  fastify.put('/:_id', async function (request, reply) {
    db.get(`UPDATE todo SET done = '${+request.body.done}' WHERE _id = ${request.params._id}`, [], function (err, row) {
      if (err) {
        reply.send(err)
      } else {
        db.get(`SELECT _id, text, done FROM todo WHERE _id = '${request.params._id}'`, [], function (err, row) {
          if (err) {
            reply.send(err)
          } else {
            row.done = !!row.done
            reply.send(row)
          }
        })
      }
    })
  })

  fastify.delete('/:_id', async function (request, reply) {
    db.run(`DELETE FROM todo WHERE _id = ${request.params._id}`, [], function (err) {
      if (err) {
        reply.send(err)
      } else {
        reply.send(null)
      }
    })
  })
}
