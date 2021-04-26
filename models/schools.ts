import mongoose from "mongoose"; 

export default interface ISchool extends mongoose.Document {
    name: string 
    clubsManager: string[]
    schoolRepresentativeEmail: string
    schoolContactEmail: string
}

const school: mongoose.Schema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    clubsManager: {
        type: String,
        required: true
    },
    schoolRepresentativeEmail: {
        type: String,
        required: true
    },
    schoolContactEmail: {
        type: String,
        required: true 
    }
})

export const School = mongoose.model<ISchool>("School", school); 