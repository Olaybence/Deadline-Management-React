

const initialTaskState = () => {
 return {
    schedule: "schedule initial"
 }
};

const scheduleReducer = (state = initialTaskState(), action) => {
    return {
        schedule: "schedule empty"
    }
}

export default scheduleReducer;
