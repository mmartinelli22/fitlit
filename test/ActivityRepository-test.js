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

    it('Should hold the users hydration data', () => {
        expect(activityRepository.activityData).to.equal(activityData);
    });
});