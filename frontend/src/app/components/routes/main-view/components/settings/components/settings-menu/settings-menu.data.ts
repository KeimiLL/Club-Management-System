import { SettingsMenuItem } from "src/app/shared/models/settings.models";

export const settingsMenuItems: SettingsMenuItem[] = [
    { name: "General", route: "/app/settings/general" },
    { name: "Modify users", route: "/app/settings/modify" },
    { name: "Help", route: "/app/settings/help" },
];
