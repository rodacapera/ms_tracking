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
exports.AppController = void 0;
const microservices_1 = require("@nestjs/microservices");
const app_shipment_service_1 = require("./app.shipment.service");
const dto_1 = require("./dto");
const app_tracking_service_1 = require("./app.tracking.service");
const common_1 = require("@nestjs/common");
let AppController = class AppController {
    constructor(appService, trackingService) {
        this.appService = appService;
        this.trackingService = trackingService;
    }
    getHello() {
        return this.appService.getHello();
    }
    getTracking() {
        return this.trackingService.getTracking();
    }
    getTrackingById(id) {
        return this.trackingService.getTrackingById(id);
    }
    async createShipment(data) {
        const shipmentResult = await this.appService.createShipment(data);
        const trackingData = {
            id_shipment: shipmentResult.id_shipment,
            location: 'some location',
            state: 'pending',
        };
        const trackingResult = this.trackingService.createTracking(trackingData);
        this.trackingService.sendNotify(data);
        return shipmentResult;
    }
    async getShipment() {
        return this.appService.getShipment();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/tracking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getTracking", null);
__decorate([
    (0, common_1.Get)('/tracking/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getTrackingById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create-shipment' }, microservices_1.Transport.RMQ),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateShipmentDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createShipment", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-shipment' }, microservices_1.Transport.RMQ),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getShipment", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_shipment_service_1.AppService,
        app_tracking_service_1.TrackingService])
], AppController);
//# sourceMappingURL=app.controller.js.map