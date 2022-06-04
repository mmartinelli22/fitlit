

class ActivityRepository {
  constructor(data) {
    this.activityData = data
  }

  getActivityDataForUser(idNum) {
    const activityDataForUser = this.activityData.filter((user) => {
        return user.userID === idNum;
    });
    return activityDataForUser;
};

  getMilesWalked(idNum, date, strideLength) {
    const activityOnDay = this.activityData.find(day => day.date === date && day.userID === idNum)
   return parseFloat(((activityOnDay.numSteps * strideLength)/5280).toFixed(2));
  };

  getMinutesActive(idNum, date) {
    const activityDay = this.activityData.find(day => day.userID === idNum && day.date === date)
    return activityDay.minutesActive;
  };
};

export default ActivityRepository;