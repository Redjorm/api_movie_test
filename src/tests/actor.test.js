const supertest = require('supertest')
const app = require('../app')
require('../models')


let actorId

test("POST -> '/api/v1/actors', should return status code 201", async () => {
  const body = {
    firstName: 'Andre',
    lastName: 'Garfield',
    nationality: 'USA',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Andrew_Garfield_by_Gage_Skidmore_%28cropped%29.jpg/473px-Andrew_Garfield_by_Gage_Skidmore_%28cropped%29.jpg',
    birthday: '1983-08-20'
  }

  const res = await supertest(app).post('/api/v1/actors').send(body)

  actorId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body.firstName).toBe(body.firstName)
})

test("GET -> '/api/v1/actors', should return status code 200", async () => {
  const res = await supertest(app).get('/api/v1/actors')
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test("PUT -> '/api/v1/actors/:id', should return status code and and res.body.firstName === actor.firstName", async () => {
  const actor = {
    firstName: 'Andrew'
  }

  const res = await supertest(app).put(`/api/v1/actors/${actorId}`).send(actor)

  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(actor.firstName)
})

test("DELETE -> '/api/v1/actors/:id', should return status code 204", async () => {
  const res = await supertest(app).delete(`/api/v1/actors/${actorId}`)
  expect(res.status).toBe(204)
})
