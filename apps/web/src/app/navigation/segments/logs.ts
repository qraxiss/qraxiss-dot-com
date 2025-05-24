import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

const ROOT_LOGS = "/logs";

const path = (root: string, item: string) => `${root}${item}`;

export const logs: NavigationTree = {
    ...baseNavigationObj["logs"],
    type: "root",
    childs: [
        {
            id: "logs.logs",
            path: path(ROOT_LOGS, "/logs"),
            type: "item",
            title: "Logs",
            transKey: "nav.logs.logs",
            icon: "logs.logs",
        },
        {
            id: "logs.errors",
            path: path(ROOT_LOGS, "/errors"),
            type: "item",
            title: "CRM Analytics",
            transKey: "nav.logs.errors",
            icon: "logs.errors",
        },
    ],
};
