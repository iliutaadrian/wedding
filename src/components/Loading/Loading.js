/**
 * @file Loading.js
 * @description Displays a loading spinner overlay.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import React from "react";
import images from "@/utils/imagesImport";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed top-0 bg-black bg-opacity-55 flex justify-center items-center w-full h-svh z-[9999]">
      <Image
        src={images.spinner}
        alt="Searching..."
        width={30}
        height={30}
        quality={100}
        className="animate-spin w-[30px] h-[30px]"
      />
    </div>
  );
};

export default Loading;
