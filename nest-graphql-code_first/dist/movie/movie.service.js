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
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const actor_entity_1 = require("../actor/entities/actor.entity");
const category_entity_1 = require("../category/entities/category.entity");
const typeorm_2 = require("typeorm");
const movie_entity_1 = require("./entities/movie.entity");
let MovieService = class MovieService {
    constructor(movieRepository, actorRepository, categoryRepository) {
        this.movieRepository = movieRepository;
        this.actorRepository = actorRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(createMovieDto) {
        const { title, rating, description, actorIds, categoryId } = createMovieDto;
        const newMovie = this.movieRepository.create({
            title,
            rating,
            description,
        });
        const foundActors = await this.actorRepository
            .createQueryBuilder('actor')
            .whereInIds(actorIds)
            .getMany();
        if (actorIds.length !== foundActors.length) {
            const excludedIds = actorIds.filter((id) => !foundActors.map((actor) => actor.id).includes(id));
            throw new common_1.NotFoundException(`#${excludedIds}의 배우들 없음`);
        }
        const foundCategory = await this.categoryRepository.findOne({
            id: categoryId,
        });
        if (!foundCategory) {
            throw new common_1.NotFoundException(`#${categoryId}의 카테고리 없음`);
        }
        newMovie.actors = foundActors;
        newMovie.category = foundCategory;
        return await this.movieRepository.save(newMovie);
    }
    async findAll() {
        const foundMovies = await this.movieRepository.find();
        const getMovieDtos = foundMovies.map((foundMovie) => this.movie2getMovieDto(foundMovie));
        return getMovieDtos;
    }
    async findById(id) {
        const foundMovie = await this.movieRepository.findOne({ id });
        if (!foundMovie) {
            throw new common_1.NotFoundException(`#${id}의 영화 없음`);
        }
        return this.movie2getMovieDto(foundMovie);
    }
    async update(id, updateMovieDto) {
        const foundMovie = await this.movieRepository.findOne({ id });
        if (!foundMovie) {
            throw new common_1.NotFoundException(`#${id}의 영화 없음`);
        }
        const { title, rating, description } = updateMovieDto;
        if (title)
            foundMovie.title = title;
        if (rating)
            foundMovie.rating = rating;
        if (description)
            foundMovie.description = description;
        return await this.movieRepository.save(foundMovie);
    }
    async delete(id) {
        const result = await this.movieRepository.delete(id);
        if (result.affected !== 1) {
            throw new common_1.NotFoundException(`#${id}의 영화 없음`);
        }
        return 'DELETE SUCCESS';
    }
    movie2getMovieDto(foundMovie) {
        const getActorDto = foundMovie.actors.map((actor) => {
            return {
                id: actor.id,
                name: actor.name,
                gender: actor.gender,
                country: actor.country,
                career: actor.career,
            };
        });
        return {
            id: foundMovie.id,
            title: foundMovie.title,
            rating: foundMovie.rating,
            description: foundMovie.description,
            actors: getActorDto,
            category: {
                id: foundMovie.category.id,
                name: foundMovie.category.name,
            },
        };
    }
};
MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __param(1, (0, typeorm_1.InjectRepository)(actor_entity_1.Actor)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MovieService);
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map