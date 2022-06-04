

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
    const activityDataForUser = this.getActivityDataForUser(idNum);
    const activityOnDay = activityDataForUser.find(day => day.date === date)
   return parseFloat(((activityOnDay.numSteps * strideLength)/5280).toFixed(2));
  };
};

export default ActivityRepository;