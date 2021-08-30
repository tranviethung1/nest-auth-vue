
import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne  } from 'typeorm';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title?: string;

  @Column()
  name?: string;

  @Column()
  content: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, user => user.posts)
  user: UserEntity;
}