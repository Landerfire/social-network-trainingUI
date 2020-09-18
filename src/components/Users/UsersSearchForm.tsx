import React from 'react'
import {Field, Form, Formik} from 'formik'
import {FilterType} from '../../redux/users-reducer'
import {useSelector} from 'react-redux'
import {getUsersFilter} from '../../redux/users-selectors'


type CurrentProps = {
   onFilterChanged: (filter: FilterType) => void
}
type FriendFormType = 'true' | 'false' | 'null'
type FormType = {
   term: string
   friend: FriendFormType
}

const usersSearchFormValidate = () => {
   const errors = {}
   return errors
}

export const UsersSearchForm: React.FC<CurrentProps> = React.memo((props) => {

      const filter = useSelector(getUsersFilter)

      const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
         const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
         }

         props.onFilterChanged(filter)
         setTimeout(() => {
            setSubmitting(false)
         }, 2000)
      }

      return (
         <div>
            <Formik
               initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
               validate={usersSearchFormValidate}
               onSubmit={submit}
               enableReinitialize={true}
            >
               {({isSubmitting}) => (
                  <Form>
                     <Field type="text" name="term"/>
                     <Field name="friend" as="select">
                        <option value="null">Filter: all users</option>
                        <option value="true">Followed only</option>
                        <option value="false">Unfollowed only</option>
                     </Field>
                     <button type="submit" disabled={isSubmitting}>
                        Find
                     </button>
                  </Form>
               )}
            </Formik>
         </div>
      )
   }
)