import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { ObjectProps } from '../interfaces';

export default function Rope(props: RopeProps) {
    const mesh = useRef<THREE.Mesh>();
    const rb = useRef<RapierRigidBody>(null);
    const ropeSubs = useRef<THREE.Group>(null);
    
    useEffect(() => {
        for (let i = 0; i < props.subdivisions; i++) {
            
        }
    });

    return (
        <RigidBody ref={rb}>
            <mesh ref={mesh} position={props.position} scale={[props.thickness / 10, props.length / props.subdivisions, props.thickness / 10]}>
                <boxGeometry />
                <meshBasicMaterial color={props.color} />
            </mesh>
        </RigidBody>
    );
}

interface RopeProps extends ObjectProps {
    length: number;
    subdivisions: number;
    thickness: number;
}
