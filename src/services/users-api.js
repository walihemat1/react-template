import { api } from '@/services/api'

let users = [
  {
    id: 1,
    name: 'Ali Ahmad',
    email: 'ali@example.com',
    role: 'admin',
    status: 'active',
    joined: '2025-02-15',
  },
  {
    id: 2,
    name: 'Sara Khan',
    email: 'sara@example.com',
    role: 'manager',
    status: 'active',
    joined: '2025-04-12',
  },
  {
    id: 3,
    name: 'Omar Aziz',
    email: 'omar@example.com',
    role: 'user',
    status: 'active',
    joined: '2025-03-28',
  },
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
          return { error: { message: 'users.notFound' } }
        }

        return { data: user }
      },
      providesTags: (_result, _error, id) => [{ type: 'Users', id }],
    }),
    createUser: builder.mutation({
      queryFn: (newUser) => {
        const user = {
          id: getNextUserId(),
          status: 'active',
          joined: new Date().toISOString().slice(0, 10),
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
          return { error: { message: 'users.notFound' } }
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
