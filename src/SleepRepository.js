class SleepRepository {
	constructor(data) {
		this.sleepData = data;
	}

	getSleepDataForUser(idNum) {
		const sleepDataForUser = this.sleepData.filter((sleepdata) => {
			if (sleepdata.userID === idNum) {
				return idNum;
			}
		});
		return sleepDataForUser;
	}
  
	getAverageSleepForUserAllTime(idNum, property) {
		const sleepDataForUser = this.getSleepDataForUser(idNum);
		let averageSleepForUserAllTime = sleepDataForUser.reduce((counter,currentDate) => {
			counter += currentDate[property]
			return counter
		},0);
		return averageSleepForUserAllTime / sleepDataForUser.length;
  }

	getSleepDataByDate(date, property, id) {
		let sleepDataByDay = this.sleepData.find((user) => {
			if (user.date === date && user.userID === id) {
				return user;
			}
		});
		return sleepDataByDay[property];
	}

	getUsersSleepDataPerWeek(id, dateParam, property) {
		const userData = this.getSleepDataForUser(id);
		const endDateIndex = userData.findIndex((date) => {
			return date.date === dateParam;
		});
		const weeklyRange = userData.slice(endDateIndex - 6, endDateIndex + 1);
		const weeklyPropertyHours = weeklyRange.map((date) => {
			return { date: date.date, [property]: date[property] };
		});
		return weeklyPropertyHours;

	}

	getAllUsersAverageSleep() {
		const allUsersAverageSleep = this.sleepData.reduce((average, currentUser) => {
			average += currentUser.sleepQuality;
			return average;
		}, 0);
		return allUsersAverageSleep / this.sleepData.length;
	}
}

export default SleepRepository;
