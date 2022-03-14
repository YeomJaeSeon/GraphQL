import {ApolloServer, gql} from 'apollo-server'
import { movies, actors } from './database.js'

const typeDefs = gql`
# 루트쿼리 Query
    type Query{
        movies: [Movie]
        movie(id: Int!):Movie
        actors: [Actor]
        actor(id: Int!): Actor
    }
# 루트 쿼리 Mutation
    type Mutation{
        createMovie(
            createMovieInput: CreateMovieInput
        ): Movie
        updateMovie(
            id: Int!
            description: String!
        ): Movie
        deleteMovie(
            id: Int!
        ): String
    }

# Object type
    type Movie{
        id: Int!
        title: String!
        description: String
        actors: [Actor!] 
        # 요렇게 Movie - Actor 타입간의 관계를 그래프형태로 설정할 수 있다. (관계 설졍에 유용하겠다는 생각이 든다.)
    }

    type Actor{
        id: Int
        name: String
    }

# input type
    input CreateMovieInput{
        title: String!
        description: String
        actorIds: [Int]
    }
` 

// GraphQL 쿼리를 어떻게 처리할지에 대한 resolver
const resolvers = {
    Query: {
        movies: () => movies,
        movie: (parent, args) => movies.find(movie => movie.id === args.id),
        actors: () => actors,
        actor: (parent, args) => actors.find(actor => actor.id === args.id)
    },
    Mutation: {
        createMovie: (parent, args) => {
            const {title, description, actorIds} = args.createMovieInput

            const resultActors = actors.filter(actor => actorIds.includes(actor.id))

            if(resultActors.length !== actorIds.length){
                throw new Error("존재하지 않는 배우입니다.")
            }

            const newId = ++movies[movies.length - 1].id

            const newMovie = {
                id: newId,
                title,
                description,
                actors: resultActors
            }
            movies.push(newMovie)

            return newMovie
        },
        updateMovie: (parent, args) => {
            const {id, description} = args;

            movies.forEach(movie => {
                if(movie.id === id) movie.description = description
            })

            return movies.filter(movie=> movie.id === id)[0]
        },
        deleteMovie: (parent, args) => {
            const id = args.id
            const foundMovie = movies.find(movie => movie.id === id)

            if(!foundMovie){
                return `#${id}의 영화 없음`
            }

            const deleteIdx = movies.indexOf(foundMovie)
            movies.splice(deleteIdx, 1)
            
            return "삭제 성공"
        }

    }
} 

const server = new ApolloServer( { typeDefs, resolvers } )

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url} 🚀`)
})