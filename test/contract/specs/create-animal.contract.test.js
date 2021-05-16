import { provider } from "./init-pact";
import { AnimalController } from "../../../controllers";
import { Matchers } from "@pact-foundation/pact";

describe('Given An Animal service', () => {
    describe('When a request to create an animal is made', () => {


        var animal = {
            name:"Lucas",
            breed:"Beagle",
            gender:"Male",
            vaccinated:true
        }



        beforeAll(async () => {
            await provider.setup();
            await provider.addInteraction({
                state: 'create animal',
                uponReceiving: 'a request to create an animal',
                withRequest: {

                    method: 'POST',
                    path: '/animals',
                    headers: {
                        'Content-Type': 'application/json'
                    },


                    body: animal
                    /* Matchers.eachLike({
                        name: Matchers.string('Lucas'),
                        breed: Matchers.like("Beagle"),
                        gender: Matchers.like("Male"),
                        vaccinated: Matchers.boolean(true), */
                },

                
                willRespondWith: {
                    status: 201,
                    body: Matchers.like(animal),
                    
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            });
        });

        it("Then it should return the right data", async() =>{
            const response = await AnimalController.register(animal);
            expect(response.data).toMatchSnapshot();
            await provider.verify();
        });

        afterAll(async () => {
            await provider.finalize();
        });
    });
});