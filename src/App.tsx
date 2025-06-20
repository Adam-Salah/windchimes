import './styles/App.css';
import { Canvas } from '@react-three/fiber';
import { Color } from 'three';
import { Suspense, useState } from 'react';
import MouseController from './components/MouseController';
import { Physics } from '@react-three/rapier';
import Chime from './components/Chime';
import Floor from './components/Floor';
import Rope from './components/Rope';

function App() {
    const [backgroundColor] = useState('#87CEEB');
    const [isMouseDown, setIsMouseDown] = useState(false);

    return (
        <div
            id='canvas-container'
            onMouseDown={() => setIsMouseDown(true)}
            onMouseUp={() => setIsMouseDown(false)}
            onTouchStart={() => setIsMouseDown(true)}
            onTouchEnd={() => {
                setIsMouseDown(false);
            }}
            onTouchCancel={() => setIsMouseDown(false)}
        >
            <Canvas camera={{ fov: 60, zoom: 1, position: [0, 0, 10] }} scene={{ background: new Color(backgroundColor) }}>
                <pointLight color='white' position={[0, 5, 5]} castShadow={true} power={1000} />
                <MouseController isMouseDown={isMouseDown} />
                <Suspense>
                    <Physics debug>
                        <Floor color='#136d15' />
                        <Chime position={[0, 0, 0]} color='darkred' />
                        <Rope position={[0, 3, 0]} color='darkblue' length={5} subdivisions={5} thickness={1} />
                    </Physics>
                </Suspense>
            </Canvas>
        </div>
    );
}

export default App;
