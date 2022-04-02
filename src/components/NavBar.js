import React, { Component } from 'react';
import AuthService from '../api/AuthService';
import { APP_NAME } from '../constants';
import NavBarItem from './NavBarItem';

class NavBar extends Component {

    constructor(props) {
        super(props);
        
        this.state = { // o estado é um objeto, então tem que ser criado com {}
            items: [  // o valor associado ao Items é um array por isso o []
                { name: "Listar Tarefas" , href: "/", active: true},  // um dos componentes do state.items
                { name: "Nova Tarefa" , href: "/form", active: false}
            ]
        }

        this.onClickHandler = this.onClickHandler.bind(this);
        this.onLogoutHandler = this.onLogoutHandler.bind(this);
    }

    onClickHandler(itemClicked) {
        const items = [...this.state.items];  //spread da lista de items 

        items.forEach(item => {
            if (item.name === itemClicked.name) {  // chave única (key) informada na função map da chamada da renderização
                item.active = true;
            } else {
                item.active = false;
            }
        })

        this.setState({ items });
            
    }

    onLogoutHandler() {
        AuthService.logout();
        this.props.onLinkClick();
    }
    

    render() {  // a classe pai renderiza a classe filha com os props informados na tag da classe filha
                // a criaçao dos states permite iterar sobre os componentes do state através da funçao map e o que ela deve fazer com os componentes
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <span className="navbar-brand mb-0 h1" >{APP_NAME}</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <div className="navbar-nav mr-auto">
                            {this.state.items.map(
                                (i) => <NavBarItem 
                                key = {i.name}
                                item = {i}                        
                                onClick = {this.onClickHandler} />)}  
                            {AuthService.isAuthenticated() ?
                                <NavBarItem 
                                    item={{ name: "Logout", active: false, href:  "#"}}
                                    onClick = {this.onLogoutHandler} />

                                : ""}
                        </div>
                    </div>
                </nav>
                   
            </div>
        );
    }
}

export default NavBar;

