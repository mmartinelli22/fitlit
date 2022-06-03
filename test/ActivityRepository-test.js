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

    it('Should be able to return miles a user walked for a specific date', () => {
      expect(activityRepository.getMilesWalked(1, '2019/06/15')).to.equal(2.91);
    });
});