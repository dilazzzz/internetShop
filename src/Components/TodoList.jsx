import React, {Component} from "react";
import TodoItem from "./TodoItem";
import {Button, TextField} from "@mui/material";

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            todoList: (JSON.parse(localStorage.getItem('todos')) || []),
            inputTitle: ''
        }
        this.deleteTodo = this.deleteTodo.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        localStorage.setItem('todos', JSON.stringify(this.state.todoList))
    }

    updateValue = (e) => {
        this.setState({inputTitle: e.target.value})
    }

    newTodo = () => {
        this.setState({
            todoList: [
                ...this.state.todoList,
                {title: this.state.inputTitle, id: Date.now(), completed: false}
            ]
        })
    }

    completeTodo = (id) => {
       this.setState({
           todoList: this.state.todoList.map( todo => {
               return todo.id === id ? {...todo, completed: !todo.completed} : todo
           })
       })
    }

    deleteTodo = (id) => {
        this.setState({todoList: this.state.todoList.filter(todo => todo.id !== id)})
    }


    render() {
        return (
            <div>
                <div style={{display: "flex", marginTop: 30, justifyContent: 'center'}}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Todo name"
                        multiline
                        value={this.state.title}
                        onChange={this.updateValue}
                    />
                    <Button
                        variant={'contained'}
                        onClick={this.newTodo}
                    >Create todo</Button>
                </div>
                <TodoItem deleteTodo={this.deleteTodo} completeTodo={this.completeTodo} todolist={this.state.todoList} title={this.state.inputTitle}/>
            </div>
        )
    }
}

export default TodoList