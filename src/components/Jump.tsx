import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";

export default function Jump() {
  const [userDied, setUserDied] = useState(false);
  const ballRef = useRef<any>(null);

  return (
    <Canvas camera={{ position: [0, 5, 12], fov: 50 }}>
      <color attach="background" args={[userDied ? "#ff0000" : "#cecece"]} />
      <Physics gravity={[0, -30, 0]}>
        <Ball ballRef={ballRef} userDied={userDied} setUserDied={setUserDied} />
        <Panel ballRef={ballRef} x={0} y={-2} />
        <Panel ballRef={ballRef} x={5} y={1} />
        <Panel ballRef={ballRef} x={-1} y={2} />
      </Physics>
    </Canvas>
  );
}

function Ball({
  ballRef,
  userDied,
  setUserDied,
}: {
  ballRef: any;
  userDied: boolean;
  setUserDied: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const RADIUS = 0.5;

  const { camera, viewport } = useThree();
  const [lastBounceHeight, setLastBounceHeight] = useState(0);

  useFrame(() => {
    if (!ballRef.current) return;
    if (userDied) return;

    const { y } = ballRef.current.translation();

    // Detect if ball has left frame: the user has lost
    if (y + (RADIUS ^ 4) < camera.position.y * -1) {
      console.log("user died :(");
      setUserDied(true);
      return;
    }
  });

  return (
    <RigidBody ref={ballRef} colliders="ball" mass={1}>
      <mesh>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <meshStandardMaterial />
      </mesh>
    </RigidBody>
  );
}

// FIXME: Only enable bounces from above
// Bounceable panel
function Panel({ ballRef, x, y }: { ballRef: any; x: number; y: number }) {
  const onCollisionEnter = function () {
    const ballPos = ballRef.current.translation();
    if (ballPos.y > y) {
      ballRef.current.applyImpulse({ x: 0, y: 10, z: 0 }, true);
    }
  };

  return (
    <RigidBody type="fixed" colliders={false} position={[x, y, 0]}>
      <CuboidCollider
        args={[3, 0.25, 0.5]}
        // sensor={false}

        onCollisionEnter={onCollisionEnter}
      />
      <mesh>
        <planeGeometry args={[3, 0.25]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </RigidBody>
  );
}
