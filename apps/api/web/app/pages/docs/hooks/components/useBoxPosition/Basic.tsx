import { useBoxPosition } from "@/hooks";

export function Basic() {
  const { ref, left, top } = useBoxPosition<HTMLDivElement>();
  
  return (
    <div>
      <div ref={ref} className="size-16 rounded-sm bg-primary-500"></div>
      <div className="mt-2">
        <div className="text-sm">Left: {left}</div>
        <div className="text-sm">Top: {top}</div>
      </div>
    </div>
  );
}
