import styled from "styled-components";
import TodoList from "./components/TodoList";

function App() {
  return(
    <Container>
      <TodoList />
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
`;
export default App;