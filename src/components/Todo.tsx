import { useEffect, useState } from "react";
import styled from "styled-components";

interface Td {
    text: string,
    completed: boolean,
}

const Todo = () => {

    const [todo, setTodo] = useState<Td[]>([]);
    const [input, setInput] = useState<string>("");


    useEffect(() => {
        const save = localStorage.getItem("todos");
        if(save) setTodo(JSON.parse(save));
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todo));
    }, [todo]);

    const addTodo = () => {
        if(input.trim() !== "") {
            setTodo([...todo, {text: input, completed: false}]);
        };
        if(input == "") {
            alert("값이 비어있습니다.");
        };
        setInput("");
    }

    const hanldeKey = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key == "Enter") {
            addTodo();
        }
    }

    const deleteTodo = (idx: number) => {
        if(window.confirm("정말로 삭제하시겠습니까?")) {
            setTodo(todo.filter((_, i) => i !== idx ));
        };
    };
    return (
        <Container>
            <h2>TodoList</h2>
            <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="할 일을 추가해주세요"
            onKeyPress={hanldeKey}
            />
            <AddBtn
            onClick={addTodo}
            >Add
            </AddBtn>
            {todo.length == 0 ? (
                <></>
            ): (
                <List>
                    {todo.map((todos, idx) => (
                        <Item key={idx}>
                            <Text>{todos.text}</Text>
                            <DeleteBtn onClick={() => deleteTodo(idx)}>X</DeleteBtn>
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
const Input = styled.input``;
const DeleteBtn = styled.button``;
const AddBtn = styled.button``;
const Item = styled.div``;
const Text = styled.div``;
const List = styled.div``;
export default Todo;