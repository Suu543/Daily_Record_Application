import "./resizable.css";
import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
}   

/* 
Whenever you use resizable, these handlers don't actually show anything on the screen.
You actually have to provide some manual styling to say exactly what you want.
That's exactly what we're going to do, we're going to add in some success to style.

window.innerHeight * 0.9 = 90% of browser window
*/
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    let resizableProps: ResizableBoxProps;
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(window.innerWidth * 0.75);

    useEffect(() => {
        let timer: any;

        const listener = () => {
            // Improving Resize Performance - Debouncing
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);    

                // Prevent Bug
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75);
                }
            }, 100);
        };

        window.addEventListener('resize', listener);

        // This code will be called automatically to clean up after ourselves
        return () => {
            window.removeEventListener('resize', listener);
        }
    }, [width])

    // useEffect를 사용해서 화면 horizontal 크기가 줄어들때마다 window.innerHeight * 0.2가 다시 계산되기 하기 위해
    // 그렇지 않으면 preview 부분이 overwrap된다.
    // minConstraints: [innerHeight * 0.2, Infinity],
    // maxConstraints: [innerHeight * 0.75, Infinity],

    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            minConstraints: [innerWidth * 0.2, Infinity],
            maxConstraints: [innerWidth * 0.75, Infinity],
            height: Infinity,
            // Jumping Effect - Whenever we render our sizable component,
            // we provide a new value for this with prop and it overrides or changes its internal piece of state
            // that's what causing the jump
            // width: window.innerWidth * 0.75,
            width, 
            resizeHandles: ['e'],
            onResizeStop: (event, data) => {
                // console.log(data);
                setWidth(data.size.width);
            }
        };
    } else {
        resizableProps = {
            minConstraints: [Infinity, 24],
            maxConstraints: [Infinity, innerHeight * 0.9],
            height: 300,
            width: Infinity, 
            resizeHandles: ['s']
        };
    }

    return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}

export default Resizable;