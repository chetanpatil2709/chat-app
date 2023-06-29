import React, { useEffect, useState, useRef } from 'react';
import Conversation from '../components/Conversation';
import Message from '../components/Message';
import Cicon from '../images/download.png';
import OnlineFriends from '../components/OnlineFriends';
import { api } from '../config/Api.jsx';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useGetAllUser } from '../hooks/customHooks';

export default function Home() {
    const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onBlur" })
    const [cookie] = useCookies();
    const scrollRef = useRef()
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [nextPerson, setNextPerson] = useState([]);
    const [searchConversation, setSearchConversation] = useState();
    const [msgInput, setMsgInput] = useState({
        text: "",
        sender: cookie._un,
        sendDate: format(new Date(), "yyyy/MM/dd"),
        sendAt: format(new Date(), "hh-mm aa")
    });
    console.log("searchConversation", searchConversation)
    useEffect(() => { loadConversations(); loadNextPerson(); loadMessages(); }, []);
    useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])
    const loadConversations = async () => {
        await api.get(`/conversation/${cookie._un}`)
            .then(res => {
                setConversations(res.data)
            })
    }
    const loadNextPerson = async () => {
        if (cookie._nxtP != null || cookie._nxtP != "" || cookie._nxtP != undefined) {
            await api.get(`/user/${cookie._nxtP}`)
                .then(res => {
                    setNextPerson(res)
                })
        }
    }

    const loadMessages = async () => {
        await api.get(`/message/${cookie._conId}`)
            .then(res => {
                setMessages(res.data);
                // loadMessages();
            })
    }

    const onInputChange = (e) => {
        setMsgInput({ ...msgInput, [e.target.name]: e.target.value })
    }

    const handleMessage = async () => {
        await api.post(`message/${cookie._conId}`, msgInput)
            .then(res => {
                msgInput.text = ""
                loadMessages();
            })
    }
    console.log(conversations)
    console.log("conversations", conversations[0]?.members?.find((m) => m !== cookie._un));
    const allUser = useGetAllUser()
    console.log("allUser", allUser)
    return (
        <div className='home'>
            <div className='row w-100'>
                <div className='friends col-xs-12 col-sm-12 col-md-3 col-lg-3'>
                    <div className="friendsWrapper">
                        <h5>Conversations</h5>
                        <input type='text' className="searchFriends w-90 mt-2" placeholder="search...."
                            onChange={(e) => setSearchConversation(e.target.value.toLowerCase())} />
                        <div>
                            {
                                conversations?.map((i, index) => (
                                    <Conversation c={i} key={index} />
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='chat col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                    {
                        cookie._conId == null || cookie._conId == "" || cookie._conId == undefined || cookie._conId == "null" || cookie._conId == "undefined" ?
                            <>
                                <div className='m-auto text-center'>
                                    <h4 className='opacity-50'>Click conversation to start messaging...</h4>
                                </div>
                            </>
                            :
                            <>
                                <div style={{ display: "contents" }}>
                                    <div className='chatTop'>
                                        {
                                            nextPerson.data?.map((i, index) => (
                                                <div className='conversation' key={index}>
                                                    <span className='profileTextIcon'>{i.name.charAt(0)}</span>
                                                    <span className='conversationName'>{i.name}</span>
                                                    <span className='m-2'><span>(</span>{i.userName}<span>)</span></span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className='chatMsgs'>
                                        {
                                            messages.length > 0 ?
                                                <>
                                                    {
                                                        messages?.map((i, index) => (
                                                            <div ref={scrollRef} key={index}>
                                                                <Message i={i}
                                                                    nextP={cookie._nxtP}
                                                                    own={i.sender === cookie._un ? true : false} key={index} />
                                                            </div>
                                                        ))}
                                                </> :
                                                <><h4 className='noMsgYet'>No messages yet.</h4></>
                                        }
                                    </div>
                                    <form>
                                        <div className='chatBottom'>
                                            <input type='text' className="msgInput" placeholder="type here...."
                                                value={msgInput.text}
                                                {...register("text", {
                                                    required: "Input message first"
                                                })}
                                                onChange={(e) => onInputChange(e)}
                                            ></input>
                                            <button type='submit' className='sendMsgBtn' onClick={handleSubmit(handleMessage)}>send</button>
                                        </div>
                                    </form>
                                </div>
                            </>
                    }

                </div>
                <div className='online pt-3 col-xs-12 col-sm-12 col-md-3 col-lg-3'>
                    <h5>Online</h5>
                    <div>
                        <p className='opacity-75'><strong>No friends online</strong></p>
                    </div>
                    {/* <OnlineFriends />
                    <OnlineFriends /> */}
                </div>
            </div>
        </div >
    )
}
