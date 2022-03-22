import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBarItem extends Component {
    render() {  // o uso de props permite à classe pai renderizar os atributos que serão informados juntos à invocaçao da classe filha
        return (
            <div>
                <Link 
                className={`nav-item nav-link ${this.props.item.active ? "active" : ""}`}
                    to={this.props.item.href} 
                    onClick={e => this.props.onClick(this.props.item)}>
                        {this.props.item.name}
                </Link>                
            </div>
        );
    }
}

export default NavBarItem;
