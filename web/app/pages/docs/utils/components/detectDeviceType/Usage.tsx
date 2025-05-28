import { detectDeviceType } from "@/utils/dom/detectDeviceType";


export function Usage() {
  const device = detectDeviceType();

  return (
    <div>
      Your device: <span className="font-bold">{device}</span>
    </div>
  );
}
