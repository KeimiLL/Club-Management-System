export interface Faq {
    question: string;
    answer: string;
    icon: string;
}

export const faq: Faq[] = [
    {
        question: "What is CMS?",
        answer: `CMS is an acronym for Club Management System - comprehensive system used by sport clubs to efficiently
            manage various aspects of their operations. This system is designed to monitor and streamline ongoing
            processes, enhance team potential, automate various club-related tasks, and facilitate the smooth flow of
            information within the organization. In essence, a Club Management System serves as a centralized platform
            that empowers clubs to optimize their activities, improve their overall performance, and provide a seamless
            means of communication and information sharing among members and stakeholders.`,
        icon: "language",
    },
    {
        question: "Who we are?",
        answer: `The authors of the CMS are Dominik Sigulski, Bartosz Rolnik and Kamil Giziński. We are three young
            and ambitious frontend developers from Poland. When creating this application, we tried to take care of
            every detail to satisfy even the most demanding users. Thank you for choosing CMS!`,
        icon: "diversity_3",
    },
    {
        question: "How does the CMS facilitate registration?",
        answer: `Our system simplifies member registration and activity participation. Members can easily sign up
            or renew their memberships online by filling out a registration form with necessary personal details.
            Once registered, members gain access to a dashboard where they can view and join various club activities,
            including meetings, events, team participation, and coaching sessions. The system tracks member
            participation, allowing administrators to incentivize active involvement and engagement.`,
        icon: "app_registration",
    },
    {
        question: "How do I create and manage meetings?",
        answer: `Creating meetings is straightforward within our system. Access the 'Meetings' section and click on
            the 'Add Meeting' button. Fill in essential details such as meeting title, date, and agenda. You can also
            specify attendees. After creation, meetings can be managed by editing details, managing attendee lists,
            and outcomes for future reference.`,
        icon: "groups",
    },
    {
        question: "How can I assign roles to different users?",
        answer: `Club administrators have the capability to assign specific roles and permissions to different users
            based on their responsibilities and access requirements. Roles such as administrators, coaches, team leaders,
            and general members can be defined with varying levels of access to different features and data within
            the system, ensuring proper management and data security.`,
        icon: "assignment_ind",
    },
    {
        question: "Can members access their activity in CMS?",
        answer: `Absolutely! Members have access to their personalized activity schedules through their accounts. They
            can view upcoming meetings, team sessions, training programs, and events they've registered for. The system
            also sends reminders and updates about their scheduled activities, ensuring they stay informed and engaged.`,
        icon: "key",
    },
    {
        question: "How secure is the data within the CMS?",
        answer: `Data security is a top priority for us. Our system employs robust security measures, including
            encryption protocols, secure login processes, regular system backups, and restricted access controls.
            We ensure that all member data, financial information, and club-related data are safeguarded
            against unauthorized access or breaches.`,
        icon: "security",
    },
    {
        question: "How do I update my profile details?",
        answer: `Simply log in to your account, navigate to your profile settings, and update the necessary
            information such as contact details, address, or any other relevant data.`,
        icon: "manage_accounts",
    },
    {
        question: "Is there a support hotline?",
        answer: `Certainly! We have a dedicated support hotline available during business hours. Feel free to contact
            us at +48 400 500 600 for any assistance or queries regarding the club management system.`,
        icon: "local_phone",
    },
];
