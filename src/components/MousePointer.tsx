import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

export default function MousePointer() {
    const state = useThree();
    state.camera.layers.enable(31);
    const pointer = useRef<THREE.Mesh>(new THREE.Mesh());
    pointer.current.layers.set(31);

    let mouse = new THREE.Vector2();
    let closestPos = new THREE.Vector3();

    useFrame(() => {

        // if (closest) {
        //     closest.object.getWorldPosition(closestPos);
        //     let camDirection = new THREE.Vector3();
        //     camDirection.copy(state.camera.position).sub(closest.point).normalize();
        //     let pointElevation = closest.point.sub(closestPos);
        //     let hover = Math.min(pointElevation.add(pointElevation.multiplyScalar(0.5)).length(), 1);
        //     let newPos = closest.point.add(camDirection.multiplyScalar(hover)).add(closestPos);
        //     pos.copy(newPos);
        // }
        // pointer.current.position.copy(pos);
    });

    return (
        <mesh ref={pointer} scale={0.1} position={[100, 100, 100]}>
            <sphereGeometry />
            <meshStandardMaterial />
        </mesh>
    );
}
