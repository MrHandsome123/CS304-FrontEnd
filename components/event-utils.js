//let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
import axios from 'axios';
import { IP_ADDRESS } from '@/main';



export const INITIAL_EVENTS = async () => {
    const response = await axios.get("http://"+IP_ADDRESS+":8181/courseEvent/getAllCourseEvents/11451414");
    const data = response.data;
    return data.map((event) => {
        return {
            title: event.courseCode + " " + event.eventName,
            start: event.startTime,
            end: event.endTime
        };
    });
}