

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
  };

  assessUserStepGoalCompletionPerDay(idNum, date, stepGoal) {
    const userActivityDay = this.activityData.find(day => day.userID === idNum && day.date === date);
    if(userActivityDay.numSteps >= stepGoal) {
      return true;
    } else {
      return false;
    };
  };

  assessUserStepGoalCompletionAllTime(idNum, stepGoal) {
    const userActiveDays = this.activityData.filter(day => day.userID === idNum && day.numSteps >= stepGoal);
    return userActiveDays;
  };

  getUserStairRecord(idNum) {
    const userActivity = this.getActivityDataForUser(idNum);

    const sortedDays = userActivity.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs
    });
    return sortedDays[0];
  };

  getUserAverage(idNum, property) {
    const userActivity = this.getActivityDataForUser(idNum);

    const userAverage = userActivity.reduce((counter, currentDay) => {
      counter += currentDay[property]
      return counter;
    }, 0)/userActivity.length;
    
    return userAverage;
  };
  
  getAllUsersAverage(date,property) {
    const activityDate = this.activityData.filter(data => data.date === date);
    const allUsersAverage = activityDate.reduce((acc,cur) => {
        acc += cur[property]
      return acc
    },0)/activityDate.length
    return Math.round(allUsersAverage);
  }
};

export default ActivityRepository;