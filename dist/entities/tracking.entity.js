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
exports.Tracking = void 0;
const typeorm_1 = require("typeorm");
const shipments_entity_1 = require("./shipments.entity");
let Tracking = class Tracking {
};
exports.Tracking = Tracking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Tracking.prototype, "id_tracking", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => shipments_entity_1.Shipment, (shipment) => shipment.id_shipment, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'fk_shipment' }),
    __metadata("design:type", Number)
], Tracking.prototype, "id_shipment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tracking.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Tracking.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tracking.prototype, "state", void 0);
exports.Tracking = Tracking = __decorate([
    (0, typeorm_1.Entity)()
], Tracking);
//# sourceMappingURL=tracking.entity.js.map