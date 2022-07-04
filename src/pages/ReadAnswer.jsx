import React from 'react'
import { collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc} from "firebase/firestore"; 
import { database } from '../utils/firebase';
import { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from "react-router-dom"
import { REDIRECT_PATH } from '../utils/routes';



function ReadAnswer() {
    const [answers, setAnswers] = useState([]);
    const [readData, setReadData] = useState([]);
    const [k, set] = useState([])
    const {user} = UserAuth();
    const [params, setParams] = useSearchParams();
    const id = params.get("id");
    const navigate = useNavigate()



    useEffect(() => {
        const getAnswers = async () => {
            console.log(id)
            const docRef = doc(database, "questions_custom_answers", id)
            onSnapshot(docRef, (snapsot) => {
                setReadData(snapsot.data().readData)
                set(snapsot.data().cevaplar)
            })
        }   


        getAnswers()
    },[])

    const handleSubmit = async() => {
        //update questions_custom_answers where id = id
        let ref = doc(database, "questions_custom_answers", id)
        try {
            readData.push({
                uid: user.uid,
                name: user.displayName,
                puan: document.getElementById("read-select").value
            })
            await updateDoc(ref, {
                readData: readData
            })
            alert("Onaylandı")
            navigate(REDIRECT_PATH.ADMIN)
        } catch(err) {
            console.log(err)
        }


    }


    return (
        <div>
            <div className='bg-gray-500/10 mt-2 p-4 rounded-md'>
                <h1>Başvuru Formu - {id}</h1>

                {k.map((x) => 
                    <div>
                        <h1>{x.soru}</h1>
                        
                        <textarea
                            placeholder='Cevap'
                            disabled={true}
                            value={x.cevap}
                            className='bg-transparent border  border-gray-500/50 p-1 px-2 rounded-md w-full my-2 focus:border-blue-300 focus:ring-blue-500 focus:ring-1 outline-none'
                        />
                    </div>
                
                )}

                <div className='grid grid-cols-4 gap-2'>
                    <input 
                        value="Onayla"
                        type="button"
                        onClick={handleSubmit}
                        className='w-full col-span-3 my-1 text-center border-2 border-gray-500/50  hover:border-blue-500 hover:bg-blue-500 p-2 rounded cursor-pointer'    
                    />

                    <select id="read-select" className='w-full bg-gray-500/20 outline-none p-2 my-1 rounded text-blue-500'>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>

                </div>


            </div>
        </div>
    )
}

export default ReadAnswer