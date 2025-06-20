import * as THREE from 'three';
import { useRef } from 'react';


export default function Background(props: BackgroundProps) {
    const mesh = useRef<THREE.Mesh>();
    
    return (
        <mesh ref={mesh} >
            <planeGeometry scale={[100, 100]} />
            <meshBasicMaterial color={props.color}/>
        </mesh>
    );
}

interface BackgroundProps {
    color: string;
}
