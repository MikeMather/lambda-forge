

export class DogsService {
    private dogs = [
        { id: 1, breed: 'Golden Retriever' },
        { id: 2, breed: 'German Shepherd' },
        { id: 3, breed: 'Labrador' },
        { id: 4, breed: 'Beagle' },
        { id: 5, breed: 'Bulldog' },
    ];
    
    public getDogById(id: number) {
        return this.dogs.find(dog => dog.id === id);
    }
    
    public createDog(dog: { name: string, breed: string }) {
        const newDog = { id: this.dogs.length + 1, ...dog };
        this.dogs.push(newDog);
        return newDog;
    }
}