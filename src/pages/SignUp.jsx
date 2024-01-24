import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import InputField from "../components/InputField";

import axios from "axios";


function SignUp() {
    const form = useForm();
    const {register, handleSubmit, formState} = form;
    const {errors} = formState;
    const [dataForm, setDataForm] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form onSubmit={handleSubmit(async (data) => {
          event.preventDefault();
          try {
              setIsLoading(true);
              const result = await axios.post("http://localhost:3000/register", {
                  ...data}
              );
              console.log('registratie is succesvol.')
              setDataForm(result.data);
          } catch (e) {
              console.error(e + "Het is niet gelukt om je bericht te verzenden");
          } finally {
              setIsLoading(false);
              navigate('/signin');
          }
      })}>
        <InputField
            labelName="Gebruikersnaam"
            inputType="text"
            id="gebruikersnaam"
            validationRules={{
                required: {
                    value: true,
                    message: "Gebruikersnaam is verplicht"
                }}}
            register={register}
            errors={errors}
        />

          <InputField
              labelName="Email"
              inputType="email"
              id="email"
              validationRules={{
                  required: {
                      value: true,
                      message: "Email is verplicht"
                  },
                  validate: (value) => value.includes('@')}}
              register={register}
              errors={errors}
          />

          <InputField
              labelName="Wachtwoord"
              inputType="password"
              id="password"
              validationRules={{
                  required: {
                      value: true,
                      message: "Wachtwoord is verplicht"
                  }}}
              register={register}
              errors={errors}
          />
          <button type="submit">Verstuur je bericht
              </button>
      </form>
        {isLoading && (
            <p>Loading...</p>
        )}
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;