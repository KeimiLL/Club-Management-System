export interface CreateCoachDates {
    date_of_joining: string;
    date_of_birth: string;
}

export interface CreateCoach {
    user_id: number;
}

export interface ShortCoach {
    user_id: number;
    user_full_name: string;
}
