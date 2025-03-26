import './styles/App.css';
import { Canvas } from '@react-three/fiber';
import { Color } from 'three';
import { useState } from 'react';
import MouseController from './components/MouseController';

function App() {
    const [backgroundColor] = useState('#63FFCD');
    const [isMouseDown, setIsMouseDown] = useState(false);


    return (
        <div id='canvas-container' onMouseDown={() => setIsMouseDown(true)} onMouseUp={() => setIsMouseDown(false)}>
            <Canvas
                camera={{ fov: 60, zoom: 1, position: [0, 0, 10] }}
                scene={{ background: new Color(backgroundColor) }}
            >
                <pointLight color='white' position={[0, 5, 5]} castShadow={true} power={1000} />
                <MouseController isMouseDown={isMouseDown} />
                <mesh scale={3} position={[0, 0, 0]}>
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh>
                {/* <Background backgroundColor={backgroundColor} /> */}
            </Canvas>
        </div>
    );
}

export default App;
