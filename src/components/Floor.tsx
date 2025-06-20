import * as THREE from 'three';
import { useRef } from 'react';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { ObjectProps } from '../interfaces';

export default function Floor(props: FloorProps) {
    const mesh = useRef<THREE.Mesh>();
    const rb = useRef<RapierRigidBody>(null);

    return (
        <RigidBody ref={rb} gravityScale={0}>
            <mesh ref={mesh} position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1000, 1000, 1000]}>
                <planeGeometry />
                <meshBasicMaterial color={props.color} />
            </mesh>
        </RigidBody>
    );
}

interface FloorProps extends ObjectProps {}
