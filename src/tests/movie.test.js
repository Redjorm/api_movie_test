const supertest = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')
require('../models')
let movieId

test("POST -> '/api/v1/movies', should return status code 201", async () => {
  const body = {
    name: 'TIK TAK BOOM',
    image: 'Lorem ipsum dolor sit amet',
    synopsis: 'Lorem ipsum dolor sit amet',
    releaseYear: 2020
  }

  const res = await supertest(app).post('/api/v1/movies').send(body)

  movieId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body.name).toBe(body.name)
})

test("GET -> '/api/v1/movies', should return status code 200", async () => {
  const res = await supertest(app).get('/api/v1/movies')
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
  expect(res.body[0].actors)
  expect(res.body[0].directors)
  expect(res.body[0].genres)
})

test("PUT -> '/api/v1/movies/:id', should return status code 200 and and res.body.name === movie.name", async () => {
  const movie = {
    name: 'TIK TAK BOOM'
  }

  const res = await supertest(app).put(`/api/v1/movies/${movieId}`).send(movie)

  expect(res.status).toBe(200)
  expect(res.body.name).toBe(movie.name)
})

test("POST -> '/api/v1/movies/:id/actors', set movies actors, should return status code 200 and res.body.length = 1", async () => {
  const body = {
    firstName: 'Andrew',
    lastName: 'Garfield',
    nationality: 'USA',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Andrew_Garfield_by_Gage_Skidmore_%28cropped%29.jpg/473px-Andrew_Garfield_by_Gage_Skidmore_%28cropped%29.jpg',
    birthday: '1983-08-20'
  }

  const actor = await Actor.create(body)

  const res = await supertest(app)
    .post(`/api/v1/movies/${movieId}/actors`)
    .send([actor.id])

  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)

  actor.destroy()
})

test("POST -> '/api/v1/movies/:id/directors', set movies directors, should return status code 200 and res.body.length = 1", async () => {
  const body = {
    firstName: 'Lin',
    lastName: 'Miranda',
    nationality: 'USA',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Andrew_Garfield_by_Gage_Skidmore_%28cropped%29.jpg/473px-Andrew_Garfield_by_Gage_Skidmore_%28cropped%29.jpg',
    birthday: '1980-01-16'
  }

  const director = await Director.create(body)

  const res = await supertest(app)
    .post(`/api/v1/movies/${movieId}/directors`)
    .send([director.id])

  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)

  director.destroy()
})

test("POST -> '/api/v1/movies/:id/genres', set movies genres, should return status code 200 and res.body.length = 1", async () => {
  const body = {
    name: 'musical'
  }

  const genre = await Genre.create(body)

  const res = await supertest(app)
    .post(`/api/v1/movies/${movieId}/genres`)
    .send([genre.id])

  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)

  genre.destroy()
})

test("DELETE -> '/api/v1/movies/:id', should return status code 204", async () => {
  const res = await supertest(app).delete(`/api/v1/movies/${movieId}`)
  expect(res.status).toBe(204)
})
