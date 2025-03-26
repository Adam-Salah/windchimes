import * as THREE from 'three';
import { useEffect, useRef } from 'react';


export default function Background(props: BackgroundProps) {
    const mesh = useRef<THREE.Mesh>(new THREE.Mesh());

    useEffect(() => {
    }, []);
    
    return (
        <mesh ref={mesh} >
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial color={props.backgroundColor}/>
        </mesh>
    );
}

interface BackgroundProps {
    backgroundColor: string;
}
