import { useContext, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/profile-empty.png';

import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';
import './profile.scss';


export default function Profile() {
    const { user, signOut, setUser, storageUser } = useContext(AuthContext);

    const [ name, setName] = useState(user && user.name);
    const [ email, setEmail ] = useState(user && user.email);
    const [ avatarurl, setAvatarUrl ] = useState(user && user.avataurl);
    const [ imgAvatar, setImgAvatar ] = useState(null);

    function handleFile(e) {
      if(e.target.files[0]) {

      
        const image = e.target.files[0];
        if( image.type === 'image/jpeg' || image.type === 'image/png') {
            setImgAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        } else  {
            alert('Envie uma imagem do tipo png ou jpeg');
            setImgAvatar(null);
            return null;
        }
      }
    }

    async function handleUpload(){
        const currentUid = user.uid;
    
        const uploadTask = await firebase.storage()
        .ref(`images/${currentUid}/${imgAvatar.name}`)
        .put(imgAvatar)
        .then( async () => {
          console.log('FOTO ENVIADA COM SUCESSO!');
    
          await firebase.storage().ref(`images/${currentUid}`)
          .child(imgAvatar.name).getDownloadURL()
          .then( async (url)=>{
            let urlFoto = url;
            
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
              avatarUrl: urlFoto,
              nome: name
            })
            .then(()=>{
              let data = {
                ...user,
                avatarUrl: urlFoto,
                nome: name
              }; 
              setUser(data);
              storageUser(data);
    
            })
    
          })
    
        })
    
      }

      async function handleSave(e){
        e.preventDefault();
    
        if(imgAvatar === null && name !== ''){
          await firebase.firestore().collection('users')
          .doc(user.uid)
          .update({
            nome: name
          })
          .then(()=>{
            let data = {
              ...user,
              nome: name
            };
            setUser(data);
            storageUser(data);
    
          })
    
        }
        else if(name !== '' && imgAvatar !== null){
          handleUpload();
        }
    
      }

    return(
        <div>
            <Header />
            <div className="content">
                <Title name="My Profile"></Title>
            </div>
            <div className="container">
                <div className="card">
                    <form className="form-profile" onSubmit={handleSave}>
                        <label className="label-avatar">
                            <span onSubmit={handleFile}>
                                <FiUpload></FiUpload>
                            </span>
                            <input type="file" accept="image/*" onChange={handleFile} />
                            { avatarurl === null ?
                                <img src={avatar} width="250" height="250" alt="profile" />
                                :
                                <img src={avatarurl} width="250" height="250" alt="profile" />
                            }
                        </label>
                        
                        <label>Nome</label>
                        <input type="text" value={name} onChange={ (e) => setName(e.target.value)} />
                        <label>Email</label>
                        <input type="text" value={email} disabled={true} />
                        <button className="save-btn" type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}