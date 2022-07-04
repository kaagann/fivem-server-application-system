import React, { useState } from 'react'
import { collection, addDoc, query, onSnapshot, doc, deleteDoc, Timestamp } from "firebase/firestore"; 
import { database } from '../utils/firebase';
import { useEffect } from 'react';
import moment from 'moment';
import { UserAuth } from '../context/AuthContext';
import {useNavigate} from "react-router-dom"
import { REDIRECT_PATH } from '../utils/routes';
import { async } from '@firebase/util';


function AdminPage() {
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const updateTable = () => {
            const questionRef = collection(database, "questions_custom_answers")
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
                setAnswers(x);
            })
        }

        document.title = "morpv admin"

        updateTable()
    }, [])

    return (
        <div className='w-full relative'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2 my-4'>
                <HeaderItems header="Gelen Başvuru" details={answers.length}/>
                <HeaderItems header="Onaylanan Başvuru" details="100"/>
                <HeaderItems header="Toplam Üye" details="2000"/>
                <HeaderItems header="Aktif Oyuncu" details="32/64"/>
            </div>

            <div className='lg:grid grid-cols-1 md:grid-cols-2 gap-2 hidden'>
                <div className='col-span-2 grid grid-cols-3 gap-2'>
                    <NewNews/>
                    <AddQues/>
                    <AddCustomQues/>
                </div>
                
                <QuesTable/>
                <AnswersTable/>
            </div>
        </div>
    )
}

