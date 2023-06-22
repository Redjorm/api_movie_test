const Actor = require("./Actor");
const Director = require("./Director")
const Movie = require("./Movie")
const Genre = require("./Genre")

//TABLA PIVOT: "MovieActor"
Movie.belongsToMany(Actor, {through: "MovieActor"})
Actor.belongsToMany(Movie, {through: "MovieActor"})

//TABLA PIVOT: "MovieDirector"
Movie.belongsToMany(Director, {through: "MovieDirector"})
Director.belongsToMany(Movie, {through: "MovieDirector"})

//TABLA PIVOT: "MovieGenre"
Movie.belongsToMany(Genre, {through: "MovieGenre"})
Genre.belongsToMany(Movie, {through: "MovieGenre"})
