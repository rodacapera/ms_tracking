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
exports.TrackingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tracking_entity_1 = require("./entities/tracking.entity");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let TrackingService = class TrackingService {
    constructor(trackingRepository, httpService) {
        this.trackingRepository = trackingRepository;
        this.httpService = httpService;
    }
    async getTracking() {
        return await this.trackingRepository.find({ relations: ['id_shipment'] });
    }
    async getTrackingById(id_tracking) {
        return await this.trackingRepository.findOne({
            where: { id_tracking },
            relations: ['id_shipment'],
        });
    }
    async createTracking(data) {
        const tracking = this.trackingRepository.create(data);
        const result = await this.trackingRepository.save(tracking);
        return result;
    }
    async sendNotify(body) {
        const message = JSON.stringify({
            title: `the product ${body.content} is in progress`,
        });
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .post('http://localhost:3001/notification', message, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.catchError)((error) => {
            console.log(error.response.data);
            throw 'An error happened!';
        })));
        return data;
    }
};
exports.TrackingService = TrackingService;
exports.TrackingService = TrackingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tracking_entity_1.Tracking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService])
], TrackingService);
//# sourceMappingURL=app.tracking.service.js.map