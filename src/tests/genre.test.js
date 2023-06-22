const supertest = require('supertest')
const app = require('../app')
require('../models')

let genreId

test("POST -> '/api/v1/genres', should return status code 201", async () => {
  const body = {
    name: 'musical'
  }

  const res = await supertest(app).post('/api/v1/genres').send(body)

  genreId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body.name).toBe(body.name)
})

test("GET -> '/api/v1/genres', should return status code 200", async () => {
  const res = await supertest(app).get('/api/v1/genres')
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test("PUT -> '/api/v1/genres/:id', should return status code and and res.body.name === genre.name", async () => {
  const genre = {
    name: 'músical'
  }

  const res = await supertest(app).put(`/api/v1/genres/${genreId}`).send(genre)

  expect(res.status).toBe(200)
  expect(res.body.name).toBe(genre.name)
})

test("DELETE -> '/api/v1/genres/:id', should return status code 204", async () => {
  const res = await supertest(app).delete(`/api/v1/genres/${genreId}`)
  expect(res.status).toBe(204)
})
