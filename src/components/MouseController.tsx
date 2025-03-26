import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import MousePointer from './MousePointer';
import { clamp } from 'three/src/math/MathUtils.js';
import { useEffect, useRef, useState } from 'react';

export default function MouseController(props: MouseControllerProps) {
    //Object hovering
    const [isHoveringObject, setIsHoveringObject] = useState<boolean>(false);
    const [hoveredObject, setHoveredObject] = useState<THREE.Object3D>();

    //Drag detection
    const [isDraggingCamera, setIsDraggingCamera] = useState<boolean>(false);
    const [isDraggingObject, setIsDraggingObject] = useState<boolean>(false);

    //App state
    const state = useThree();
    const pointer = state.pointer;
    const camera = state.camera;

    //Ignore objects
    const raycaster = useRef<THREE.Raycaster>(new THREE.Raycaster());
    let vec = new THREE.Vector3();
    let pos = new THREE.Vector3();

    useFrame(() => {
        vec.set(state.pointer.x, state.pointer.y, 0.5);
        vec.unproject(state.camera);
        vec.sub(state.camera.position).normalize();
        pos.copy(state.camera.position).add(vec.multiplyScalar(-state.camera.position.z / vec.z));

        raycaster.current.setFromCamera(state.pointer, state.camera);

        const intersects = raycaster.current.intersectObjects(state.scene.children);
        let closest = intersects[0];
        for (let i = 1; i < intersects.length; i++) {
            if (intersects[i].distance < closest.distance) {
                closest = intersects[i];
            }
        }
        if (closest) {
            setIsHoveringObject(true);
            setHoveredObject(closest.object)
        } else {
            setIsHoveringObject(false);
        }
    });

    //Mouse panning
    let mouseCoords = new THREE.Vector2();
    mouseCoords.set(pointer.x, pointer.y);

    useFrame(() => {
        console.log(isDraggingCamera);
        if (props.isMouseDown) {
            if (((!isHoveringObject || isDraggingCamera) && !isDraggingObject)) {
                mouseCoords.sub(new THREE.Vector2(pointer.x, pointer.y));
                if (mouseCoords.x != 0 || mouseCoords.y != 0) {
                    setIsDraggingCamera(true);
                    camera.position.x = clamp(camera.position.x + mouseCoords.x * 10, -10, 10);
                    camera.position.y = clamp(camera.position.y + mouseCoords.y * 10, -10, 10);
                    camera.lookAt(0, 0, 0);
                }
                setIsDraggingCamera(true);
            } else {
                setIsDraggingObject(true)
            }
        } else {
            setIsDraggingCamera(false);
            setIsDraggingObject(false);
        }
        mouseCoords.set(pointer.x, pointer.y);
    });

    //Hover effects
    useEffect(() => {
        if (isHoveringObject) {
            hoveredObject
        }
    }, [isHoveringObject])


    return <MousePointer />;
}

interface MouseControllerProps {
    isMouseDown: boolean;
}
