import React, {useEffect, useState} from "react";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpin from "../../shared/components/UIElements/LoadingSpin";
import { useHttpClient } from "../../shared/hooks/http-hook";

const User = () => {
    const [loadedUsers, setLoadedUsers] = useState();
    const {isLoading, error, sendRequest, clearError}=useHttpClient();

    useEffect(()=>{
        const fetchUsers = async () => {
            try{
                const responseData = await sendRequest(`http://localhost:5000/api/users`);
                setLoadedUsers(responseData.users);               
            }catch(err){
            }
        };
        fetchUsers();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div class="center">
                    <LoadingSpin />
                </div>
            )}
            {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
        </React.Fragment>
    );
};

export default User; 

