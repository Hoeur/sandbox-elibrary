export const arabicToKhmer = (number:number|string) => {
    const khmerNumerals = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
    const arabicDigits = String(number).split('').map(Number);
    return arabicDigits?.map(digit => khmerNumerals[digit])?.join('');
}