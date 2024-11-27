import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface TodoType {
    text: string,
    completed: boolean,
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        const save = localStorage.getItem("todos");
        if(save) setTodos(JSON.parse(save));
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const add = () => {
        if(input.trim() !== "") {
            // trim은 공백을 없애주는 함수 
            // 쉽게 말하면 input에 값이 비어있지 않을 경우
            setTodos([...todos, {text: input, completed: false}]);
            // todo 배열을 복사하고, text는 input에 값, completed는 false로 가져온다
            setInput(""); 
            // input 값 초기화까지
        }
        if(input == "") {
            alert("값이 비어있습니다.");
        }
    }
    const hanldeKey = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            add();
        }
        // 이거는 이벤트 키가 Enter와 같을 때 추가하는 함수
    }


    const toggle = (index: number) => {
        const newTodo = todos.map((todo, i) => {
            // map 함수를 사용하여 새로운 배열을 추가할 계획
            if(i === index) {
                return {...todo, completed: !todo.completed};
            }
            // 만약 i 가 index와 타입이 같을 때 todo의 배열을 복사하고, complted는 todo에 completed가 아닌 것을 반환
            return todo;
            // if문이 끝나면 todo를 반환해줌
        });
        setTodos(newTodo);
    };

    const del = (idx: number) => {
        if(window.confirm("정말로 삭제하시겠습니까?")) {
            setTodos(todos.filter((_, i) => i !== idx));
        }
        // 만약 삭제한다면 filter 배열메서드를 사용해서 해당 인덱스를 제외한 배열을 업데이트 하는 공식
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
            {todos.length == 0 ? (<></>
            ): (
            <List>
                {todos.map((todo, index)=>(
                    // 여기도 todo에 새로운 배열을 추가하고
                    <Item key={index}>
                        <Text
                            onClick={() => toggle(index)}
                            // 아까 만들었던 toggle 함수를 삽입
                            completed={todo.completed}
                        >
                            {todo.text}
                            {/* 텍스트 반영 */}
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