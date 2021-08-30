import { BadRequestException, Injectable, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
const bcrypt = require('bcrypt');
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<User>,
        private mailService: MailService
    ) {}
    async login(email : string, password : string): Promise<UserEntity | undefined> {
        const users = await this.findOneByEmail(email, true);
        if (users) {
            const isMatch  = await bcrypt.compare(password, users.password);
            if (isMatch) return users
        }
    }

    async findOne(id: number) {
        return await this.usersRepository.findOne(id);
    }

    findOneByEmail(email: string, isShowPassword : boolean) {
        return this.usersRepository.findOne({ 
            where: {email: email },
            select : ['id', 'email', 'password', 'roles', 'username'] 
        });
    }


    comparePasswords(newPassword: string, passwortHash: string): Observable<any>{
        return from(bcrypt.compare(newPassword, passwortHash));
    }

    hashPassword(password: string): Observable <string> {
        return bcrypt.hash(password, 12);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find({ relations: ["posts"] });
    }
      
    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async create(user: User){
        const token = Math.floor(1000 + Math.random() * 9000).toString();
        const userExist = await this.usersRepository.findOne({ email: user.email });
        if (userExist) {throw new BadRequestException('User already registered with email')};
        await this.mailService.sendUserConfirmation(user, token);
        return from(this.hashPassword(user.password)).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.username = user.username;
                newUser.email = user.email;
                newUser.password = passwordHash;
                newUser.roles = user.roles;
                return from(this.usersRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            })
        )
    }


}