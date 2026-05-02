"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState, type SyntheticEvent } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export type SkeletonImageProps = Omit<ImageProps, "fill"> & {
  fill: true;
  skeletonClassName?: string;
};

export function SkeletonImage({
  className,
  skeletonClassName,
  onLoad,
  alt,
  fill,
  ...rest
}: SkeletonImageProps) {
  return (
    <SkeletonImageInner
      key={String(rest.src)}
      className={className}
      skeletonClassName={skeletonClassName}
      onLoad={onLoad}
      alt={alt}
      fill={fill}
      {...rest}
    />
  );
}

function SkeletonImageInner({
  className,
  skeletonClassName,
  onLoad,
  alt,
  fill,
  ...rest
}: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true);
      onLoad?.(event);
    },
    [onLoad]
  );

  return (
    <span className="absolute inset-0 block overflow-hidden">
      {!loaded && (
        <Skeleton
          className={cn(
            "absolute inset-0 z-10 size-full rounded-none",
            skeletonClassName
          )}
        />
      )}
      <Image
        alt={alt}
        fill={fill}
        className={cn(
          className,
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
        {...rest}
        onLoad={handleLoad}
      />
    </span>
  );
}
