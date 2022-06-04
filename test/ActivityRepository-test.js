import { expect } from 'chai';
import ActivityRepository from '../src/ActivityRepository';
import UserRepository from '../src/ActivityRepository';
import activityData from '../src/data/activity'
import userData from '../src/data/users'

describe('ActivityRepository', () => {
    let activityRepository;
    let userRepository;

    beforeEach(() => {
      activityRepository = new ActivityRepository(activityData);
      userRepository = new UserRepository(userData);
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
      expect(activityRepository.getMinutesActive(2, '2019/06/15').to.equal(138));
    })
});