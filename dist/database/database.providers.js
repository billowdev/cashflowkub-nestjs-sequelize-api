"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const constants_1 = require("../core/constants");
const database_config_1 = require("./database.config");
const asset_entity_1 = require("../asset/entities/asset.entity");
const cashflowin_entity_1 = require("../cashflowin/entities/cashflowin.entity");
const cashflowout_entity_1 = require("../cashflowout/entities/cashflowout.entity");
const category_entity_1 = require("../category/entities/category.entity");
const debt_entity_1 = require("../debt/entities/debt.entity");
const pocket_entity_1 = require("../pocket/entities/pocket.entity");
const transfer_entity_1 = require("../transfer/entities/transfer.entity");
const user_entity_1 = require("../user/entities/user.entity");
const transaction_entity_1 = require("../transaction/entities/transaction.entity");
exports.databaseProviders = [{
        provide: constants_1.SEQUELIZE,
        useFactory: async () => {
            let config;
            let isForce;
            switch (process.env.NODE_ENV) {
                case constants_1.DEVELOPMENT:
                    config = database_config_1.dbConfig.development;
                    isForce = false;
                    break;
                case constants_1.TEST:
                    config = database_config_1.dbConfig.test;
                    isForce = true;
                    break;
                case constants_1.PRODUCTION:
                    config = database_config_1.dbConfig.production;
                    isForce = false;
                    break;
                default:
                    config = database_config_1.dbConfig.development;
            }
            const sequelize = new sequelize_typescript_1.Sequelize(config);
            sequelize.addModels([
                user_entity_1.UserEntity,
                category_entity_1.CategoryEntity,
                pocket_entity_1.PocketEntity,
                cashflowin_entity_1.CashflowinEntity,
                cashflowout_entity_1.CashflowoutEntity,
                transfer_entity_1.TransferEntity,
                asset_entity_1.AssetEntity,
                debt_entity_1.DebtEntity,
                transaction_entity_1.TransactionEntity
            ]);
            await sequelize.sync({ force: isForce });
            return sequelize;
        },
    }];
//# sourceMappingURL=database.providers.js.map