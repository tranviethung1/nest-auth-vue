
import { PostEntity } from 'src/posts/entities/posts.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany  } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({select: false})
  password: string;

  @Column()
  roles: string;

  @OneToMany(() => PostEntity, post => post.user)
  posts: PostEntity[];
}