
 export const time = () => {
    const date = new Date();
    const realTime = {};
    realTime.day = date.getDay();
    realTime.hours = date.getHours();
    realTime.min = date.getMinutes();
    return realTime;
};

export const getSundays = () =>{
    let today = new Date();
    let nextSunday = new Date();

    let sunday = new Date(today.getTime() - today.getDay() * 24 * 3600 * 1000);
    nextSunday.setDate(sunday.getDate() + 7);
    let obj = {};
    obj.sunday = sunday.getTime();
    obj.nextSunday = nextSunday.getTime();

    return obj;
};

export const makeDate = (ms) =>{
    let date = new Date(ms);
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
};

export const fullTime = (num) => {
    let obj = {};
    
    switch(num){
        case 0:
            obj.day = 'Sunday';
            obj.workTime = '9:00 PM to 4:00 PM';
            break;

        case 1:
            obj.day = 'Monday';
            obj.workTime = '9:00 AM to 7:00 PM';
            break;

        case 2:
            obj.day = 'Tuesday';
            obj.workTime = '9:00 AM to 7:00 PM';
            break;

        case 3:
            obj.day = 'Wednesday';
            obj.workTime = '9:00 AM to 7:00 PM';
            break;

        case 4:
            obj.day = 'Thursday';
            obj.workTime = '9:00 AM to 7:00 PM';
            break;

        case 5:
            obj.day = 'Friday';
            obj.workTime = '9:00 AM to 7:00 PM';
            break;

        case 6:
            obj.day = 'Saturday';
            obj.workTime = '9:00 AM to 7:00 PM';
            break;

        default:
            obj.day = 'Default';
            obj.workTime = '0.00 am to 0.00 am';
            break;

    }
    return obj; 
};

