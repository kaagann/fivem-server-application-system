import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { database } from '../utils/firebase';
import { REDIRECT_PATH } from '../utils/routes';

const Basvuru2 = () => {
    const [sorular, setSorular] = useState([]);
    const {user} = UserAuth()
    const navigate = useNavigate()



    useEffect(() => {
        
        const getSorular = async () => {
            const questionRef = collection(database, "questions_custom")
            const q = query(questionRef);
            let x = []
            onSnapshot(q, (snapshot) => {
                snapshot.forEach((doc) => {
                    x.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setSorular(x);
            })
        }
        
        getSorular()

    }, [])

    const handleChange = (e,index) => {
        let g = sorular[index]
        g.cevap = e.target.value
        setSorular([...sorular.slice(0, index), g, ...sorular.slice(index+1)])
    } 

    const submit = async() => {
        // create a new document with a generated id
        try {
            await addDoc(collection(database, "questions_custom_answers"), {
                cevaplar: sorular,
                user: {
                    uid: user.uid,
                    name: user.displayName
                },
                readData: [],
                date: new Date(),
            });

            await addDoc(collection(database, "user_answers"), {
                uid: user.uid,
            })

            alert("Başvurunuz gönderildi en kısa süre içerisinde yetkili ekibimiz tarafından incelenecektir.");
            navigate(REDIRECT_PATH.HOME)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className='bg-gray-500/10 mt-2 p-4 rounded-md'>
            {sorular.map((x,i) => 
                <div>
                    <p>{x.soru}</p>
                    <textarea
                        placeholder='Soru'
                        onChange={(e) => handleChange(e, i)}
                        value={sorular[i].cevap}
                        className='bg-transparent border  border-gray-500/50 p-1 px-2 rounded-md w-full my-2 focus:border-blue-300 focus:ring-blue-500 focus:ring-1 outline-none'
                    />
                </div>
            )}

            <button onClick={submit} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full'>
                Gönder
            </button>
        </div>
    )
}


export default Basvuru2
