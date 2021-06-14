import mongoose from "mongoose"; 

export default interface ISchool extends mongoose.Document {
    name: string;
    clubsManager: string;
    emailExtension: string;
    schoolContactEmail: string;
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
    emailExtension: {
        type: String,
        required: true
    },
    schoolContactEmail: {
        type: String,
        required: true 
    }
})

export const School = mongoose.models.School || mongoose.model<ISchool>("School", school); 