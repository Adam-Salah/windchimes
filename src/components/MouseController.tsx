import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { clamp } from 'three/src/math/MathUtils.js';
import { useRef, useState } from 'react';

export default function MouseController(props: MouseControllerProps) {
    //Object hovering
    const [isHoveringObject, setIsHoveringObject] = useState<boolean>(false);
    const [hoveredObject, setHoveredObject] = useState<THREE.Object3D>();
    const [hoveredPoint, setHoveredPoint] = useState<THREE.Vector3>();

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
    let intersects: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[];
    let closest: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>;

    useFrame(() => {
        vec.set(state.pointer.x, state.pointer.y, 0.5);
        vec.unproject(state.camera);
        vec.sub(state.camera.position).normalize();
        pos.copy(state.camera.position).add(vec.multiplyScalar(-state.camera.position.z / vec.z));

        raycaster.current.setFromCamera(state.pointer, state.camera);

        intersects = raycaster.current.intersectObjects(state.scene.children);
        closest = intersects[0];
        for (let i = 1; i < intersects.length; i++) {
            if (intersects[i].distance < closest.distance) {
                closest = intersects[i];
            }
        }
        if (closest) {
            setIsHoveringObject(true);
            setHoveredObject(closest.object);
            setHoveredPoint(closest.point);
        } else {
            setIsHoveringObject(false);
            setHoveredPoint(undefined);
        }
    });

    //Mouse panning
    let mouseCoords: THREE.Vector2 = new THREE.Vector2();
    mouseCoords.set(pointer.x, pointer.y);

    useFrame(() => {
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

    //Cursor collision
    const cursor = useRef<THREE.Mesh>(new THREE.Mesh());
    camera.layers.enable(31);
    cursor.current.layers.set(31);

    let hoveredObjectPos: THREE.Vector3 = new THREE.Vector3();
    let camDirection: THREE.Vector3 = new THREE.Vector3();
    let pointElevation: THREE.Vector3;
    let hoverAmount: number;
    useFrame(() => {
        if (hoveredObject && hoveredPoint) {
            hoveredObject.getWorldPosition(hoveredObjectPos);
            camDirection.copy(state.camera.position).sub(hoveredPoint).normalize();
            pointElevation = hoveredPoint.sub(hoveredObjectPos);
            hoverAmount = Math.min(pointElevation.add(pointElevation.multiplyScalar(0.5)).length(), 1);
            pos.copy(hoveredPoint.add(camDirection.multiplyScalar(hoverAmount)).add(hoveredObjectPos));
        }
        cursor.current.position.copy(pos);
    });

    return (
        <mesh ref={cursor} scale={0.3} position={[100, 100, 100]}>
            <sphereGeometry />
            <meshStandardMaterial />
        </mesh>
    );
}

interface MouseControllerProps {
    isMouseDown: boolean;
}
