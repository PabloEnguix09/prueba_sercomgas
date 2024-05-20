import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity({ name: 'marketers' })
export class Marketer {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}