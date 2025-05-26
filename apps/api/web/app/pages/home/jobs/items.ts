import { ElementType } from "react";
import { To } from "react-router";

import BoyDashboard from "@/assets/illustrations/boy-dashboard.svg?react";
import GirlDesigning from "@/assets/illustrations/girl-designing.svg?react";
import ResponsiveDevicesGirl from "@/assets/illustrations/responsive-devices-girl.svg?react";

export interface Item {
  id: number;
  title: string;
  Image: ElementType;
  description: string;
  action: To;
  actionLabel: string;
}

export const items: Item[] = [
  {
    id: 1,
    title: "Telegram Botu",
    Image: BoyDashboard,
    description:
      "Telegram botları, mini Appler ve daha fazlası!",
    action: "/",
    actionLabel: "Bize Ulaş!",
  },
  {
    id: 2,
    title: "Kripto AlgoTrade Yazılımları",
    Image: GirlDesigning,
    description:
      "Stratejinizi otomatikleştirmek için doğru adres!",
    action: "/",
    actionLabel: "Bize Ulaş!",
  },
  {
    id: 3,
    title: "İsteğe Özel Yazılımlar",
    Image: ResponsiveDevicesGirl,
    description:
      "Yaptığınız işi tam otomatize hale getirmek bir tık uzağınızda!",
    action: "/",
    actionLabel: "Bize Ulaş!",
  },
];
