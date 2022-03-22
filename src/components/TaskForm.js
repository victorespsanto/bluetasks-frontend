import React, { Component } from 'react';
import TaskService from '../api/TaskService';
import { Redirect } from 'react-router-dom';


class TaskForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            task: {
                id: 0,
                description: "",
                whenToDo: ""
            }, 
            redirect: false,
            buttonName: "Cadastrar",
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    }

    
    componentDidMount() {

        const editId = this.props.match.params.id;

        if (editId) { 
            const task = TaskService.load(~~editId);
            this.setState( {task: task , buttonName: "Alterar"});
        }

        //console.log("Informação do id: " + ~~editId); 
        //console.log("Informação da description:" + this.state.task.description);
        
    }

    onSubmitHandler(event) {
        event.preventDefault();        
        TaskService.save(this.state.task);
        this.setState( {redirect: true} );
    }

    onInputChangeHandler(event) {
        const field = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ( { task: { ...prevState.task, [field]: value }}));
        //console.log( this.state.task )
        
    }
    
    render() {

        if (this.state.redirect) {
            return <Redirect to="/"/>
        }
        return (
            <div>
                <h1>Cadastro da Tarefa</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <div className='form-group'>
                        <label htmlFor='description'>Descrição</label>
                        <input type='text'
                            className='form-control'
                            name='description'
                            value={this.state.task.description}
                            placeholder='Digite a descrição'
                            onChange={this.onInputChangeHandler}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='whenToDo' style={{marginTop: 10}}>Data</label>
                        <input type='date'
                            className='form-control'                            
                            name='whenToDo'
                            value={this.state.task.whenToDo}
                            placeholder='Informe a data'
                            onChange={this.onInputChangeHandler}/>
                    </div>
                    <button 
                        type='submit' 
                        className='btn btn-primary' 
                        style={{marginTop: 10}}>
                            {this.state.buttonName}
                    </button>
                    &nbsp;&nbsp;
                    <button 
                        type='button'   
                        className='btn btn-primary'     
                        style={{marginTop: 10}}
                        onClick = {() => this.setState({redirect: true})}>
                            Cancelar
                    </button>
                </form>
            </div>
        );
    }
}

export default TaskForm;