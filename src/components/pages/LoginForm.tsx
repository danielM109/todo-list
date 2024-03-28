import { Button, FormControl, FormLabel, Heading, Input, Stack, Center, Text,  Box } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { supabase } from '../../api/config';
import { useState } from 'react';

// import { signInWithEmail, signInWithGoogle } from '../services/auth';
// import useForm from '../hooks/useForm';

const initialState = {
  email: '',
  password: ''
}

const signInWithEmail = async (email: string, password: string) => {
  const result = await supabase.auth.signInWithPassword({
  // const result = await supabase.auth.signIn({
    email,
    password
  })
  if (result.error) {
    // console.log(result.error);
    alert('Invalid email address or password');
  }
  return result;
}


// export const signInWithGoogle = async () => {
//   try {
//     const { user, error } = await supabase.auth.sign({
//       provider: 'google'
//     })
//     if (error) throw new Error('An ocurred meanwhile authentication')
//     return user
//   } catch (error) {
//     console.error(error)
//   }
// }

export default function LoginForm () {
  /////////useForm////////////////////////
  const [formValues, setFormValues] = useState(initialState)

  // const reset = () => setFormValues(initialState)

  const handleInputChange = (event: { target: { value: string; name: string; }; }) => {
    const { value, name } = event.target

    setFormValues({
      ...formValues,
      [name]: value
    })
  }
  /////////////////////////////////////

  // const { formValues, handleInputChange } = useForm(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = formValues
    await signInWithEmail(email, password)
  }

  // const handleLoginGoogle = async () => {
  //   await signInWithGoogle()
  // }

  return (
    <>
      <Heading fontSize='2xl' mb='15px' width="400px" display="flex" justifyContent="center">Email and Password</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id='email'>
            <FormLabel>Email address</FormLabel>
            <Input
              type='email'
              name='email'
              value={formValues.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id='password'>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              name='password'
              value={formValues.password}
              onChange={handleInputChange}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button type='submit' bg={'green.600'} color={'white'}>
              Sign in
            </Button>
            <Button
              w={'full'}
              maxW={'md'}
              variant={'outline'}
              leftIcon={<FcGoogle />}
              // onClick={handleLoginGoogle}
              >
              <Center>
                <Text>Sign in with Google ...pending</Text>
              </Center>
            </Button>
          </Stack>
          {/* <Link to='/register' >Create an account</Link> */}
          <Box
            width="400px" // Ancho del contenedor
            height="40px" // Alto del contenedor
            // border="1px solid black" // Borde del contenedor (solo para visualización)
            display="flex" // Utiliza flexbox para el diseño
            justifyContent="center" // Alinea el contenido horizontalmente al centro
            alignItems="end" // Alinea el contenido verticalmente al centro
          >
            <Text  fontSize="lg">Don´t have an account?</Text>
          </Box>
          <Box width="400px" display="flex" justifyContent="center" >
            <Link  color='green.700' /*fontSize="20" display= 'block'*/ to='/signup' >
                Create an account
            </Link>
          </Box>
          <Box width="400px" display="flex" justifyContent="center" alignItems="flex-end" >
          <Text  fontSize="md">Or</Text>
          </Box>
        </Stack>
      </form>
    </>
  )
}