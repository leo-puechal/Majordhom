export interface ContactFormData {
    civility: 'Mme' | 'M';
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    availabilities: string[];
    messageType: 'visite' | 'rappel' | 'photos';
    message: string;
}

export interface Availability {
    day: string;
    hour: string;
    minute: string;
}

export interface ContactFormProps {
    onSubmit?: (data: ContactFormData) => void;
}