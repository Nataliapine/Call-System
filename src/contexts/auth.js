import { useState, useEffect, createContext } from "react";
import firebase  from "../services/firebaseConnection";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({children}) {
const [user, setUser] = useState(null);
const [loadingAuth, setLoadingAuth] = useState(false);
const [loading, setLoading] = useState(true);

useEffect(() => {

    function loadStorage() {
        const storageUser = localStorage.getItem('SistemaUser');
        if(storageUser){
            setUser(JSON.parse(storageUser));
            setLoading(false);
        }
        setLoading(false)
    }
    loadStorage();
}, [])

    //Fazendo login do usuario
    async function signIn(email, password) {
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value)=> {
            let uid = value.user.uid;

            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get();

            let data = {
                uid: uid,
                name: userProfile.data().name,
                avataurl: userProfile.data().avataurl,
                email: value.user.email
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Welcome Back!')
        })
        .catch((error)=> {
            console.log(error);
            toast.error('Oops! Something went wrong, please try later!');
            setLoadingAuth(false);
            
        })
    }

    //Cadastrando um novo usuario
    async function signUp(email, password, name) {
        setLoadingAuth(true);
        
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async(value) =>{
            let uid = value.user.uid;

            await firebase.firestore().collection('users')
            .doc(uid).set({
                name:name,
                avataurl: null,
            })
            .then( () => {

                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    avataurl: null
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success('Welcome to the App')
            })
        })
        .catch((error)=> {
            console.log(error);
            toast.error('Oops! Something went wrong, please try later!');
            setLoadingAuth(false);
            
        })
    }

    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    async function signOut(){
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }


    return(
        <AuthContext.Provider 
        value={{ 
        signed: !!user,
         user,
         loading,
         signUp,
         signOut,
         signIn,
         loadingAuth,
         setUser,
         storageUser
         }} >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;