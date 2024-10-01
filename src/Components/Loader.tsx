import { spiral } from 'ldrs'
spiral.register()

const Loader = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
        }}>
            <l-spiral
                size="40"
                speed="0.9"
                color="#83BF8D"
            ></l-spiral>
        </div>
    )
}

export default Loader