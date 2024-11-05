export const formatDateToKhmer = (date: Date | number | string , type:any = false): string => {
    // If date is a number or string, assume it's a UNIX timestamp
    const timestamp:any =  date;
    let currentDate = timestamp && type == false ? new Date(timestamp * 1000) : date as Date;
    
    const locale = {
        month: [
            "មករា",
            "កុម្ភៈ",
            "មីនា",
            "មេសា",
            "ឧសភា",
            "មិថុនា",
            "កក្កដា",
            "សីហា",
            "កញ្ញា",
            "តុលា",
            "វិច្ឆិកា",
            "ធ្នូ"
        ],
        numbers: ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"]
    };

    
    const day: any = currentDate.getDate().toString().padStart(2, "0");
    const month: any = locale.month[currentDate.getMonth()];
    const year: any = currentDate.getFullYear().toString();
    let khmerYear = "";
    for (let i = 0; i < year.length; i++) {
        khmerYear += locale.numbers[parseInt(year[i])];
    }
    // Convert numbers to Khmer numerals
    let khmerDay = "";
    for (let i = 0; i < day.length; i++) {
        khmerDay += locale.numbers[parseInt(day[i])];
    }

    return `${khmerDay}-${month}-${khmerYear}`;
}

// Example usage:
// let oldDate = 1712482025;
// const formattedDate = formatDateToKhmer(oldDate);
