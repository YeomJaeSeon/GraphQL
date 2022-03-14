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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = exports.Country = exports.Gender = void 0;
const graphql_1 = require("@nestjs/graphql");
const movie_entity_1 = require("../../movie/entities/movie.entity");
const typeorm_1 = require("typeorm");
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
})(Gender = exports.Gender || (exports.Gender = {}));
var Country;
(function (Country) {
    Country["SOUTH_KOREA"] = "SOUTH_KOREA";
    Country["AMERICA"] = "AMERICA";
    Country["JAPAN"] = "JAPAN";
    Country["CHINA"] = "CHINA";
    Country["FRANCE"] = "FRANCE";
})(Country = exports.Country || (exports.Country = {}));
(0, graphql_1.registerEnumType)(Gender, {
    name: 'Gender',
});
(0, graphql_1.registerEnumType)(Country, {
    name: 'Country',
});
let Actor = class Actor {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Actor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Actor.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        nullable: true,
        enum: Gender,
    }),
    (0, graphql_1.Field)(() => Gender),
    __metadata("design:type", String)
], Actor.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Actor.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        nullable: true,
        enum: Country,
    }),
    (0, graphql_1.Field)(() => Country),
    __metadata("design:type", String)
], Actor.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Actor.prototype, "career", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => movie_entity_1.Movie, (movie) => movie.actors),
    (0, graphql_1.Field)(() => [movie_entity_1.Movie]),
    __metadata("design:type", Array)
], Actor.prototype, "movies", void 0);
Actor = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Actor);
exports.Actor = Actor;
//# sourceMappingURL=actor.entity.js.map