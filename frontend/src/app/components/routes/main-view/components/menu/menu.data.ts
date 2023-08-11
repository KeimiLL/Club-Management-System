import { MenuItem } from "./menu.component";

export const menuItems: MenuItem[] = [
    { name: "dashboard", icon: "dashboard", route: "/app/dashboard" },
    { name: "calendar", icon: "calendar_month", route: "/app" },
    { name: "meetings", icon: "question_answer", route: "/app/meetings" },
    { name: "teams", icon: "groups", route: "/app" },
    { name: "schedule", icon: "event_available", route: "/app" },
    { name: "finances", icon: "savings", route: "/app" },
    { name: "medic", icon: "local_hospital", route: "/app" },
    { name: "settings", icon: "settings", route: "/app/settings" },
];
