import { useRef, useEffect } from "react";

const useClickOutside = (handler: () => void) => {
  const downNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maybeHandler = (event: MouseEvent) => {
      if (!downNode.current?.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return { downNode };
};

export default useClickOutside;
