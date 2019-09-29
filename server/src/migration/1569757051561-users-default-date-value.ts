import {MigrationInterface, QueryRunner} from "typeorm";

export class usersDefaultDateValue1569757051561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastInvalidateTokenTime" SET DEFAULT CURRENT_TIMESTAMP`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastInvalidateTokenTime" DROP DEFAULT`, undefined);
    }

}
