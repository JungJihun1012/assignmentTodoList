import styled from "styled-components";
import Todo from "./components/Todo";

function App() {
  return(
    <Container>
      <Todo />
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
`;
export default App;