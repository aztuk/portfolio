"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";

import type { ImageAsset, VideoAsset } from "@/content/use-cases/types";

type PreviewMediaProps = {
  previewImage: ImageAsset;
  previewVideo?: VideoAsset;
  /** Applied to the inner media element — same API as passing className to <Image fill> */
  mediaClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export const PreviewMedia = ({
  previewImage,
  previewVideo,
  mediaClassName,
  sizes = "100vw",
  priority = false,
}: PreviewMediaProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!previewVideo || !videoRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [previewVideo]);

  if (previewVideo) {
    return (
      <video
        ref={videoRef}
        // h-full w-full fills the relative container the same way <Image fill> does
        className={clsx("h-full w-full object-cover", mediaClassName)}
        loop
        muted
        playsInline
        preload="none"
        poster={previewImage.src}
        aria-label={previewVideo.alt}
      >
        <source src={previewVideo.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={previewImage.src}
      alt={previewImage.alt}
      fill
      priority={priority}
      className={mediaClassName}
      sizes={sizes}
    />
  );
};
