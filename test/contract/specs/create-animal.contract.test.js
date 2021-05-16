import { provider } from '../config/initPact';
import { AnimalController } from "../../../controllers";
import { Matchers } from "@pact-foundation/pact";

describe('Given An Animal service', () => {
    describe('Cuando se pide la creación de un animal', () => {


        var animal = {
            'name':'Lucas',
            'breed':'Catico',
            'gender':'Male',
            'isVaccinated':true,
            'vaccines': []}


        
        


        beforeAll(async () => {
            await provider.setup();
            await provider.addInteraction({
                state: 'create animal',
                uponReceiving: 'a request to create an animal',
                withRequest: {


                    method: 'POST',
                    path: '/animals',
                
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

        it("It should then return the data of the animal created correctly", async() =>{
            const response = await AnimalController.register(animal);
            expect(response.data).toMatchSnapshot();
            await provider.verify();
        });

        afterAll(async () => {
            await provider.finalize();
        });
    });
});