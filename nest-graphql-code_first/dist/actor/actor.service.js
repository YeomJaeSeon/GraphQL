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
exports.ActorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const actor_entity_1 = require("./entities/actor.entity");
let ActorService = class ActorService {
    constructor(actorRepository) {
        this.actorRepository = actorRepository;
    }
    async create(createActorDto) {
        const newActor = this.actorRepository.create(createActorDto);
        return await this.actorRepository.save(newActor);
    }
    async findAll() {
        return await this.actorRepository.find();
    }
    async findById(id) {
        const foundActor = await this.actorRepository.findOne({ id });
        if (!foundActor) {
            throw new common_1.NotFoundException(`#${id}의 배우 없음`);
        }
        return foundActor;
    }
};
ActorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(actor_entity_1.Actor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ActorService);
exports.ActorService = ActorService;
//# sourceMappingURL=actor.service.js.map