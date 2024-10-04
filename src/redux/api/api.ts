


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Server } from "../../constants/config"
import { Provider } from "react-redux"




const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${Server}` }),
    tagTypes: ['Chat', 'User'],
    endpoints: (builder) => ({
        myChats: builder.query({
            query: () => ({
                url: 'chat/getMyChat',
                credentials: 'include',
            }),
            providesTags: ['Chat']
        }),
        searchUser: builder.query({
            query: (name) => ({
                url: `user/searchUser?name=${name}`,
                credentials: "include",
            }),
            providesTags: ['User']
        }),
        logoutUser:builder.mutation({
            query: () => ({
                url: "user/logout",
                method: "POST",
                credentials: "include"
            })
        }),
        sendFriendRequest: builder.mutation({
            query: (data) => ({
                url: "user/sendFriendRequest",
                method: "PUT",
                credentials: "include",
                body: data
            })
        }),

        getNotifications: builder.query({
            query: () => ({
                url: "user/getMyNotification",
                credentials: "include"
            }),
            keepUnusedDataFor: 0,
        }),

        acceptFriendRequest: builder.mutation({
            query: (data) => ({
                url: "user/acceptFriendRequest",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ['Chat']
        }),
        chatDetails: builder.query({
            query: ({ chatId, populate = false }) => {
                let url = `chat${chatId}`;
                if (populate) url += "?populate=true";
                return {
                    url,
                    credentials: "include"
                }
            }
        }),

        getMessages: builder.query({
            query: ({ chatId, page }) => ({
                url: `chat/message/${chatId}?page=${page}`,
                credentials: true,

            })
            , keepUnusedDataFor: 0
        }),

        sendAttachments: builder.mutation({
            query: (data) => ({
                url: "chat/message",
                method: "POST",
                credentials: "include",
                body: data,
            })
        }),

        myGroups: builder.query({
            query: () => ({
                url: "chat/my/groups",
                credentials: "include",

            }),
            providesTags: ['Chat']
        }),

        availbleFriends: builder.query({
            query:(chatId)=>{
                let url = `user/friends`;
                if(chatId) url += `?chatId=${chatId}`;
                return {
                    url,
                    credentials:"include"
                }
            },
            providesTags:['Chat']
        }),

        newGroup: builder.mutation({
            query:({name,members})=> ({
                url:"chat/new",
                method:"POST",
                cridentials:"include",
                body:{name,members}
            }),
            invalidatesTags:['Chat']
        }),

     renameGroup : builder.mutation({
        query:({chatId,name})=>({
         url:`chat/${chatId}`,
         method:"PUT",
         credentials:"include",
         body:{name}
        }),
        invalidatesTags:['Chat']
     }),
     removeGroupMember : builder.mutation({

        quary:({chatId,userId}:{
            chatId:string,
            userId:string
        })=>({
            url:"chat/removeMembers",
            method:"PUT",
            credentials:"include",
            body:{chatId,userId}
        }),
        invalidatesTags:["Chat"]
     }),
     addGroupMembers:builder.mutation({
        query:({members,chatId})=>({
            url:"chat/addmembers",
            method:"PUT",
            credentials:"include",
            body:{members,chatId}

        }),
        invalidatesTags:['Chat']
     })



    }),
})


export default api

export const { useMyChatsQuery, useLazySearchUserQuery,useLogoutUserMutation,useSendFriendRequestMutation,
    useGetNotificationsQuery,useAcceptFriendRequestMutation
} = api