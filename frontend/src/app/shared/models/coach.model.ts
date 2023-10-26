export interface CreateCoachDates {
    date_of_joining: string;
    date_of_birth: string;
}

export interface CreateCoach extends CreateCoachDates {
    user_id: number;
}

export interface CoachName {
    user_full_name: string;
}

export interface ShortCoach extends CoachName {
    user_id: number;
}
