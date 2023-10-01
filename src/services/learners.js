import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const LearnersService = {
    learners: () => {
        const db = getFirestore(app)

        return getDocs(collection(db, 'learners'))
    }
}

export default LearnersService