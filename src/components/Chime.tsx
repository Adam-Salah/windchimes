import * as THREE from 'three';
import { useRef } from 'react';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { ObjectProps } from '../interfaces';

export default function Chime(props: ChimeProps) {
    const mesh = useRef<THREE.Mesh>();
    const rb = useRef<RapierRigidBody>(null);

    return (
        <RigidBody ref={rb}>
            <mesh ref={mesh} position={props.position}>
                <boxGeometry />
                <meshBasicMaterial color={props.color} />
            </mesh>
        </RigidBody>
    );
}

interface ChimeProps extends ObjectProps {}
