import React, {Component} from "react";
import {Button} from "@mui/material";

class TodoItem extends Component {


    render() {

        const {todolist, deleteTodo, completeTodo} = this.props

        return(
            <div>
                {todolist.map(todo => {
                    return (
                        <div key={todo.id} style={
                            {
                                display: 'flex',
                                justifyContent: 'space-between',
                                border:'1px solid grey',
                                borderRadius: 10,
                                margin: 30,
                                padding: 20,
                                alignItems: "center",
                                background: todo.completed ? 'lightgreen' : ''
                            }
                        }>
                            <h2 style={{margin: 0}}>{todo.title}</h2>
                            <div>
                                <Button
                                    variant={"contained"}
                                    color={"success"}
                                    onClick={() => completeTodo(todo.id)}
                                >Complete</Button>
                                <Button
                                    variant={"contained"}
                                    color={"error"}
                                    onClick={() => deleteTodo(todo.id)}
                                >Delete</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}


export default TodoItem