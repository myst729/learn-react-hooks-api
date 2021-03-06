const { test } = require('tap')
const { build } = require('../helper')

test('todo is loaded', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/todo'
  })
  t.equal(res.payload, 'Give me a hug.')
})

// inject callback style:
//
// test('example is loaded', (t) => {
//   t.plan(2)
//   const app = build(t)
//
//   app.inject({
//     url: '/example'
//   }, (err, res) => {
//     t.error(err)
//     t.equal(res.payload, 'this is an example')
//   })
// })
