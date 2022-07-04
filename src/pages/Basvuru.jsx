import React from 'react'
import { collection, query, onSnapshot, getDocs, addDoc } from "firebase/firestore"; 
import { database } from '../utils/firebase';
import { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { REDIRECT_PATH } from '../utils/routes';

const Basvuru = () => {
    const [values, set] = useState([]);
    const [answers, setAnswers] = useState([]);
    const {user, yapmis, isAdmin} = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const questionRef = collection(database, "questions")
        const q = query(questionRef);
        let x = []
        onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                x.push({
                    id: doc.id,
                    ...doc.data()
                })
                console.log(x)
            })
            set(x);
        })
    }, [])



    const Item = ({data, answers, setAnswers}) => {

        const handleClick = (e, index) => {
            e.preventDefault();

            data.cevaplar.map((x, i) => {
                if (answers[`${data.id}-${i}`]) {
                    answers[`${data.id}-${i}`] = false;
                    setAnswers({...answers, [`${data.id}-${i}`]: false})
                }
            })

            setAnswers({...answers, [`${data.id}-${index}`]: e.target.checked})
        }

        return (
            <div className='bg-gray-700/50 px-2 py-1 rounded my-1' key={data.id}>
            <h1>{data.soru}</h1>
                {data.cevaplar.map((x, i) =>
                    <div className='flex items-center gap-1'>
                        <input checked={answers[`${data.id}-${i}`]??false} onChange={(e) => handleClick(e, i)} type="checkbox"/>
                        <p>{x.cevap}</p>
                    </div>
                )}
            </div>
        )
    }

    const dogruCevap = () => {
        var dogruCevapCount = 0;
        values.map((val, index) => {
            val.cevaplar.map((x,i) => {
                if (x.dogruCevap == answers[`${val.id}-${i}`]) {
                    dogruCevapCount = dogruCevapCount + 1;
                }
            })
        })

        return dogruCevapCount
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const count = await dogruCevap()

        if (count == values.length) {
            alert("Tebrikler, testi başarıyla tamamladınız şimdi 2. kısıma geçebilirsiniz.")
            navigate(REDIRECT_PATH.BASVURU2)
        } else {
            alert("Gerekli doğru cevap sayısına ulaşamadın, test'de başarısız oldun. Tekrar doldurmayı dene !")

        }

    }

    return (
        <div>
            <h1>{isAdmin}</h1>
            {yapmis == false ? 
                <div className='bg-gray-500/10 mt-2 p-4 rounded-md'>
        
                    <h1>Başvuru Formu</h1>
        
                    {values.map((x) => <Item key={x.id} data={x} answers={answers} setAnswers={setAnswers}/>)}
                    
                    <input 
                        value="Gönder"
                        type="button"
                        onClick={handleSubmit}
                        className='w-full text-center border-2 border-gray-500/50 hover:border-blue-500 hover:bg-blue-500 p-2 rounded cursor-pointer'    
                    />
                    
        
                </div>    
    
            : 
                <div className='bg-red-500 p-2'>
                    <h1>Zaten Daha önceden başvuru yapmışsın!</h1>
                </div>
            }
        </div>

    )
}

export default Basvuru