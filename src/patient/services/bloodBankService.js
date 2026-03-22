import { mockBloodData } from '../data/mockBloodData';

export const getHospitals = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockBloodData);
        }, 800);
    });
};
