// Are we using the correctly named + typed props in child?
interface ChildProps {
    color: string;
    onClick: () => void;
}

export const Child = (props: ChildProps) => {
    return (
    <div>
        {props.color}
        <button onClick={props.onClick}>Click Me!</button>
    </div>
    )
}

// Child will be a React function component
// 'Child' might have properties assigned to it like 'propTypes' and 'contextTypes'
// 'Child' will receive props of type 'ChildProps'
export const ChildAsFC: React.FC<ChildProps> = ({ color, onClick, children }) => {
    return (
    <div>
        {color}
        <button onClick={onClick}>Click Me!</button>
    </div>
    )
}
