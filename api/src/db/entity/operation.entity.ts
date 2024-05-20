import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToMany
} from "typeorm";
import { Marketer } from "./marketer.entity";

@Entity({ name: 'operations' })
export class Operation {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @OneToMany(() => Marketer, (marketer) => marketer.id)
    @Column({ type: 'int' })
    marketer_id!: number;

    @OneToMany(() => Marketer, (marketer) => marketer.id)
    @Column({ type: 'int' })
    client_id!: number;

    @Column({ type: 'varchar', length: 20 })
    type!: string;

    @Column({type: 'float'})
    amount!: number; 

    @Column({type: 'float'})
    price!: number;
}
    
