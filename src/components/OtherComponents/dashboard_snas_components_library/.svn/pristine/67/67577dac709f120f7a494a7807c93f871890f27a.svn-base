export function getMinMaxDates(inputDate) {
    let minDate, maxDate, timezone = 'local'
    // Check if input is a full year (e.g., "2024")
    if (/^\d{4}$/.test(inputDate)) {
        minDate = new Date(`${inputDate}-01-01T00:00:00.000Z`);
        maxDate = new Date(`${inputDate}-12-31T23:59:59.999Z`);
    } 
    // Check if input is a year and month (e.g., "2024-05")
    else if (/^\d{4}-\d{2}$/.test(inputDate)) {
        const [year, month] = inputDate.split('-').map(Number);
        minDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        maxDate = new Date(Date.UTC(year, month - 1, lastDayOfMonth, 23, 59, 59, 999));
    }
    // Check if input is a full date (e.g., "2024-05-14")
    else if (/^\d{4}-\d{2}-\d{2}$/.test(inputDate)) {
        const [year, month, day] = inputDate.split('-').map(Number);
        minDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
        maxDate = new Date(Date.UTC(year, month - 1, day + 1, 0, 0, 0, 0)); // 24 hours later
    }
    // Check if input is a full datetime (e.g., "2024-05-14T12:34:56Z")
    else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(inputDate)) {
        minDate = new Date(inputDate);
        maxDate = new Date(minDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours later
    }
    else if (/^\d{2}:\d{2}$/.test(inputDate)) {
        const [hours, minutes] = inputDate.split(':').map(Number);
        const now = new Date();
        // Create the minDate and maxDate based on today's date
        minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        maxDate = new Date(minDate.getTime() +  60 * 60 * 1000); // 1 hours later
        timezone = 'utc'
    }
    // Check if input is in 'MMM DD' format (e.g., "Jul 22")
    else if (/^[A-Za-z]{3} \d{1,2}$/.test(inputDate)) {
        const [month, day] = inputDate.split(' ');
        const year = new Date().getFullYear(); // Use the current year for context
        const dateStr = `${month} ${day}, ${year}`;
        const parsedDate = new Date(Date.parse(dateStr));
        
        if (isNaN(parsedDate)) {
            throw new Error("Invalid date format");
        }

        minDate = new Date(Date.UTC(year, parsedDate.getUTCMonth(), parsedDate.getUTCDate(), 0, 0, 0, 0));
        maxDate = new Date(Date.UTC(year, parsedDate.getUTCMonth(), parsedDate.getUTCDate(), 23, 59, 59, 999));
    }
    // Check if input is in 'DD MMM' format (e.g., "22 Jul")
    else if (/^\d{1,2} [A-Za-z]{3}$/.test(inputDate)) {
        const [day, month] = inputDate.split(' ');
        const year = new Date().getFullYear(); // Use the current year for context
        const dateStr = `${day} ${month} ${year} 00:00:00`;
        const startDate = new Date(Date.parse(dateStr));
        const endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + 1)

        // console.log({inputDate, startDate, endDate})
        if (isNaN(startDate)) {
            throw new Error("Invalid date format");
        }
        minDate = startDate
        maxDate = endDate
        // minDate = new Date(Date.UTC(year, parsedDate.getUTCMonth(), parsedDate.getUTCDate(), 0, 0, 0, 0));
        // maxDate = new Date(Date.UTC(year, parsedDate.getUTCMonth(), parsedDate.getUTCDate(), 23, 59, 59, 999));
    }
    else {
        // throw new Error("Invalid date format");
        minDate = new Date(inputDate)
        if ( minDate != "Invalid Date"){
            maxDate = new Date(minDate.getTime() + 60 * 60 * 1000); // 1 hours later
            timezone = 'utc'
        }
        else{
            minDate = null
            maxDate = null
        }
    }
    return {
        minDate,
        maxDate,
        timezone
    };
}

// // Example usage:
// console.log(getMinMaxDates("2024"));                    // { minDate: '2024-01-01T00:00:00.000Z', maxDate: '2024-12-31T23:59:59.999Z' }
// console.log(getMinMaxDates("2024-05"));                 // { minDate: '2024-05-01T00:00:00.000Z', maxDate: '2024-05-31T23:59:59.999Z' }
// console.log(getMinMaxDates("2024-05-14"));              // { minDate: '2024-05-14T00:00:00.000Z', maxDate: '2024-05-15T00:00:00.000Z' }
// console.log(getMinMaxDates("2024-05-14T12:34:56Z"));    // { minDate: '2024-05-14T12:34:56.000Z', maxDate: '2024-05-15T12:34:56.000Z' }
// console.log(getMinMaxDates("Jul 22"));                  // { minDate: '2024-07-22T00:00:00.000Z', maxDate: '2024-07-22T23:59:59.999Z' }
