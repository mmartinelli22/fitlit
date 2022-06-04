import { expect } from 'chai';
import ActivityRepository from '../src/ActivityRepository';
import activityData from '../src/data/activity'

describe('ActivityRepository', () => {
    let activityRepository;

    beforeEach(() => {
      activityRepository = new ActivityRepository(activityData);
    })

    it('Should be a function', () => {
        expect(ActivityRepository).to.be.a('function');
    });

    it('Should be a new instance of ActivityRepository', () => {
        expect(activityRepository).to.be.an.instanceof(ActivityRepository)
    });

    it('Should hold the users activity data', () => {
        expect(activityRepository.activityData).to.equal(activityData);
    });

    it('Should be able to get a specific user\'s activity data with their id', () => {
      expect(activityRepository.getActivityDataForUser(1)).to.deep.equal(
        [
          {
            userID: 1,
            date: '2019/06/15',
            numSteps: 3577,
            minutesActive: 140,
            flightsOfStairs: 16
          },
          {
            userID: 1,
            date: '2019/06/16',
            numSteps: 6637,
            minutesActive: 175,
            flightsOfStairs: 36
          },
          {
            userID: 1,
            date: '2019/06/17',
            numSteps: 14329,
            minutesActive: 168,
            flightsOfStairs: 18
          },
          {
            userID: 1,
            date: '2019/06/18',
            numSteps: 4419,
            minutesActive: 165,
            flightsOfStairs: 33
          },
          {
            userID: 1,
            date: '2019/06/19',
            numSteps: 8429,
            minutesActive: 275,
            flightsOfStairs: 2
          },
          {
            userID: 1,
            date: '2019/06/20',
            numSteps: 14478,
            minutesActive: 140,
            flightsOfStairs: 12
          },
          {
            userID: 1,
            date: '2019/06/21',
            numSteps: 6760,
            minutesActive: 135,
            flightsOfStairs: 6
          },
          {
            userID: 1,
            date: '2019/06/22',
            numSteps: 10289,
            minutesActive: 119,
            flightsOfStairs: 6
          }
        ]
      );
    });

    it('Should be able to return miles a user walked for a specific date', () => {
      expect(activityRepository.getMilesWalked(1, '2019/06/15', 4.3)).to.equal(2.91);
    });

    it('Should be able to calculate minutes active for a user on a specific day', () => {
      expect(activityRepository.getMinutesActivePerDay(2, '2019/06/15')).to.equal(138);
    });

    it('Should be able to calculate the average minutes a day a user was active for a given week', () => {
      expect(activityRepository.getAverageActiveMinutesPerWeek(2, '2019/06/22')).to.equal(154)
    });

    it('Should be able to assess if a user met their step goal for a given day', () => {
      expect(activityRepository.assessUserStepGoalCompletionPerDay(3, '2019/06/17', 5000)).to.equal(false);
      expect(activityRepository.assessUserStepGoalCompletionPerDay(1, '2019/06/17', 10000)).to.equal(true);
    });

    it.skip('Should get the days a user\'s step goal was achieved', () => {
      expect(activityRepository.assessUserStepGoalCompletionAllTime(2, 5000)).to.deep.equal([
        {
          userID: 2,
          date: '2019/06/17',
          numSteps: 13750,
          minutesActive: 65,
          flightsOfStairs: 4
        },
        {
          userID: 2,
          date: '2019/06/19',
          numSteps: 9858,
          minutesActive: 243,
          flightsOfStairs: 44
        },
        {
          userID: 2,
          date: '2019/06/20',
          numSteps: 8153,
          minutesActive: 74,
          flightsOfStairs: 10
        },
        {
          userID: 2,
          date: '2019/06/21',
          numSteps: 10225,
          minutesActive: 174,
          flightsOfStairs: 26
        }
      ]);

      it.skip('Should find user\'s all time stair climbing record', () => {
        expect(activityRepository.getUserStairRecord(3)).to.deep.equal({
          userID: 3,
          date: '2019/06/20',
          numSteps: 5369,
          minutesActive: 129,
          flightsOfStairs: 46
        });
      });
    })

    it.skip('Should find user\'s averages for numSteps, minutesActive, and flightsOfStairs', () => {
      expect(activityRepository.getUserAverage(1, 'numSteps')).to.equal(8614.75);
      expect(activityRepository.getUserAverage(2, 'minutesActive')).to.equal(152.375);
      expect(activityRepository.getUserAverage(3, 'flightsOfStairs')).to.equal(20.625);
    });
});