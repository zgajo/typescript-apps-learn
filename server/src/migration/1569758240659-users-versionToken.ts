import {MigrationInterface, QueryRunner} from "typeorm";

export class usersVersionToken1569758240659 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "lastInvalidateTokenTime" TO "tokenVersion"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tokenVersion"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "tokenVersion" integer NOT NULL DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tokenVersion"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "tokenVersion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "tokenVersion" TO "lastInvalidateTokenTime"`, undefined);
    }

}
