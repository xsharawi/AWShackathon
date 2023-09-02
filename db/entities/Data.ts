import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Timestamp } from "typeorm/browser";


@Entity()
export class Data extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('text')
    filePath: string

    @Column('text')
    response: string
    
    @Column('text')
    type: string

    @CreateDateColumn({type:'timestamp', default: () => "CURRENT_TIMESTAMP()"})
    createdAt: Date
}