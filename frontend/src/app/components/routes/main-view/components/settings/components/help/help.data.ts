export interface Photo {
    url: string;
    title: string;
    description: string;
}

export const photos: Photo[] = [
    {
        url: "../../../../../../../../assets/images/guidebook/login.png",
        title: "Login View",
        description: `At the very beginning of working with the system, the user is greeted
            with a login screen. We have a field for entering an email address and password.`,
    },
    {
        url: "../../../../../../../../assets/images/guidebook/register.png",
        title: "Register View",
        description: `When a user is dealing with the system for the first time, he has the
            option to create an account by clicking on the "Register" button.`,
    },
    {
        url: "../../../../../../../../assets/images/guidebook/avatars.png",
        title: "User Avatars",
        description: `User roles also differ in the colours of their profile icons,
            in addition to the fundamental issue of permissions.`,
    },
    {
        url: "../../../../../../../../assets/images/guidebook/menu.png",
        title: "View of both states of the main menu",
        description: `The graphic above shows the expanded state (visible avatar
            with section icons) and collapsed (additional section names).`,
    },
    {
        url: "../../../../../../../../assets/images/guidebook/meetings.png",
        title: "Meetings View",
        description: `The photo above shows a list of meetings with visible,
            convenient pagination in the bottom right corner.`,
    },
    {
        url: "../../../../../../../../assets/images/guidebook/settings.png",
        title: "Settings View",
        description: `In the settings section under General, we have the option of changing
            the password. This is, of course, not the only function of the settings.`,
    },
    {
        url: "../../../../../../../../assets/images/guidebook/manage-users.png",
        title: "User management section",
        description: `The next subsection (accessible only to holders of the Admin role)
            is the "Modify users", which is the user management panel.`,
    },
    {
        url: "../../../../../../../../assets/images/guidebook/change-role.png",
        title: "Role change flow",
        description: `The diagram above illustrates a simple user role change flow.
            The function is only available to Admin.`,
    },
];

export enum HelpState {
    Start = "start",
    Guide = "guide",
    Finish = "finish",
}
