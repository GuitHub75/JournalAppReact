import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations ={}) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({});
    useEffect(() => {
      createValidator();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])
    

    const isFormValid = useMemo(()=>{
         for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue]!== null) return false
         }
         return true;
    },[formValidation]);
    
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }


    const createValidator = ()=>{
        const formCheckValues = {}; // crea un objeto vacio para almacenar los resultados de las validaciones.
        for (const formField of Object.keys(formValidations)) { // Se itera sobre todas las claves del objeto.
              const[fn, errorMessage] = formValidations[formField];// Se extraen dos valores de cada clave de formValidations
              formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;//Se ejecuta la función fn utilizando como argumento el valor actual del campo en el formulario (formState[formField]). Si la función devuelve true, significa que la validación se ha pasado y se establece el valor de la clave en null. Si la función devuelve false, significa que la validación no se ha pasado y se establece el valor de la clave en errorMessage.
        }
        setFormValidation(formCheckValues);
       // console.log(formCheckValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}