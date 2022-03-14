"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_movie_dto_1 = require("./dtos/create-movie.dto");
const update_movie_dto_1 = require("./dtos/update-movie.dto");
const movie_entity_1 = require("./entities/movie.entity");
const types_1 = require("./gql-types/types");
const movie_service_1 = require("./movie.service");
let MovieResolver = class MovieResolver {
    constructor(movieService) {
        this.movieService = movieService;
    }
    async movies() {
        return this.movieService.findAll();
    }
    async movie(id) {
        return this.movieService.findById(id);
    }
    async createMovie(createMovieInput) {
        return this.movieService.create(createMovieInput);
    }
    async updateMovie(id, updateMovieInput) {
        return this.movieService.update(id, updateMovieInput);
    }
    async deleteMovie(id) {
        const message = await this.movieService.delete(id);
        return {
            message,
        };
    }
};
__decorate([
    (0, graphql_1.Query)(() => [movie_entity_1.Movie]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "movies", null);
__decorate([
    (0, graphql_1.Query)(() => movie_entity_1.Movie),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "movie", null);
__decorate([
    (0, graphql_1.Mutation)(() => movie_entity_1.Movie),
    __param(0, (0, graphql_1.Args)('createMovieInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_movie_dto_1.CreateMovieDto]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "createMovie", null);
__decorate([
    (0, graphql_1.Mutation)(() => movie_entity_1.Movie),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('updateMovieInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_movie_dto_1.UpdateMovieDto]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "updateMovie", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.DeleteMovieDto),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "deleteMovie", null);
MovieResolver = __decorate([
    (0, graphql_1.Resolver)(() => movie_entity_1.Movie),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieResolver);
exports.MovieResolver = MovieResolver;
//# sourceMappingURL=movie.resolver.js.map