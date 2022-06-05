///*~~~~~~~~Imports from Other Files~~~~~~~~*/
import {fetchApiData} from './apiCalls.js';
import './css/styles.css';
import HydrationRepository from './HydrationRepository.js';
import UserRepository from './UserRepository';
import SleepRepository from './SleepRepository';
import ActivityRepository from './ActivityRepository';


///*~~~~~~~~Global Variables~~~~~~~*/
var userRepo;
var hydrationRepo;
var sleepRepo;
var activityRepo;

const getRandomID = () => {
  return Math.floor(Math.random() * 49) + 1;
};

const userId = getRandomID();

const userPromise = fetchApiData('http://localhost:3001/api/v1/users');
const hydrationPromise = fetchApiData('http://localhost:3001/api/v1/hydration');
const sleepPromise = fetchApiData('http://localhost:3001/api/v1/sleep');
const activityPromise = fetchApiData('http://localhost:3001/api/v1/activity');

Promise.all([userPromise, hydrationPromise, sleepPromise, activityPromise])
  .then((value) => {
    setUserData(value[0].userData)
    const thisUser = getUserData();
    userBuildAttributes(thisUser);
    setHydrationData(value[1].hydrationData);
    hydrationBuildAttributes(hydrationRepo);
    setSleepData(value[2].sleepData);
    sleepBuildAttributes(sleepRepo);
    setActivityData(value[3].activityData);
    activityBuildAttributes(activityRepo);
  })
  .catch(error => {
    console.log(error)
    return errorMessage.innerText = error.message;
});

const setUserData = (someData) => {
  userRepo = new UserRepository(someData);
};

const setHydrationData = (someData) => {
  hydrationRepo = new HydrationRepository(someData)
};

const setSleepData = (someData) => {
  sleepRepo = new SleepRepository(someData);
};

const setActivityData = (someData) => {
  activityRepo = new ActivityRepository(someData);
}

///*~~~~~~~~QUERY SELECTORS~~~~~~~*/
var userGreeting = document.querySelector("#userGreeting");
var emailAddress = document.querySelector("#emailAddress");
var stepGoal = document.querySelector("#stepGoal");
var friends = document.querySelector('#friends');
var address = document.querySelector('#address');
var strideLength = document.querySelector('#strideLength');
var averageUserGoal = document.querySelector('#averageStepGoal');
var userWaterDay = document.querySelector('#userWaterPerDay');
var userName = document.querySelector('#userName');
var hydrationDays = document.querySelectorAll('.hydration-day');
var userSleepPerDay = document.querySelector('#UserSleepPerDay');
var userSleepAllTime = document.querySelector('#userSleepAllTime');
var sleepDays = document.querySelectorAll('.sleep-day');
var errorMessage = document.querySelector('.error-message');
var userStepPerDay = document.querySelector('.user-step-per-day');
var userMinutesActivePerDay = document.querySelector('.user-minutes-active-per-day');
var userMilesPerDay = document.querySelector('.user-miles-per-day');
var stepComparison = document.querySelector('.step-comparison');
var minutesComparison = document.querySelector('.minutes-comparison');
var stairsComparison = document.querySelector('.stairs-comparison');
var activityDays = document.querySelectorAll('.activity-day');
 
//*~~~~~~~~Functions~~~~~~~*//
function getUserData() {
  var thisUser = userRepo.getUserById(userId);
  return thisUser;
};

const userBuildAttributes = (user) => {
  userName.innerHTML = `<span class="user-property-names">Name:</span> ${user.name}`;
  emailAddress.innerHTML = `<span class="user-property-names">Email:</span> ${user.email}`;
  stepGoal.innerHTML = `<span class="user-property-names">Your step goal:</span> ${user.dailyStepGoal} steps per day`;
  friends.innerHTML = `<span class="user-property-names">Friends:</span> ${user.friends.map(num => ' ' + userRepo.users.find(user => user.id === num).name)}`;
  address.innerHTML = `<span class="user-property-names">Address:</span> ${user.address}`;
  strideLength.innerHTML = `<span class="user-property-names">Stride Length:</span> ${user.strideLength} feet`;
  userGreeting.innerHTML = `Welcome ${user.name.split(" ")[0]}!`;
  averageUserGoal.innerHTML = `The average fitlit user's goal is ${userRepo.getAverageSteps()} steps.`;
};

