import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface TodoType {
    text: string | null,
    completed: boolean | null,
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [input, setInput] = useState<string>("");
    
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    
    useEffect(() => {
        const save = localStorage.getItem("todos");
        if(save) setTodos(JSON.parse(save));
    }, []);


    const add = () => {
        if(input.trim() !== "") {
            setTodos( [...todos, {text: input, completed: false}]);
            setInput(""); 
        }
        if(input == "") {
            alert("값이 비어있습니다.");
        }
    }
    const hanldeKey = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            add();
        }
    }


    const toggle = (index: number) => {
        const newTodo = todos.map((todo, i) => {
            if(i === index) {
                return {...todo, completed: !todo.completed};
            }
            return todo;
        });
        setTodos(newTodo);
    };

    const del = (idx: number) => {
        if(window.confirm("정말로 삭제하시겠습니까?")) {
            setTodos(todos.filter((_, i) => i !== idx));
        }
    }
    
    return(
        <Container>
            <TodoTitle>TodoList</TodoTitle>
            <TodoContent>
                <TodoInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={hanldeKey}
                placeholder="오늘의 할 일은?"
                />
                <AddBtn onClick={add}>+</AddBtn>
            </TodoContent>
            // 이 조건부 렌더링은 Todo List가 비어 있을 때와 항목이 있을 때의 UI를 다르게 표시하기 위해 사용됩니다. Todo가 없을 때는 아무것도 표시하지 않고, Todo가 있을 때는 목록을 보여주는 방식으로 사용자 경험을 개선하는 방식
            {todos.length == 0 ? (<></>
            ): (
            <List>
                {todos.map((todo, index)=>(
                    <Item key={index}>
                        <Text
                            onClick={() => toggle(index)}
                            completed={todo.completed}
                        >
                            {todo.text}
                        </Text>
                        <DeleteButton
                            onClick={() => del(index)}
                            aria-label={`"${todo.text}"삭제`}
                        >
                            x
                        </DeleteButton>
                    </Item>
                ))}
            </List>
            )}
        </Container>
    )
}

const Container = styled.div`
    flex: 1;
`;
const TodoTitle = styled.h2`
    padding-top: 4em;
    text-align: center;
    font-size: 3rem;
`;
const TodoContent = styled.div`
    padding-top: 3em;
    display: flex;
    justify-content: center;
`;
const TodoInput = styled.input`
    width: 400px;
    border: none;
    border-bottom: 1px solid black;
    outline: #f8d0a1;
`;
const AddBtn = styled.button`
    padding: 10px 32px;
    // background-color: rgba(210, 210, 210);
    border: none;
    margin-left: 20px;
    font-size: 15px;
    transition: all .8s;
    cursor: pointer;
    &:hover {
        border-radius: 50px;
        transition: .8s;
    }
`;
const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    margin: 0 auto;
    `;
const Item = styled.div`
    display: flex;
    justify-content: space-between;
    width: 350px;
    margin: 0 auto;
    text-align: center;
    padding-top: 20px;
    align-items: center;
`;
const Text = styled.div`
    font-size: 22px;
    cursor: pointer;
    text-decoration: ${({completed}) => (completed ? "line-through" : "none")};
    color: ${({completed}) => (completed ? "lightgray" : "black")};
    transition: .4s;
    &:hover {
        font-size: 24px;
        color: #a92f22;
    }
`;
const DeleteButton = styled.div`
    font-size: 20px;
    cursor: pointer;
    transition: all .4s;
    &:hover {
        color: red;
    }
`;
export default TodoList;