const NewNews = () => {
    const [details, set] = useState({header: "", desc: "", photo: "",})
    
    const submit = async () => {
        try {
            await addDoc(collection(database, "news"), {
                photo: details.photo,
                header: details.header,
                desc: details.desc,
                date: new Date()
            });
            console.log("Document written with ID: ");
            alert("Haber Oluşturuldu");
            set({header: "", desc: "", photo: "",})
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className='bg-gray-500/20 p-2 rounded'>
            <h1>Yeni Haber Ekle</h1>
            <input onChange={(e) => set({...details, header: e.target.value})} placeholder='Haber Başlığı' className='bg-transparent border  border-gray-500/50 p-1 px-2 rounded-md w-full my-2 focus:border-blue-300 focus:ring-blue-500 focus:ring-1 outline-none' />
            <input onChange={(e) => set({...details, desc: e.target.value})} placeholder='Haber Açıklaması' className='bg-transparent border  border-gray-500/50 p-1 px-2 rounded-md w-full my-2 focus:border-blue-300 focus:ring-blue-500 focus:ring-1 outline-none' />
            <input onChange={(e) => set({...details, photo: e.target.value})} placeholder='URL(png, jpng)' className='bg-transparent border  border-gray-500/50 p-1 px-2 rounded-md w-full my-2 focus:border-blue-300 focus:ring-blue-500 focus:ring-1 outline-none' />
        
            <input onClick={submit} value="Paylaş" type="button" placeholder='URL(png, jpng)' className='bg-transparent border  border-gray-500/50 p-1 px-2 rounded-md hover:bg-blue-500 cursor-pointer w-full my-2 focus:border-blue-300 focus:ring-blue-500 focus:ring-1 outline-none' />
        
        </div>
    )
}

const AddQues = () => {
    const [soru, setSoru] = useState("");
    const [cevap, setCevap] = useState("");
    const [cevaplar, setCevaplar] = useState([]);
    const [dogruCevap, setDogruCevap] = useState(false);

    const fire = async () => {
        try {
            await addDoc(collection(database, "questions"), {
                soru: soru,
                cevaplar: cevaplar,
                date: new Date(),
            });
            setCevaplar([])
            setSoru("")
            setCevap("")
            alert("Soru Eklendi");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const cevapEkle = (e) => {
        e.preventDefault();
        setCevaplar([...cevaplar, {cevap, dogruCevap}])
    }

    const cevapKaldır = (id) => {
        setCevaplar(cevaplar.filter((item, index) => index !== id))
    }

    return (
        <div className='bg-gray-500/20 p-2 rounded'>
            <h1>Yeni Şıklı Soru Ekle</h1>

            <textarea
                placeholder='Soru'
                onChange={(e) => setSoru(e.target.value)}
                value={soru}
                className='bg-transparent border  border-gray-500/50 p-1 px-2 rounded-md w-full my-2 focus:border-blue-300 focus:ring-blue-500 focus:ring-1 outline-none'
            />

            <form onSubmit={cevapEkle}>
                <p className='text-sm'>Cevap Ekle</p>
                <div className='flex items-center border border-gray-500 px-2 rounded-md'>
                    <input 
                        className='w-full bg-transparent outline-none  rounded-md py-1'
                        placeholder='Cevap'
                        onChange={(e) => setCevap(e.target.value)}
                        value={cevap}
                    />
                    <input
                        type="checkbox"
                        className='w-4 h-4 bg-transparent'
                        onChange={(e) => setDogruCevap(e.target.checked)}
                        value={dogruCevap}
                    />
                </div>
                <div className='flex items-center gap-2 my-2'>
                    {cevaplar.map((x, i) => 
                        <span onClick={() => cevapKaldır(i)} className='border border-gray-500 rounded-md px-1 py-0.5 hover:text-red-500 cursor-pointer hover:border-red-500'>{x.cevap} {x.dogruCevap == true ? <span className='text-green-500'>doğru</span> : ""}</span>
                    )}
                </div>


            </form>
            <input onClick={fire} value="Ekle" type="button" placeholder='URL(png, jpng)' className='bg-transparent border  border-gray-500/50 p-1 px-2 rounded-md hover:bg-blue-500 cursor-pointer w-full my-2 focus:border-blue-300 focus:ring-blue-500 focus:ring-1 outline-none' />
        </div>
    )
}

const AddCustomQues = () => {
    const [soru, setSoru] = useState("");

    const handleSubmit = async() => {
        try {
            await addDoc(collection(database, "questions_custom"), {
                soru: soru,
                date: new Date(),
            });
            setSoru("")
            alert("Soru Eklendi");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className='bg-gray-500/20 p-2 rounded relative'>
            <h1>Yeni Soru Ekle</h1>

            <textarea
                placeholder='Soru'
                onChange={(e) => setSoru(e.target.value)}
                value={soru}
                className='bg-transparent border  border-gray-500/50 p-1 px-2 rounded-md w-full my-2 focus:border-blue-300 focus:ring-blue-500 focus:ring-1 outline-none'
            />

            <input onClick={handleSubmit} value="Ekle" type="button" placeholder='URL(png, jpng)' className='bg-transparent border  border-gray-500/50 p-1 px-2 rounded-md hover:bg-blue-500 cursor-pointer w-full my-2 focus:border-blue-300 focus:ring-blue-500 focus:ring-1 outline-none' />

        </div>
    )
}

const QuesTable = () => {
    const [val, set] = useState([]);

    const updateTable = () => {
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
    }

    useEffect(() => {
        updateTable()
    }, [])


    const TableDetails = ({soru, cevaplar, date, id}) => {
        const deleteQuestion = async () => {
            await deleteDoc(doc(database, "questions", id));
            updateTable();
        }

        return (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {soru}
                </th>
                <td className="px-6 py-4">
                    {cevaplar.map((x) => <p className={`${x.dogruCevap == true ? "text-green-500" : ""}`}>{x.cevap}</p>)}
                    {/* {JSON.stringify(cevaplar)} */}
                </td>
                <td className="px-6 py-4">
                    {cevaplar.map((x) => x.dogruCevap ? <span className="text-green-500">{x.cevap}</span> : "" )}
                </td>
                <td className="px-6 py-4">
                    {moment(date).subtract(3, 'days').calendar()}
                </td>
                <td className="px-6 py-4 text-right">
                    <a onClick={deleteQuestion} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Sil</a>
                </td>
            </tr>
        )
    }

    return (
        <div className='bg-gray-500/20 p-2 rounded col-span-2'>
            <h1 className='text-xl my-1'>Sorular</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Soru
						</th>
						<th scope="col" className="px-6 py-3">
							Cevaplar
						</th>
						<th scope="col" className="px-6 py-3">
							Doğru Cevap
						</th>
                        <th scope="col" className="px-6 py-3">
							Eklenme Tarihi
						</th>
						<th scope="col" className="px-6 py-3">
							<span className="sr-only">Edit</span>
						</th>
					</tr>
				</thead>
				<tbody>
                    {val.map((doc) => <TableDetails cevaplar={doc.cevaplar} date={doc.date} soru={doc.soru} id={doc.id} /> )}
				</tbody>
			</table>
        </div>
    )
}

const AnswersTable = () => {
    const [answers, setAnswers] = useState([]);
    const {user} = UserAuth();
    const navigate = useNavigate();

    


    useEffect(() => {
        const updateTable = () => {
            const questionRef = collection(database, "questions_custom_answers")
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
                setAnswers(x);
            })
        }

        document.title = "morpv admin"

        updateTable()
    }, [])



    const TableDetails = ({data}) => {

        
        const convertDate = () => {
            console.log(data.date.seconds, data.date.nanoseconds)
            var date = new Timestamp(data.date.seconds, data.date.nanoseconds)
            var datx = date.toDate();
            var formatedDate = moment(datx).format("LLLL")
           
            return formatedDate

        }

        

       
        


        const deleteAnswer = async () => {
            try {
                await deleteDoc(doc(database, "answers", data.id));
                alert("silindi")            
            } catch(err) {
                console.log(err)
            }
        }

        const confirmAnswer = async () => {
            // await updateDoc(doc(database, "answers", data.id), {
            //     okuyan: {
            //         id: user.uid,
            //         name: user.displayName,
            //     }
            // })
        }

        const calculatePuan = () => {
            if (!data.readData[0]) return 0;
            let puan = 0;
            let indexCount = 0
            data.readData.map((x, i) => {
                puan = puan + parseInt(x.puan)
                indexCount = indexCount + 1
            })
            console.log(data.readData.length)
            return (puan / data.readData.length);
        }

        return (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {data.user.name}
                </th>
                <td className="px-6 py-4 flex items-center gap-1 flex-wrap text-green-400 text-sm">
                    {/* <p className='text-xs'>{JSON.stringify(data.cevaplar)}</p> */}
                    {/* <p>{JSON.stringify(data.readData)}</p> */}
                    {data.readData[0]?  data.readData.map((x) => <p>{x.name}</p>) : "Henüz okunmadı"}
                </td>
                <td className="px-6 py-4 ">
                    {calculatePuan()}
                </td>
                <td className="px-6 py-4">
                    { convertDate() }
                </td>
                <td className="px-6 py-4 text-right">
                    <a onClick={() => navigate(`${REDIRECT_PATH.READ_ANSWER}?id=${data.id}`)}  href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2">Oku</a>
                    <a onClick={confirmAnswer} href="#" className="font-medium text-green-600 dark:text-green-500 hover:underline mx-2">Onayla</a>
                </td>
            </tr>
        )
    }

    return (
        <div className='bg-gray-500/20 p-2 rounded col-span-2'>
            <h1 className='text-xl my-1'>Gelen Cevaplar</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Cevaplayan
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Okuyanlar
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Puan
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cevaplama Tarihi
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {answers.map((doc) => <TableDetails data={doc} /> )}
                </tbody>
            </table>
        </div>
    )
}

const HeaderItems = ({header, details}) => {
    return (
        <div className='bg-gray-500/10 p-2 rounded'>
            <p className='text-sm'>{header}</p>
            <h1>{details}</h1>


        </div>
    )
}

export default AdminPage