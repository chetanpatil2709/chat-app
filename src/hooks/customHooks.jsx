import { useEffect, useState } from "react";
import { api } from "../config/Api";

export function useGetUser(uid) {
    const [user, setUser] = useState([]);
    useEffect(() => { loadConversations() }, []);
    const loadConversations = async () => {
        await api.get(`/user/${uid}`)
            .then(res => {
                setUser(res.data[0])
            })
    }
    return user;
}

export function useGetAllUser() {
    const [users, setUsers] = useState([]);
    useEffect(() => { loadUsers() }, []);
    const loadUsers = async () => {
        await api.get(`/user`)
            .then(res => {
                setUsers(res.data)
            })
    }
    return users;
}