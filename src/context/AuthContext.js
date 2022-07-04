import {createContext, useContext, useEffect, useState} from 'react';
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth"
import {auth, database} from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [isAdmin, setAdmin] = useState(false);
    const [yapmis, setBasvuru] = useState(false);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (data) => {
        updateProfile(auth.currentUser, {
            ...data
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser)

            
            const querySnapshot = await getDocs(collection(database, "permission"));
            querySnapshot.forEach((doc) => {
                if (doc.data().uid == currentUser.uid) setAdmin(true)
            });

            const basvuruSnap = await getDocs(collection(database, "user_answers"));
            basvuruSnap.forEach((doc) => {
                console.log(doc.data().uid)
                if (doc.data().uid == currentUser.uid) {
                    setBasvuru(true)
                }
            });
            
        });


        return () =>  {
            unsubscribe();
        }

    }, [])

    const logout = () => {
        user.permission = null
        return signOut(auth);
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    return(
        <UserContext.Provider value={{createUser, user, logout, signIn, updateUser, isAdmin, yapmis}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => useContext(UserContext);
