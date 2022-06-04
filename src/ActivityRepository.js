

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

  getMinutesActivePerDay(idNum, date) {
    const activityDay = this.activityData.find(day => day.userID === idNum && day.date === date)
    return activityDay.minutesActive;
  };

  getAverageActiveMinutesPerWeek(idNum, dateParam) {
    const userData = this.getActivityDataForUser(idNum);
    const endDateIndex = userData.findIndex((date) => {
        return date.date === dateParam;
    });
    const weeklyRange = userData.slice(endDateIndex - 6, endDateIndex + 1);
    const activeMinutes = weeklyRange.reduce((counter, day) => {
      counter += day.minutesActive
      return counter
    }, 0);
    return Math.round(activeMinutes / 7);
  }
};

export default ActivityRepository;