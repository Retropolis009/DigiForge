import React, { useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const carouselItems = [
  { name: "CPU", img: "https://d1q3zw97enxzq2.cloudfront.net/images/AMD_Ryzen_9_9950X3D_vs_9900X3D.width-1000.format-webp.webp" },
  { name: "GPU", img: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/rtx_5090_600_wat_zotac_amp_extreme_infinity.jpg" },
  { name: "RAM", img: "https://static.webx.pk/files/19643/Images/corsair-vengeance-rgb-32gb-6400mhz-c36-ddr5-ram-price-in-pak-19643-2030430-240324021000764.png" },
  { name: "SSD", img: "https://static3.webx.pk/files/821/Images/250-821-618871-070421013829.jpg" },
  { name: "Motherboard", img: "https://www.vortez.net/articles_file/46782_x870%20aorus%20elite%20wifi7%20review%20-%20intro.jpg" },
  { name: "Power Supply", img: "https://static3.webx.pk/files/821/Images/asus-rog-thor-850w-industech.pk-4-821-660266-140721033419.jpg" },
  { name: "Case", img: "https://rbtechngames.com/wp-content/uploads/2024/09/rbtech_hyte_y70_pitch_black.jpg" },
  { name: "Cooler", img: "https://microless.com/cdn/products/7ab650a6ebb9645e3524d517fb7fe31f-hi.jpg" },
  { name: "Peripherals", img: "https://m.media-amazon.com/images/I/91t16+g29KL._AC_SL1000__.jpg" },
  { name: "Headphones", img: "https://bloodygaming.pk/cdn/shop/files/mr720-naraka-rgb-gaming-wireless-headset-3940260.jpg?v=1761126372" },
];

export default function CarouselSection() {
  const [index, setIndex] = useState(0);
  const dragX = useMotionValue(0);
  const boxSize = 320;
  const itemSpacing = boxSize;

  const styleMap = {
    "-2": { scale: 0.8, opacity: 0.3, zIndex: 1 },
    "-1": { scale: 0.95, opacity: 0.6, zIndex: 2 },
    "0": { scale: 1.25, opacity: 1.0, zIndex: 5 },
    "1": { scale: 0.95, opacity: 0.6, zIndex: 2 },
    "2": { scale: 0.8, opacity: 0.3, zIndex: 1 },
  };

  const getVisible = (currentIndex) => {
    let list = [];
    for (let pos = -2; pos <= 2; pos++) {
      const realIndex = (currentIndex + pos + carouselItems.length) % carouselItems.length;
      list.push({ ...carouselItems[realIndex], pos });
    }
    return list;
  };

  const onDragEnd = (_, info) => {
    const tilesMoved = Math.round(info.offset.x / itemSpacing);
    if (tilesMoved === 0) {
      dragX.set(0);
      return;
    }
    setIndex((prev) => (prev - tilesMoved + carouselItems.length) % carouselItems.length);
    dragX.set(0);
  };

  const onItemClick = (pos) => {
    if (pos === 0) return;
    setIndex((prev) => (prev + pos + carouselItems.length) % carouselItems.length);
  };

  return (
    <div id = 'carousel'className="py-12 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-white">Featured Components</h2>
      <motion.div
        className="relative h-[32rem] flex items-center justify-center overflow-hidden mb-16"
        drag="x"
        dragElastic={0.2}
        dragConstraints={{ left: 0, right: 0 }}
        dragMomentum={false}
        style={{ x: dragX }}
        onDragEnd={onDragEnd}
      >
        {getVisible(index).map((item) => (
          <motion.div
            key={item.name}
            layout
            onClick={() => onItemClick(item.pos)}
            animate={{
              x: item.pos * itemSpacing,
              scale: styleMap[item.pos].scale,
              opacity: styleMap[item.pos].opacity,
              zIndex: styleMap[item.pos].zIndex,
            }}
            whileHover={{
              scale: styleMap[item.pos].scale * 1.05,
              boxShadow: "0 15px 30px rgba(0,0,0,0.5)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute w-[20rem] h-[20rem] rounded-xl flex items-center justify-center cursor-pointer border border-white/30 text-white font-bold text-3xl"
            style={{
              backgroundImage: `url(${item.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {item.name}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}