import { provider } from '../config/initPact';
import { AnimalController } from '../../../controllers';
import { Matchers } from '@pact-foundation/pact';

const animal_name = 'Lucas';

describe('Given an animal service', () => {
    beforeAll(async() => {
        await provider.setup();
    });

    describe('When an animal is requested to be removed', () => {
        beforeAll(async() => {
            await provider.addInteraction({
                state: 'deleting an animal',
                uponReceiving: 'a request to delete an animal',
                withRequest: {
                    method: 'DELETE',
                    path: '/animals/'+animal_name
                },
                willRespondWith: {
                    status: 200,
                    body: Matchers.eachLike({
                        message: Matchers.string('Animal deleted successfully'),
                    }, {min: 1})
                }
            });
        });

        test('It should then return a confirmation message about the deleted animal', async() => {
            const response = await AnimalController.delete(animal_name);
            expect(response.data).toMatchSnapshot();

            await provider.verify();
        })

    });

    afterAll(async () => {
        await provider.finalize();
    });
});