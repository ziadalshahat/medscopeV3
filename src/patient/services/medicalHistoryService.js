import { mockMedicalHistory } from '../data/mockMedicalHistory';

export const getMedicalHistory = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockMedicalHistory);
        }, 800);
    });
};
