import { Injectable } from '@nestjs/common';
import { takeLast } from 'rxjs';
import { User } from './user';

@Injectable()
export class UserService {
    //determinando os obj da classe User de maneira estática
    users: User[] = [
    {id: 1, name: "Matheus", active: true },
    {id: 2, name: "Victor", active: false },
    {id: 3, name: "Thales", active: false },
    {id: 4, name: "Pedro", active: true },
    {id: 5, name: "Lucas", active: true },
    ];

//metodo que retorna todos os usuários
getAll(){  
    return this.users;
}

//retorna um usuário especifico 
getById(id: number){
    //declara uma nova constante "user" atribuindo à ela o valor de um id passado como parâmetro 
    const user = this.users.find((value) => value.id == id);
    return user;
}

//cria um novo usuário
create (user: User){
    //metodo que gera o Id do novo user -> verifica se existe algum id na lista, caso exista ele pega o ultimo, caso contrário permanece zero
    let lastId = 0;
    if(this.users.length > 0 ){
        lastId = this.users[this.users.length - 1].id;
    }
    //atribiu o valor gerado no metodo anterior para o novo usuário
    user.id = lastId + 1;
    this.users.push(user);

    return user;
}

//atualiza um usuário já existente
update(user: User){
    //através da constante userArray recupera um user com o id informado, caso encontre preenche os campos informados
    const userArray = this.getById(user.id);
    if (userArray){
        userArray.name = user.name;
        userArray.active = user.active;
    }

    return userArray;
}

//apaga um usuário já existente
delete(id: number){
    //recupera o index do usuario que tem o id passado como parametro e o apaga
    const index = this.users.findIndex((value) => value.id == id);
    this.users.splice(index, 1);
}
//delete não retorna nada, mas é de bom tom retornar uma mensagem ao usuário
}