import { ChildAsFC } from "./Child";

// Are we providing the correct props to
// child when we show it in Parent?
const Parent = () => {
    return <ChildAsFC color="red" onClick={() => console.log("Click")}>Hello World</ChildAsFC>
}

export default Parent;