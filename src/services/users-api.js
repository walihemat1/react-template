import { api } from '@/services/api'

let users = [
  { id: 1, name: 'Ali Ahmad', email: 'ali@example.com', role: 'admin' },
  { id: 2, name: 'Sara Khan', email: 'sara@example.com', role: 'manager' },
  { id: 3, name: 'Omar Aziz', email: 'omar@example.com', role: 'user' },
]

function getNextUserId() {
  return Math.max(...users.map((user) => user.id), 0) + 1
}

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      queryFn: () => ({ data: users }),
      providesTags: ['Users'],
    }),
    getUserById: builder.query({
      queryFn: (id) => {
        const user = users.find((item) => item.id === Number(id))

        if (!user) {
          return { error: { message: 'User not found' } }
        }

        return { data: user }
      },
      providesTags: (_result, _error, id) => [{ type: 'Users', id }],
    }),
    createUser: builder.mutation({
      queryFn: (newUser) => {
        const user = {
          id: getNextUserId(),
          ...newUser,
        }

        users = [...users, user]

        return { data: user }
      },
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      queryFn: ({ id, ...changes }) => {
        const user = users.find((item) => item.id === Number(id))

        if (!user) {
          return { error: { message: 'User not found' } }
        }

        users = users.map((item) =>
          item.id === Number(id) ? { ...item, ...changes } : item,
        )

        return { data: users.find((item) => item.id === Number(id)) }
      },
      invalidatesTags: (_result, _error, user) => [
        'Users',
        { type: 'Users', id: user.id },
      ],
    }),
    deleteUser: builder.mutation({
      queryFn: (id) => {
        users = users.filter((user) => user.id !== Number(id))

        return { data: id }
      },
      invalidatesTags: ['Users'],
    }),
  }),
})

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} = usersApi
