//Klass för att generera och skapa nya värden för tärning där värde slumpas mellan 1-6.
class One_dice {
    constructor() {
        this.value = this.new_Value();
    }
    new_Value() {
        return Math.floor(Math.random() * 6) + 1;
    }    
}