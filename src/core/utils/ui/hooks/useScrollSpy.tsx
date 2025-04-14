import { useEffect, useState } from "react";

export const useScrollSpy = (
  ids: string[],
  options: IntersectionObserverInit = {
    threshold: 0.5,
    rootMargin: "0px 0px -50% 0px",
  }
) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length > 0) {
        const filtered = visible.filter(
          (entry) => entry.boundingClientRect.top >= 0
        );
        const topMost = (filtered.length > 0 ? filtered : visible).reduce(
          (prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top
              ? prev
              : curr
        );
        setActiveId(topMost.target.id);
      }
    }, options);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
};
