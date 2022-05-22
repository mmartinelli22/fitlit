class SleepRepository {
	constructor(data) {
		this.sleepData = data;
	}

	getSleepDataForUser(idNum) {
		const sleepDataForUser = this.sleepData.filter((obj) => {
			if (obj.userID === idNum) {
				return obj;
			}
		});
		return sleepDataForUser;
	}

	getAverageSleepQualityForUserAllTime(idNum) {
		const averageSleeps = this.getSleepDataForUser(idNum);
		let averageUserSleepQualityForAll = averageSleeps.reduce((acc, cur) => {
			acc += cur.sleepQuality;
			return acc;
		}, 0);
		return averageUserSleepQualityForAll / averageSleeps.length;
	}

	getAverageSleepHoursForUserAllTime(idNum) {
		const sleepDataForUser = this.getSleepDataForUser(idNum);
		let averageUserSleepHours = sleepDataForUser.reduce((acc, cur) => {
			acc += cur.hoursSlept;
			return acc;
		}, 0);
		return averageUserSleepHours / sleepDataForUser.length;
	}

	getSleepDataByDate(date, property, id) {
		let sleepDataByDay = this.sleepData.find((element) => {
			if (element.date === date && element.userID === id) {
				return element;
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
			return {date: date.date, [property]: date[property]};
		});
		return weeklyPropertyHours;

	}

	getAllUsersAverageSleep() {
		const allUsersAverageSleep = this.sleepData.reduce((acc, currentUser) => {
			acc += currentUser.sleepQuality;
			return acc;
		}, 0);
		return allUsersAverageSleep / this.sleepData.length;
	}
}

export default SleepRepository;
