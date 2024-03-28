import { Button, FormControl, FormLabel, Heading, Input, Stack, InputGroup } from '@chakra-ui/react'
import { Link, Box, Text } from '@chakra-ui/react'
// import { useState } from 'react';

import { supabase } from '../../api/config'
// import useForm, { InitialStateProps } from '../hooks/useForm'
import { useState } from 'react';
// import { ProfileUpdate } from '../type/collection';
// import { signUpWithEmail, updateProfile } from '../../services/auth'
// import { Database } from "./supabase";

const initialState = {
  full_name: '', 
  email: '',
  password: ''
}

const signUpWithEmail = async (data: any) => {
  const result = await supabase.auth.signUp(data)
  return result;
  console.log(result);
}

export const updateProfile = async (data: any): Promise<void> => {
  try {
    await supabase.from('profiles').upsert(data/*, { returning: 'minimal' }*/)
  } catch (error) {
    console.error(error)
  }
}

export default function SingUpForm ()  {
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
  // const { formValues, handleInputChange, reset } = useForm(initialState)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const { email, password, full_name } = formValues
    const data = {
      email: email,
      password: password
    }
    // Add user in users table 
    const result = await signUpWithEmail(data)
    // console.log(result);
    if (result) {
      const user = result.data.user;
      // console.log(user.id);

      const data = {
        id: user.id,
        full_name: full_name
      }
      // Add user's profile in profiles table
      await updateProfile(data)
    } 

    setFormValues(initialState);
  }
  

  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  // const [fullName, setFullName] = useState<string>('');
  // const [error, setError] = useState<string | null>(null);

  // const handleSubmit = async () => {
  //   try {
  //     const { data, error } = await supabase.auth.signUp({
  //       email: email,
  //       password: password,
  //     });

      


  //     if (error) {
  //       setError(error.message);
  //     } else {
  //       console.log('Registro exitoso para:', data.user?.email);
  //       // Redireccionar a la página de inicio o realizar otras acciones necesarias
  //     }
  //   } catch (error) {
  //     console.error('Error al registrar:', error);
  //     setError('Error al registrar');
  //   }
  // };

  return (
    <>
      <Heading fontSize='2xl' mb='15px' width="400px" display="flex" justifyContent="center">Register</Heading>
      <form onSubmit={handleSubmit} >
        <Stack spacing={4}>
          <FormControl id='fullName'>
            <FormLabel>Full Name</FormLabel>
            {/* <Input type='text' name='fullName' value={fullName} onChange={(e) => setFullName(e.target.value)}/> */}
            <Input type='text' name='full_name' value={formValues.full_name} onChange={handleInputChange}/>
          </FormControl>
          <FormControl id='emailr'>
            <FormLabel>Email</FormLabel>
            {/* <Input type='email' name='emailr' value={email} onChange={(e) => setEmail(e.target.value)}/> */}
            <Input type='email' name='email' value={formValues.email} onChange={handleInputChange}/>
          </FormControl>
          <FormControl id='passwordr'>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              {/* <Input type='password' name='passwordr' value={password} onChange={(e) => setPassword(e.target.value)}/> */}
              <Input type='password' name='password' value={formValues.password} onChange={handleInputChange}/>
            </InputGroup>
          </FormControl>
          <Button
              type='submit'
              loadingText='Submitting'
              bg={'green.600'}
              color={'white'}>
              Sign up
          </Button>
        </Stack>
        <Box
          width="400px" // Ancho del contenedor
          height="40px" // Alto del contenedor
          // border="1px solid black" // Borde del contenedor (solo para visualización)
          display="flex" // Utiliza flexbox para el diseño
          justifyContent="center" // Alinea el contenido horizontalmente al centro
          alignItems="end" // Alinea el contenido verticalmente al centro
        >
          <Text  fontSize="lg">Already have an account?</Text>
        </Box>
        <Box width="400px" display="flex" justifyContent="center" >
          <Link  color='green.700' fontSize="lg" display= 'block' href='/login'>
              Log in
          </Link>
        </Box>
      </form>
    </>
  )
}