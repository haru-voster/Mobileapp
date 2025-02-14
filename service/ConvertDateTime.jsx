import moment from "moment"

export const FormatDate=(timestamp)=>{
    return new Date(timestamp).setHours(0,0,0,0)
}

export const formatDateForText=(date)=>{
    return moment(date).format('ll')
}

export const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const timeString = date.toISOString().substr(11, 5); // 'HH:MM'
    console.log(timeString);
    return timeString;
  };
  