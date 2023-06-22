const supertest = require('supertest')
const app = require('../app')
require('../models')


let directorId

test("POST -> '/api/v1/directors', should return status code 201", async () => {
  const body = {
    firstName: 'Lin-',
    lastName: 'Miranda',
    nationality: 'USA',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Andrew_Garfield_by_Gage_Skidmore_%28cropped%29.jpg/473px-Andrew_Garfield_by_Gage_Skidmore_%28cropped%29.jpg',
    birthday: '1980-01-16'
  }

  const res = await supertest(app).post('/api/v1/directors').send(body)

  directorId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body.firstName).toBe(body.firstName)
})

test("GET -> '/api/v1/directors', should return status code 200", async () => {
  const res = await supertest(app).get('/api/v1/directors')
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test("PUT -> '/api/v1/directors/:id', should return status code and and res.body.firstName === director.firstName", async () => {
  const director = {
    firstName: 'Lin-Manuel'
  }

  const res = await supertest(app).put(`/api/v1/directors/${directorId}`).send(director)

  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(director.firstName)
})

test("DELETE -> '/api/v1/directors/:id', should return status code 204", async () => {
  const res = await supertest(app).delete(`/api/v1/directors/${directorId}`)
  expect(res.status).toBe(204)
})
