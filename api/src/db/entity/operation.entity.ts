import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    CreateDateColumn
} from "typeorm";
import { Marketer } from "./marketer.entity";

@Entity({ name: 'operations' })
export class Operation {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({ type: 'int', name: 'marketer_id' })
    @OneToOne(() => Marketer, (marketer) => marketer.id)
    marketer_id!: number;

    @Column({ type: 'int', name: 'client_id' })
    @OneToOne(() => Marketer, (marketer) => marketer.id)
    client_id!: number;

    @Column({ type: 'varchar', length: 20 })
    type!: string;

    @Column({type: 'float'})
    amount!: number; 

    @Column({type: 'float'})
    price!: number;

    @CreateDateColumn()
    created_at!: Date
}
    
