import { MigrationInterface, QueryRunner } from "typeorm";

export class SetTimeZone1569755093178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("SET TIME ZONE 'Europe/Zagreb'");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("");
  }
}
