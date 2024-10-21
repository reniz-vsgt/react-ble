import { Button, message, Steps } from "antd";
import { useState } from "react";

const Instructions = ({setshowInstruction} : {setshowInstruction:any}) => {
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: 'Sit comfortably',
            content: <div>
                <img alt='step 1' className='stepsImage' src='/step1_sq.png' />
                <h2>Step 1 : Sit comfortably</h2>
                <p className='steps-text'>Sit comfortably in an upright position with your hands resting on your lap. Close your eyes and relax. If you have been engaging in moderate to high activity, rest for 5 minutes. If you have been engaging in highly intense activity, rest for 7 to 10 minutes.</p>
            </div>,
        },
        {
            title: 'Start Breathing',
            content: <div>
                <img alt='step 2' className='stepsImage' src='/step2_sq.png' />
                <h2>Step 2 : Start Breathing</h2>
                <p className='steps-text'>Press the "Start" button on the device. Gently touch the tip of your nose to the dot located on the top face of the device. Breathe normally, maintaining a steady rate of approximately 10 to 15 breaths per minute
                </p>
            </div>,
        },
        {
            title: 'Check output Graph',
            content: <div>
                <img alt='step 3' className='stepsImage' src='/step3_sq.png' />
                <h2>Step 3 : Check output Graph</h2>
                <p className='steps-text'>Check if your output graph looks okay or redo step 2 with more caution</p>
            </div>,
        },
    ];
    const items = steps.map((item) => ({ key: item.title, title: item.title }));


    const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        color: "#83BF8D",
        backgroundColor: "#ffffff",
        marginTop: 18,
    };

    return (
        <>
            <Steps direction="vertical" current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button style={{ backgroundColor: '#83BF8D' }} type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button style={{ backgroundColor: '#83BF8D' }} type="primary" onClick={() => { message.success('You are now ready!'); setshowInstruction(false) }}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px', backgroundColor: '#83BF8D' }} type="primary" onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </>
    )
}

export default Instructions;