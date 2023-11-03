import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";

const ParticipantsService = {
    isAdmin: (id) => {
        const db = getFirestore()

        return getDoc(doc(db, `admin/${id}`)).then(snapshot => {
            return snapshot.exists()
        })
    },
    participants: () => {
        const db = getFirestore()

        return getDocs(collection(db, 'users')).then(snapshot => {
            return snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
        }).then(users => {
            return users.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1
                } else {
                    return 1
                }
            })
        })
    },
    participant: id => {
        const db = getFirestore()

        return getDoc(doc(db, `users/${id}`)).then(snapshot => {
            return snapshot.data()
        })
    },
    checkin: id => {
        const db = getFirestore()

        return updateDoc(doc(db, `users/${id}`), {
            checkedIn: true
        })
    }
}

export default ParticipantsService