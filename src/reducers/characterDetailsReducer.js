const initialState = {
    name: '',
    race: '',
    alignment: '',
    image: '',
    details: '',
    level: '',
    characterClass: '',
    strength: '',
    dexterity: '',
    constitution: '',
    intelligence: '',
    wisdom: '',
    charisma: '',
    initiative: '',
    armor_class: '',
    speed: '',
    hitPoints: '',
    inspiration: ''
}
function characterDetailsReducer(state = initialState, action){
    switch(action.type) {
        case "ADD_DETAILS":
            return {...state,
                name: action.payload.name,
                race: action.payload.race,
                alignment: action.payload.alignment,
                image: action.payload.image,
                details: action.payload.details,
                level: action.payload.level,
                characterClass: action.payload.character_class,
                strength: action.payload.strength,
                dexterity: action.payload.dexterity,
                constitution: action.payload.constitution,
                intelligence: action.payload.intelligence,
                wisdom: action.payload.wisdom,
                charisma: action.payload.charisma,
                initiative: action.payload.initiative,
                armor_class: action.payload.armor_class,
                speed: action.payload.speed,
                hitPoints: action.payload.hit_points,
                inspiration: action.payload.inspiration
            }
        default:
            return state
    }
}

export default characterDetailsReducer