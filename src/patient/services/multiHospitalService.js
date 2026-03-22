import { mockHospitalData } from '../data/mockHospitalData';

export const getMultiHospitals = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockHospitalData);
        }, 800);
    });
};