const formatHydrationData = () => {
  const userHydrationDataPerWeek = hydrationRepo.getUserHydrationPerWeek(userId, "2020/01/20");
  const formattedData = userHydrationDataPerWeek.map(hydrationData => {
    return `${hydrationData.date}: ${hydrationData.ounces} ounces`;
  });
  hydrationDays.forEach((dayElem, index) => {
    dayElem.innerText = `${formattedData[index]}`
  });
};

const hydrationBuildAttributes = (hydrationRepoParam) => {
  userWaterDay.innerHTML = `<p>You've drank ${hydrationRepoParam.getUserHydrationForDay(userId, "2020/01/20")} ounces of water today.</p>`;
  formatHydrationData();
}

const sleepBuildAttributes = (sleepRepoParam) => {
  userSleepPerDay.innerHTML = `<p>You got ${sleepRepoParam.getSleepDataByDate("2020/01/20", 'hoursSlept', userId)} hours sleep today 
  with ${sleepRepoParam.getSleepDataByDate("2020/01/20", 'sleepQuality', userId)}/5 sleep quality.</p>`;
  formatSleepData();
  userSleepAllTime.innerHTML = `<p>On average, you sleep ${sleepRepoParam.getAverageSleepForUserAllTime(userId,"hoursSlept").toFixed(2)} hours a night with an average sleep quality of ${sleepRepoParam.getAverageSleepForUserAllTime(userId,'sleepQuality').toFixed(2)}/5.</p>`
};

const formatSleepData = () => {
	const userSleepHoursPerWeek = sleepRepo.getUsersSleepDataPerWeek(userId,"2020/01/20",'hoursSlept');
  const userSleepQualityPerWeek = sleepRepo.getUsersSleepDataPerWeek(userId,"2020/01/20",'sleepQuality');
	const formattedHours = userSleepHoursPerWeek.map((hours) => {
		return `${hours.hoursSlept}`;
	});
  const formattedQuality = userSleepQualityPerWeek.map((quality) => {
		return `${quality.sleepQuality}`;
	});
	sleepDays.forEach((dayElem, index) => {
		dayElem.innerText = `${userSleepHoursPerWeek[index].date} : ${formattedHours[index]} hours, ${formattedQuality[index]}/5 sleep quality`;
	});
}

const activityBuildAttributes = (activityRepoParam) => {
  userStepPerDay.innerText = `You had ${activityRepoParam.activityData.find(data => data.userID === userId && data.date === "2020/01/20").numSteps} steps.`
  userMinutesActivePerDay.innerText = `You had ${activityRepoParam.activityData.find(data => data.userID === userId && data.date === "2020/01/20").minutesActive} minutes active.`
  userMilesPerDay.innerText = `You walked ${activityRepoParam.getMilesWalked(userId,"2020/01/20", getUserStrideLength(userId))} miles.`
  stepComparison.innerText = `On average Fit-Lit users had ${activityRepoParam.getAllUsersAverage("2020/01/20", "numSteps")} steps today.`
  minutesComparison.innerText = `On average Fit-Lit users had ${activityRepoParam.getAllUsersAverage("2020/01/20", "minutesActive")} active minutes today.`
  stairsComparison.innerText = `On average Fit-Lit users climbed ${activityRepoParam.getAllUsersAverage("2020/01/20", "flightsOfStairs")} flights of stairs today.`
  formatActivityData();
};

const getUserStrideLength = (idNum) => {
  const user = userRepo.users.find(data => data.id === idNum)
  return user.strideLength
}

const formatActivityData = () => {
	const userStepsPerWeek = activityRepo.getUsersActivityDataPerWeek(userId,"2020/01/20",'numSteps');
  const userMinutesActivePerWeek = activityRepo.getUsersActivityDataPerWeek(userId,"2020/01/20",'minutesActive');
  const userStairsPerWeek = activityRepo.getUsersActivityDataPerWeek(userId,"2020/01/20",'flightsOfStairs');
	const formattedSteps = userStepsPerWeek.map((steps) => {
		return `${steps.numSteps}`;
	});
  const formattedMinutes = userMinutesActivePerWeek.map((minutes) => {
		return `${minutes.minutesActive}`;
	});
  const formattedStairs = userStairsPerWeek.map((stairs) => {
		return `${stairs.flightsOfStairs}`;
	});
	activityDays.forEach((dayElem, index) => {
		dayElem.innerText = `${userStepsPerWeek[index].date} : ${formattedSteps[index]} steps, ${formattedMinutes[index]} minutes active, ${formattedStairs[index]} flights of stairs climbed.`;
	});
}

export {errorMessage};
