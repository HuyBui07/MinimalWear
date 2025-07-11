import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect } from "react";

const SkeletonProduct = () => {
  const x = useMotionValue(0);

  const backgroundPosition = useTransform(x, [0, 300], ['0%', '300%']);

  useEffect(() => {
    const controls = animate(x, 300, {
      repeat: Infinity,
      repeatType: "loop",
      duration: 2,
      ease: "easeInOut",
    });

    return () => controls.stop();
  }, [x]);

  return (
    <motion.div className="flex flex-col w-64 bg-gray-200 cursor-pointer" style={{
        backgroundImage: 'linear-gradient(90deg, #e0e0e0 25%, #f8f8f8 50%, #e0e0e0 75%)',
        backgroundSize: '300% 100%',
        backgroundPosition,
      }}>
      <div className="h-64 w-64"></div>

      <span className="mt-3 text-lg font-medium w-fit"></span>
      <span className="mt-3 text-3xl font-semibold"></span>
    </motion.div>
  );
};

export default SkeletonProduct;
